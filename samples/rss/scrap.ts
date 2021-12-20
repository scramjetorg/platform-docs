import * as cheerio from 'cheerio';
import axios from 'axios';

export async function scrap(url: string, selectorStr: string) {
  const html = (await axios.get(url)).data;
  const $ = cheerio.load(html);
  const selector = $(selectorStr);

  return selector.text();
}