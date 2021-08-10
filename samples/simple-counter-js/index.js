const {DataStream} = require("scramjet");

module.exports = async function(stream, start = 0, end = 1000) {
  await DataStream.from(async function*() {
    let i = +start || 0;
    while(i++ < end) {
      await new Promise(res => setTimeout(res, 1000));
      yield {x: i};
    }
  })
  .do(console.log)
  .run()
}
