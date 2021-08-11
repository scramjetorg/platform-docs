const { PassThrough } = require("stream");

module.exports = function(input) {
    const out = new PassThrough();

    input.on("data", data => {
        let outMessage = "";
        if (data > 0) {
            outMessage = "Snowman is melting! :("
        } else {
            outMessage = "Snowman is freezing ... :)"
        }
        out.write(outMessage)}
        );

    return out;
};
