import { Streamable, TransformApp } from "@scramjet/types";
import { StringStream } from "scramjet";
import { PassThrough } from "stream";
import axios from 'axios';

const mod: (TransformApp | { requires: string, contentType: string })[] = [
    { requires: "messages", contentType: "application/x-ndjson" },
    function (input: Streamable<any>, DISCORD_WEBHOOK_URL: string) {
        const out = new PassThrough({ objectMode: true });

        (input as StringStream)
            .map(async (data: any) => {
                await axios.post(DISCORD_WEBHOOK_URL, { content: data.text });
            })

        return out;
    }
];

export default mod;