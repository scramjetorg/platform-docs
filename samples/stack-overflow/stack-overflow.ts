'use strict';

import axios from 'axios';
const BASE_URL = 'https://api.stackexchange.com';
const TAGS_URL = '/2.3/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow';

const ONE_MINUTE = 60000;

/**
 * Sleep
 * 
 * Helper function that pauses execution. 
 * 
 * @param {number} ms Number of milliseconds to sleep
 * @returns {Promise}
 */
 async function sleep(ms): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get difference of tag changes
 * 
 * @param {number} interval - Number of minutes to wait
 * @param {string} [key] - Optional request API key 
 * @returns {Object}
 */
async function diff(interval: number, key?: string) {

    const url = key ? `${BASE_URL}${TAGS_URL}&key=${key}` : `${BASE_URL}${TAGS_URL}`;
    const before = (await axios.get(url)).data.items;
  
    await sleep(interval * ONE_MINUTE);
  
    const after = (await axios.get(url)).data.items;
  
    const change = after.map(tag => {
      return {
          name: tag.name,
          diff: tag.count - before.find(item => item.name === tag.name).count
      }
    });
  
    // Remove no changes
    const filtered = change.filter(item => item.diff > 0 || item.diff < 0);
  
    const result = {};
  
    filtered.forEach(element =>
    {   
      const o = { [element.name]: element.diff };
      Object.assign(result, o);
    });
  
    return { diff: result, timestamp: Date.now() }
}

export default diff;

