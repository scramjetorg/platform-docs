const { PassThrough } = require("stream");

module.exports = [
    {
        requires: "names", 
        contentType: "application/x-ndjson"
    },
    async function(input) {
        const out = new PassThrough({ objectMode: true });

        (await input)
            // show incoming topic data on stdout
            .do(console.log)
            // transform incoming data
            .map((data) => `Hello ${data.name}!`)
            // pipe transformed data to Instance output
            .pipe(out);

        // write transformed data to the new topic called 'greetings'
        out.topic = "greetings";
        out.contentType = "application/x-ndjson";

        return out;
    }
];
