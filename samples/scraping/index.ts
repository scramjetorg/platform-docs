import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import scrap from "./time-scraper";


const app: ReadableApp<string> = async function (_stream: any, url: string, id: string) {
    const outputStream = new PassThrough({ objectMode: true });

    setInterval(async () => {
        const result = await scrap(url, id);
        outputStream.write(result);
    }, 1000);

    

    return outputStream;
}

export default app;