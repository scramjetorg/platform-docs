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

    // If you wish to operate the output stream in "object mode", please specify the content type of the returned stream to be "application/x-ndjson". You can implement by using SynchronousStreamable type from "@scramjet/types".
    (outputStream as SynchronousStreamable<any>).contentType = "application/x-ndjson";

    return outputStream;
}

export default app;