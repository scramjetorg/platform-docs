import { TransformApp } from "@scramjet/types";
// import { DataStream } from "scramjet";
import { PassThrough } from "stream";
import csv from 'csv-parser';

const sleep = (timeMs: number) => new Promise(res => setTimeout(res, timeMs));

const app: TransformApp = (
    input
) => {
    const out = new PassThrough({ encoding: "utf-8" });

    const stream = input.pipe(csv());

    stream.on("data", async (data: Buffer) => {
        // Simple check which removes header if it's resent, i.e. if another CSV is getting processed AND it has header line.
        if (data["Organization Name"] === "Organization Name") return;

        out.write("DATA: " + JSON.stringify(data) + "\n");

        // Deliberately slow down in order to not exceed API requests limits.
        stream.pause();
        await sleep(5000);
        stream.resume();
    })
        .on('end', () => {
            console.log('CSV file successfully processed')
        });

    return out;
}


export default app;
