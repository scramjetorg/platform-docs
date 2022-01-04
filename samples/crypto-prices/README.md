## crypto-prices  ![bitcoin](../../images/bitcoin1.png) ![zcash](../../images/zcash1.png) ![ethereum](../../images/etherum1.png)
---
Sequence that keeps printing current crypto prices for a provided pair of currencies every 1s.

> :bulb: **Please note that the sample below requires some previous installations before you start running it, you will find them [here](../../README.md#3-install-scramjet-transform-hub).**

### Running
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

# make a compressed package with sequence
si pack dist/ -o crypto-prices.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send crypto-prices.tar.gz

# start a sequence with currency parameters, this will output Instance ID
si seq start <sequence-id> ETH USD

# See output
si inst output <instance-id>
```

### Output

Once you run `si inst output <instance-id>` command you will get output like this one:

```bash
Request ok: http://127.0.0.1:8000/api/v1/instance/87442a03-a8ca-451c-b89f-d5371774c2f3/output status: 200 OK
"{\"data\":{\"base\":\"ETH\",\"currency\":\"USD\",\"amount\":\"3231.79\"}}"
"{\"data\":{\"base\":\"ETH\",\"currency\":\"USD\",\"amount\":\"3232.98\"}}"
"{\"data\":{\"base\":\"ETH\",\"currency\":\"USD\",\"amount\":\"3231.79\"}}"
```
