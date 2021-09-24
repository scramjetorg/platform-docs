'use strict';

import * as cheerio from 'cheerio';
import axios from 'axios';

const BASE_URL = 'https://www.timeanddate.com/worldclock/poland';

async function scrap() {

    const html = (await axios.get(BASE_URL)).data;
    const $ = cheerio.load(html);
    const selector = $('#ct');

    return selector.text();
}

export default scrap;

