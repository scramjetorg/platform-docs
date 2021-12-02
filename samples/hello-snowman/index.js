const { PassThrough } = require("stream");

module.exports = function(input) {
    // create output stream
    const out = new PassThrough({encoding: 'utf-8'});

// zostawić tylko return out. a w środku napisać coś takiego, że tutaj możesz czytać input stream, robić coś nim
// jakoś go transformować i potem pisać pipelinem do outputu
// out linie od 7 do 31

    console.log("This log will appear only once when the function is called for the first time.");
    // do something for each number in input stream
    input.on("data", data => {

        let outMessage = "";
        if (data > 0) {
            outMessage = "Snowman is melting! :("
            // this console.log() will write to stdout
            console.log("Spring is coming ");
            // this console.log() will write to stderr
            console.error("I hope it will get colder!");
        } else {
            outMessage = "Snowman is freezing ... :)"
            // this console.log() will write to stdout
            console.log("Winter is coming");
            // this console.log() will write to stderr
            console.error("I hope it will stay cold!");
        }
        // write to output stream
        out.write(outMessage)
        }
);

    // return output stream so it can be consumed (e.g. by CLI client)
    return out;
};
