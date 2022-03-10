const os = require("os");

module.exports = async function*(input, _timeout) {
    const timeout = +_timeout || 1000;
    console.log({timeout});

    while (true) {
        const next = new Promise(res => setTimeout(res, timeout));
        yield {
            type: "basic",
            ts: Date.now(),
            mem: os.freemem()
        }
        await next;
    }
}
