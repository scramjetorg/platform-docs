'use strict';
import scrap from './time-scraper';

const BASE_URL = 'https://www.timeanddate.com/worldclock/poland';

(async () => {
  const result = await scrap(BASE_URL, "#act");
  console.log(`RESULT: ${result}`);
})();
