const { PassThrough } = require("stream");

module.exports = function(_input) {
    const out = new PassThrough();

    setInterval(
        () => out.write("Test " + Math.floor(Math.random() * 10) + "\n"),
        1000
    );

    return out;
};
