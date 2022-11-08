const { PassThrough } = require("stream");

const names = ["Alice", "Ada", "Aga", "Michael", "Patrick", "Rafael", "Aida", "Barbra", "Natalie", "Tom", "Adam"];

/**
 * Mutli output application.
 *
 * @param _stream - dummy input stream
 * @param max - how many items to be sent
 */

module.exports = async function(_stream, max = 10) {
    const ps = new PassThrough({ objectMode: true });

    let cnt = 0;

    const interval = setInterval(async () => {
        const data = { name: names[cnt % names.length] };

        ps.write(data);

        cnt++;

        if (cnt > max) {
            clearInterval(interval);
            ps.end();
        }
    }, 500);

    ps.topic = "names";
    ps.contentType = "application/x-ndjson";

    return ps;
};