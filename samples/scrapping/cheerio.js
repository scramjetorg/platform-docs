'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

const BASE_URL = 'https://en.wikipedia.org';

async function load(url) {
  return (await axios.get(url)).data;
}

async function scrap() {
  const html = await load(BASE_URL);

  const $ = cheerio.load(html);

  const anchors = $('a');

  const links = new Set(
    Array.from(
      anchors
        .filter((i, link) => {
          const href = $(link).attr('href'); // first one is undefined

          return href && href.startsWith('/wiki/') && !href.includes(':');
        })
        .map((i, link) => {
          return $(link).attr('href');
        })
    )
  );

  // console.log(links);
  // console.log('---'.repeat(20));

  const categories = Array.from(links).map((link) => {
    return new Promise(async (res) => {
      const categoryName = new Set();
      const page = await axios.get(`${BASE_URL}${link}`);

      const $ = cheerio.load(page.data);

      const catLinks = $('#mw-normal-catlinks > ul > li');

      if (catLinks) {
        catLinks.children('a').each((i, link) => {
          const linkText = $(link).text();

          categoryName.add(linkText);
        });
      }
      res(categoryName);
    });
  });

  const result = await Promise.all(categories);

  // console.log('SUB CATEGORIES');
  // console.log(result);
  return result;
}

module.exports = { scrap };
