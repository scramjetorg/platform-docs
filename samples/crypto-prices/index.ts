import { ReadableApp } from "@scramjet/types";
import fetch from "node-fetch";

async function defer(interval: number) {
    await new Promise(res => setTimeout(res, interval));
}

/**
 * Requests external API every 3 seconds.
 * Writes crypto prices to output stream.
 *
 * @param _stream - dummy input stream
 * @param currency currency (default: 'BTC')
 * @param baseCurrency currency (default: 'USD')
 */
const app: ReadableApp<string> = function(_stream, currency = "BTC", baseCurrency = "USD", interval = 3000) {
    return async function* () {
        while (true) {
            const ref = defer(interval);
            const data = await fetch(`https://api.coinbase.com/v2/prices/${currency}-${baseCurrency}/spot`);
            yield JSON.stringify(await data.json()) + "\r\n";
            await ref;
        }
    };
};

export default app;

