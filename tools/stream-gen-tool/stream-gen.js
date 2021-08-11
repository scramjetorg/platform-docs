const http = require("http");
const instanceId = process.argv[2]
const req = http.request({
    method: "post",
    port: 8000,
    host: "127.0.0.1",
    path: `/api/v1/instance/${instanceId}/input`,
    headers: { "Content-Type":  "application/octet-stream" },
});
http.get(`http://127.0.0.1:8000/api/v1/instance/${instanceId}/output`, res => {
    res.on('data', (outData) => console.log('OUTPUT| ' + outData))
});
const wait = ms => new Promise(res => setTimeout(res, ms))
let msgCounter = 0
let weatherStation = Math.floor(10000 * Math.random());
async function main() {
    while(true) {
        let tempDegrees = Math.round(100* (Math.random()-0.5))
        const msg = tempDegrees.toString()
        req.write(msg)
        console.log("----------------------------------------")
        console.log(`Message# ${++msgCounter} | Temperature measure`)
        console.log('INPUT | ' + msg)
        await wait(1000)
    }
}
main();