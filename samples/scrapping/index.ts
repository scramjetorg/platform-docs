import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import scrap from "./time-scrapper";


const app: ReadableApp<string> = async function (_stream: any) {

    const outputStream = new PassThrough({ objectMode: true });

    setInterval(async () => {
        const result = await scrap();
        outputStream.write(result);
    }, 1000);

    

    return outputStream;
}

export default app;