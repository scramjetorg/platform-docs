'use strict';
import scrap from './time-scraper';

const BASE_URL = 'https://time.is/';

(async () => {
  const result = await scrap(BASE_URL, "#clock");
  console.log(`RESULT: ${result}`);
})();
