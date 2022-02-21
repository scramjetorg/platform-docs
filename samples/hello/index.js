const { Transform } = require("stream");

module.exports = function(input) {
    return input.pipe(new Transform({
        encoding: "utf-8",
        transform(chunk, _encoding, callback) {
            callback(null, `Hello ${chunk}`);
        }
    }));
};
