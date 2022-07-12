# Samples

Try out our samples prepared some samples for you. We differentiated them according to the language in which they were written.

Every sample contains a short readme with a guidance describing the procedure for running the example. The execution will be performed from the command line using our CLI, which full description and documentation you will find [here](https://github.com/scramjetorg/transform-hub/tree/devel/docs/cli).

> 💡 **Please note that samples below require some previous installations before you start running them. Instructions are [here](../README.md#3-install-scramjet-transform-hub).**

## Python samples

Python packages work in a similar way to all the others. They need to pack the dependencies and carry over anything they may need to run the program. They also need a `package.json` file.

- [voice-recognition](voice-recognition) - a sample Sequence that performs voice recognition in real time.

## JavaScript samples

JavaScript packages are pretty straight forward in use. After the dependency installation is performed inside the Sequence package it is ready to be compressed and sent to STH.

- [hello](hello) - Sequence that modifies incoming stream of strings by saying "Hello".
- [hello-snowman](hello-snowman) - Sequence that reads incoming stream, and modifies it by adding a text message according to the incoming data.
- [simple-counter-js](simple-counter-js) - Sequence, that counts to 1000, and logs the number in one-second intervals.
- [test-output](test-output) - Sequence that simply writes random values to the output stream.

## TypeScript samples

TypeScript compiles to JavaScript. It means that TypeScript packages except dependency installation also need to be compiled. We added a `build` and `postbuild` scripts to every `package.json` in TypeScript packages, which are responsible for compiling files into a `dist` folder and coping `package.json` file into the `dist` folder. In effect, it is the `dist` folder, that becomes the Sequence package, ready to be compressed and sent to STH.

- [crypto-prices](crypto-prices) - Sequence that keeps printing current crypto prices for a provided pair of currencies every 3s.
- [discord-slack-connection](discord-slack-connection) - a set of Sequences that enable communication between Slack and Discord.
- [mediawiki](mediawiki) - Sequence that keeps printing mediawiki event stream.
- [rss](rss) - Sequence that gets a list of RSS and then retrieves each feed and passes links to scraper.
- [scraping](scraping) - Sequence that scrapes web pages.
- [stack-overflow](stack-overflow) - Sequence that gets a number of changes in Stack Overflow tag count.
- [transform-string-stream](transform-string-stream) - Sequence that modifies incoming stream of strings by adding a prefix and a suffix.
