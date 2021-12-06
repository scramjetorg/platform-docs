const { PassThrough } = require("stream");

module.exports = function(input) {
    // create output stream
    const out = new PassThrough({encoding: 'utf-8'});

    // do something for each number in input stream
    input.on("data", data => {
        let outMessage = "";
        if (data > 0) {
            outMessage = "Snowman is melting! :("
        } else {
            outMessage = "Snowman is freezing ... :)"
        }
        // write to output stream
        out.write(outMessage)
    });
    // return output stream so it can be consumed (e.g. by CLI client)
    return out;
};
