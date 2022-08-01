import { TransformApp } from "@scramjet/types";
import { PassThrough } from "node:stream";


const app: TransformApp<string> = async function(input: any) {
    /*
    THIS IS WHERE YOU SHOULD PUT YOUR CODE, AND ALL THE LOGIC OF YOUR APPLICATION
    */

    // create a clean output stream
    const outputStream = new PassThrough({ encoding: "utf-8" });

    input.on("data", data => {
        // write some data to the output stream
        outputStream.write(data)
    });
    // return output stream so it can be consumed (e.g. by CLI client)
    return outputStream;
};

export default app;
