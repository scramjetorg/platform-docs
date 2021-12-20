import { ReadableApp } from "@scramjet/types";
import { getLinks, checkKeywords, postToSlack, getScore } from './rss';
import { scrap } from './scrap';
import keywords from './config/keywords.json';
import feed from './config/rss.json';
import { sleep } from './utils';

const list: Array<any> = [];
const MAX_LIST: number = 1000;

/**
 * Helper function that keeps links in an order list
 * If the new link has higher score than the lowest in the list then links are replaced.
 * 
 * @param url 
 * @param title 
 * @param score 
 * @param results 
 */
function addToList(url: string, title: string, score: number, results: Array<any>) {
  if (score === 0) return false;

  let added: boolean = false;

  if (list.length < MAX_LIST) {
    list.push({ url, title, score, keywords: results });
    added = true;
  } else {
    if (list[list.length - 1].score < score) {
      list.pop();
      list.push({ url, title, score, keywords: results });
      added = true;
    }
  }
  if (added) list.sort((a, b) => b.score - a.score); // Sort only when a new link was added.
  return added;
}

const app: ReadableApp<string> = async function* (_stream, slackWebhookUrl: string) {
  while (true) {
    feed.forEach(async rss => {
      let links;
      try {
        links = await getLinks(rss);
      } catch (e) {
        console.error('ERROR FROM GET LINKS e: ' + e);
      }
      await sleep(5000); // Slow down scraping in order to avoid 429 Errors.

      links.forEach(async link => {
        // check if link is not already on the list
        const exists = list.find(item => item.url === link.url);
        if (!exists) {
          let content;
          try {
            content = await scrap(link.url, '#mainbar');
          } catch (e) {
            console.error('ERROR FROM SCRAP e: ' + e);
          }
          await sleep(5000); // Slow down scraping in order to avoid 429 Errors.

          const results = checkKeywords(content, keywords);
          const score = getScore(results);
          const added = addToList(link.url, link.title, score, results);
          if (added) await postToSlack(slackWebhookUrl, link.title, link.url, results);
        }
      });
    });
    yield 'GETTING RSS LINKS...' + '\n';

    await sleep(10000);
  }
}

export default app;
