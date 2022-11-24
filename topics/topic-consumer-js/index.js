const { PassThrough } = require("stream");

module.exports = [
    { requires: "names", contentType: "application/x-ndjson" },
    function(input) {
        const out = new PassThrough({ objectMode: true });

        (input)
            .map((data) => `Hello ${data.name}! \n`)
            .pipe(out);

        return out;
    }
];
