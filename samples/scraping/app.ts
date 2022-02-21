import { ReadableApp } from "@scramjet/types";
import { scrape } from './scrape'
import { sleep } from './utils'

const app: ReadableApp<string, [string, string]> = async function* (
    _stream, 
    url, 
    selectorStr,
    interval = 5000,
) {
    while(true) {
        const timer = sleep(interval);
        yield await scrape(url, selectorStr) + '\n'
        
        await timer;
    }
}

export default app;
