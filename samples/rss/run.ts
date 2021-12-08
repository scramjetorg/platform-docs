'use strict';
import { getRss, checkKeywords } from './rss';
import { scrap } from '../scraping/scrap'

const url:string = 'https://stackoverflow.com/feeds/tag?tagnames=node.js&sort=newest';

const keywords:Array<Object> = [ { word: 'serverless', weight: 15 }, { word: 'ABCDEF', weight: 20 } ];


(async () => {

  const result = await getRss(url);

  result.forEach(async url => {
      const content = await scrap(url, '#mainbar');
      // console.log(content);

      const results = checkKeywords(content, keywords);

      console.log(results)
  });

})();
