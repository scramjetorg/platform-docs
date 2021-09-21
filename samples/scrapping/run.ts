'use strict';
import scrap from './cheerio';

(async () => {
  const result = await scrap();
  console.log(result);
})();
