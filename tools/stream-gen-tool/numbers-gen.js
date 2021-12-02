const http = require("http");
const instanceId = process.argv[2]
const wait = ms => new Promise(res => setTimeout(res, ms))

const req = http.request({
    method: "post",
    port: 8000,
    host: "127.0.0.1",
    path: `/api/v1/instance/${instanceId}/input`,
    headers: { "Content-Type":  "application/octet-stream" },
});

async function main() {
    while(true) {
        let randomNrs = Math.round(10* (Math.random()))
        const numbersToString = randomNrs.toString()
        req.write(numbersToString)

        console.log(`Randomly selected number: ${numbersToString}`)
        await wait(1000)
    }
}
main();