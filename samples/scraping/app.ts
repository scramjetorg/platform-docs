import { ReadableApp } from "@scramjet/types";
import { scrap } from './scrap'
import { sleep } from './utils'

const app: ReadableApp<string, [string, string]> = async function* (_stream, url, selectorStr) {
    while(true) {
        const result = await scrap(url, selectorStr);
        yield result + '\n'

        await sleep(5000)
    }
}

export default app;
