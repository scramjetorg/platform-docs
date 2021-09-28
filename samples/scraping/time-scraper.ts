'use strict';

import * as cheerio from 'cheerio';
import axios from 'axios';

async function scrap(url: string, id: string) {

    const html = (await axios.get(url)).data;
    const $ = cheerio.load(html);
    const selector = $(id);

    return selector.text();
}

export default scrap;

