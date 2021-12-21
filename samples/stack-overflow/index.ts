import { ReadableApp, SynchronousStreamable } from "@scramjet/types";
import { PassThrough } from "stream";
import diff from "./stack-overflow";

const ONE_MINUTE = 60000;

const app: ReadableApp<string> = async function (_stream: any, interval: number, key: string) {
    const outputStream = new PassThrough({ objectMode: true });

    setInterval(async () => {
        const result = await diff(interval, key);
        if (Object.keys(result.diff).length > 0) outputStream.write(result);
    }, interval * ONE_MINUTE);

    (outputStream as SynchronousStreamable<any>).contentType = "application/x-ndjson";
    
    return outputStream;
}

export default app;