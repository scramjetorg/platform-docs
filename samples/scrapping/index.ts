import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import scrap from "./cheerio";


const app: ReadableApp<string> = async function (_stream: any) {

    const outputStream = new PassThrough({ objectMode: true });

    const result = await scrap();

    outputStream.write(result)

    return outputStream;
}

export default app;