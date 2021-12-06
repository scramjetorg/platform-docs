const { PassThrough } = require("stream");

module.exports = function(input) {
    // create a clean output stream
    const out = new PassThrough({encoding: 'utf-8'});

    input.on("data", data => {
        // write some data to output stream
        out.write(data)
    });
    // return output stream so it can be consumed (e.g. by CLI client)
    return out;
};
