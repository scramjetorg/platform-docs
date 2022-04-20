# crypto-prices ![bitcoin](../../images/bitcoin1.png) ![zcash](../../images/zcash1.png) ![ethereum](../../images/etherum1.png)

Sequence that keeps printing current crypto prices for a provided pair of currencies every 3 seconds.

___

### The video that illustrates the execution of the sample is on our [YouTube](https://www.youtube.com/channel/UChgTmKeuAsKj8kDnylkmP6Q) channel [How to check cryptocurrency prices using Scramjet?](https://www.youtube.com/watch?v=BPLKPVVyHNY&t=3s)

___

> 💡 **Please note that the sample below requires some previous installations before you start running it, you will find them [here](../../README.md#3-install-scramjet-transform-hub).**

## Running

Open two terminals and run the following commands:

**The first terminal:**

```bash
# start sth
scramjet-transform-hub
```

**The second terminal**

```bash
# go to 'crypto-prices' directory
cd samples/crypto-prices

# install dependencies
npm install

# transpile TS->JS and copy node_modules and package.json to dist/
npm run build

# deploy the Sequence from the dist/ directory, which contains transpiled code, package.json and node_modules
si seq deploy dist

# see the Instance output
si inst output -
```

> 💡**NOTE:** Command `deploy` performs three actions at once: `pack`, `send` and `start` the Sequence. It is the same as if you would run those three commands separately:

```bash
si seq pack dist/ -o crypto-prices.tar.gz    # compress 'dist/' directory into file named 'crypto-prices.tar.gz'

si seq send crypto-prices.tar.gz    # send packed Sequence to STH, this will output Sequence ID

si seq start -    # start the Sequence, this will output Instance ID
```

## Output

Once you run `si inst output -` command you should get an output similar to this one:

```bash
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
"{\"data\":{\"base\":\"BTC\",\"currency\":\"USD\",\"amount\":\"40989.61\"}}\r\n"
```
