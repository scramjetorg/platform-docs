'use strict';
import { getLinks, checkKeywords, postToSlack, getScore } from './rss';
import { scrap } from '../scraping/scrap';
import keywords from './config/keywords.json';
import { promises as fs } from 'fs';


// { url, title, score, keywords }
const list:Array<any> = []
const MAX_LIST:number = 10;

/**
 * Helper function that keeps links in an order list
 * If the new link has higher score than the lowest in the list then links are replaced.
 * 
 * @param url 
 * @param title 
 * @param score 
 * @param results 
 */
function addToList(url:string, title:string, score:number, results:Array<any>) {
  if (score === 0) return false;

  let added:boolean = false;

  if (list.length < MAX_LIST) {
    list.push({url, title, score, keywords: results});
    added = true;
  } else {
    if (list[list.length - 1].score < score) {
      list.pop();
      list.push({url, title, score, keywords: results});
      added = true;
    }
  }
  if (added) list.sort((a, b) => b.score - a.score); // Sort only when a new link was added.
  return added;
}

/**
 * Read RSS Feed URL from config file.
 * 
 */
async function getRSS() {
  const data = await fs.readFile('./config/rss.txt');
  return data.toString().split("\n");
}


(async () => {

  const feed = await getRSS();
  feed.forEach(async rss => {
    
    const links = await getLinks(rss);

    links.forEach(async link => {
        // check if link is not already on the list
        const exists = list.find(item => item.url === link.url);
        if (!exists) {  
          const content = await scrap(link.url, '#mainbar');
          const results = checkKeywords(content, keywords);
          const score = getScore(results);
          const added = addToList(link.url, link.title, score, results)
          if (added) await postToSlack(link.title, link.url, results);
        }
    });
  })


})();
