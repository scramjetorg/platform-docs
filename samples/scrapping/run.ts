'use strict';
import scrap from './scrapper';

(async () => {
  const result = await scrap();
  console.log(result);
})();
