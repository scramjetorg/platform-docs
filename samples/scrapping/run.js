'use strict';

const { scrap } = require('./cheerio');

(async () => {
  const result = await scrap();
  console.log(result);
})();
