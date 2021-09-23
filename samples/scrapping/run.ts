'use strict';
// import scrap from './wiki-scraper';
import scrap from './time-scraper';

(async () => {
  const result = await scrap();
  console.log(`RESULT: ${result}`);
})();
