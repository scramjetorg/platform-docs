import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import scrap from "./scrapper";


const app: ReadableApp<string> = async function (_stream: any) {

    const outputStream = new PassThrough({ objectMode: true });

    const result = await scrap();

    // TODO: Silly implementation as this is getting all results in one-go.
    outputStream.write(result.map(links => Array.from(links)))

    return outputStream;
}

export default app;