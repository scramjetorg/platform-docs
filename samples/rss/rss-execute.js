'use strict';

const Parser = require('rss-parser');

const parser = new Parser();

/**
 * Get RSS Feed
 *
 * @param {string} url RSS URL
 * @returns {Array}
 */
async function getRss(url) {
  const feed = await parser.parseURL(url);

  const urls = feed.items.map((item) => item.link);
  // console.log(urls);
  // For Testing
  return [
    'https://stackoverflow.com/questions/70035396/allow-guest-mode-no-authorization-in-custom-authorizer-in-aws',
  ];
}

module.exports = { getRss };
