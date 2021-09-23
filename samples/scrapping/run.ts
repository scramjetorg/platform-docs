'use strict';
// import scrap from './wiki-scrapper';
import scrap from './time-scrapper';

(async () => {
  const result = await scrap();
  console.log(`RESULT: ${result}`);
})();
