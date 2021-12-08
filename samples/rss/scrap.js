'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

async function scrap(url, selectorStr) {
  const html = (await axios.get(url)).data;
  const $ = cheerio.load(html);
  const selector = $(selectorStr);

  return selector.text();
}

module.exports = { scrap };
