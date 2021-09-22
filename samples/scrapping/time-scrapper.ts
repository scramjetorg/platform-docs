'use strict';

import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const BASE_URL = 'https://currentmillis.com/';

async function scrap() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage(); 
    await page.goto(BASE_URL);
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    const selector = $('#utcTime');

    return selector.text();
}

export default scrap;

