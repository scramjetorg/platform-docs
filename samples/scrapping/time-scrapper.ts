'use strict';

import * as cheerio from 'cheerio';
// import puppeteer from 'puppeteer';
import chromium from 'chrome-aws-lambda';
// import * as child from 'child_process';

const BASE_URL = 'https://currentmillis.com/';

async function scrap() {


    // const executablePath = resolve('/package/chrome');
    // const executablePath = '/home/ajaworski/development/scramjet-cloud-docs/samples/scrapping/node_modules/chrome-aws-lambda/bin/chromium';
    const chromiumPath = await chromium.executablePath;
    const executablePath =  `${__dirname}/node_modules/chromium/lib/chromium/chrome-linux/chrome`// await chromium.executablePath; // null as there is not env var.
    console.log('AJ executablePath: ' + executablePath);
    console.log('AJ chromiumPath: ' + chromiumPath);

    // child.exec('ls -alt', (err, stdout, stderr) => {
    //     console.log('stdout: ' + stdout);
    // });

    // child.exec('ls -alt /app/runner', (err, stdout, stderr) => {
    //     console.log('app/runner: ' + stdout);
    // });

    // child.exec('ls -alt /package', (err, stdout, stderr) => {
    //     console.log('/package: ' + stdout);
    // });

    const browser = await chromium.puppeteer.launch({
        headless: true,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath
      });
    const page = await browser.newPage(); 
    await page.goto(BASE_URL);
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    const selector = $('#utcTime');

    return selector.text();
}

export default scrap;

