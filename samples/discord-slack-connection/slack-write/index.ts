import { Streamable, TransformApp } from "@scramjet/types";
import { StringStream } from "scramjet";
import { PassThrough } from "stream";
import axios from 'axios';

const mod: (TransformApp | { requires: string, contentType: string })[] = [
    { requires: "messages", contentType: "application/x-ndjson" },
    function (input: Streamable<any>, SLACK_WEBHOOK_URL: string) {
        const out = new PassThrough({ objectMode: true });

        (input as StringStream)
            .map(async (data: any) => {
                const { text } = data;
                await axios.post(SLACK_WEBHOOK_URL, { text });
            })
        // .pipe(out);

        return out;
    }
];

export default mod;