'use strict'
import Parser from 'rss-parser';

const parser = new Parser();

/**
 * Get RSS Feed
 * 
 * @param {string} url RSS URL
 * @returns {Array} 
 */
async function getRss(url: string) {
    const feed = await parser.parseURL(url);

    const urls = feed.items.map(item => item.link);
    console.log(urls);
    // For Testing
    return ['https://stackoverflow.com/questions/70035396/allow-guest-mode-no-authorization-in-custom-authorizer-in-aws'];
}

function checkKeywords(content:string, keywords:Array<any>):Array<any> {

    const results:Array<any> = [];

    keywords.forEach(entry => {
        const regex = new RegExp(entry.word, 'g');

        const count = content.match(regex)?.length || 0;
    
        results.push({ word: entry.word, weight: count * entry.weight });
    });

    return results;
}

export { checkKeywords, getRss };