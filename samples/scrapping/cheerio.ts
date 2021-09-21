'use strict';

import * as cheerio from 'cheerio';
import axios from 'axios';

const BASE_URL = 'https://en.wikipedia.org';

async function load(url: string):Promise<any> {
  return (await axios.get(url)).data;
}

async function scrap() {
  const html = await load(BASE_URL);

  const $ = cheerio.load(html);

  const anchors = $('a');

  const links = new Set(
    Array.from(
      anchors
        .filter((i: any, link: any) => {
          const href = $(link).attr('href'); // first one is undefined

          return href && href.startsWith('/wiki/') && !href.includes(':');
        })
        .map((i: any, link: any) => {
          return $(link).attr('href');
        })
    )
  );

  // console.log(links);
  // console.log('---'.repeat(20));

  const categories:Promise<Set<string>>[] = Array.from(links).map((link) => {
    return new Promise(async (res) => {
      const categoryName:Set<string> = new Set();
      const page = await axios.get(`${BASE_URL}${link}`);

      const $ = cheerio.load(page.data);

      const catLinks = $('#mw-normal-catlinks > ul > li');

      if (catLinks) {
        catLinks.children('a').each((i: any, link: any) => {
          const linkText = $(link).text();

          categoryName.add(linkText);
        });
      }
      res(categoryName);
    });
  });

  const result:Set<string>[] = await Promise.all(categories);

  // console.log('SUB CATEGORIES');
  // console.log(result);
  return result;
}

export default scrap;

