'use strict';
import { getRss, checkKeywords, postToSlack, getScore } from './rss';
import { scrap } from '../scraping/scrap';

const url:string = 'https://stackoverflow.com/feeds/tag?tagnames=node.js&sort=newest';

const keywords:Array<Object> = [ { word: 'serverless', weight: 15 }, { word: 'ABCDEF', weight: 20 } ];

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
  if (list.length < MAX_LIST) {
    list.push({url, title, score, keywords: results});
  } else {
    if (list[list.length - 1].score < score) {
      list.pop();
      list.push({url, title, score, keywords: results});
    }
  }
  list.sort((a, b) => b.score - a.score);
}


(async () => {

  const links = await getRss(url);

  links.forEach(async link => {
      // check if link is not already on the list
      const exists = list.find(item => item.url === link.url);
      if (!exists) {  
        const content = await scrap(link.url, '#mainbar');
        const results = checkKeywords(content, keywords);
        const score = getScore(results);
        addToList(link.url, link.title, score, results)
        await postToSlack(link.title, link.url, results);
      }
  });

})();
