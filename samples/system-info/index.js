const os = require("os");

module.exports = async function*(_timeout) {
    const timeout = +_timeout || 1000;
    console.log({timeout});

    while (true) {
        const next = new Promise(res => setTimeout(res, timeout));
        yield {
            ts: Date.now(),
            mem: os.freemem()
        }
        await next;
    }
}
