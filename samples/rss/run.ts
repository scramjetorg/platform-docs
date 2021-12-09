'use strict';
import { getRss, checkKeywords, postToSlack } from './rss';
import { scrap } from '../scraping/scrap';

const url:string = 'https://stackoverflow.com/feeds/tag?tagnames=node.js&sort=newest';

const keywords:Array<Object> = [ { word: 'serverless', weight: 15 }, { word: 'ABCDEF', weight: 20 } ];


(async () => {

  const result = await getRss(url);

  result.forEach(async item => {
      const content = await scrap(item.url, '#mainbar');
      // console.log(content);
      const results = checkKeywords(content, keywords);
      await postToSlack(item.title, item.url, results);
  });

})();
