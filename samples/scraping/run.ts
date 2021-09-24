'use strict';
import scrap from './time-scraper';

(async () => {
  const result = await scrap();
  console.log(`RESULT: ${result}`);
})();
