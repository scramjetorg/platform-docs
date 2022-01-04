import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import fetch from "node-fetch";

const getData = async (currency: string, baseCurrency: string) =>
    fetch(`https://api.coinbase.com/v2/prices/${currency}-${baseCurrency}/spot`)
        .then(res => res.json());
/**
 * Requests external API every 3 seconds.
 * Writes crypto prices to output stream.
 *
 * @param _stream - dummy input stream
 * @param currency currency (default: 'BTC')
 * @param baseCurrency currency (default: 'USD')
 */
const app: ReadableApp<string> = function(_stream, currency = "BTC", baseCurrency = "USD") {
    const outputStream = new PassThrough();

    setInterval(() => {
        getData(currency, baseCurrency)
            .then(data => {
                outputStream.write(JSON.stringify(data) + "\r\n");
            })
    }, 3000);

    return outputStream;
};

export default app;

