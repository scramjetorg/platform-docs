## crypto-prices

---

Sequence that keeps printing current crypto prices for a provided pair of currencies every 1s.

### Running

```bash
# install dependencies
npm install

# transpile TS->JS to dist/
npm run build

# prepare standalone JS package
cp -r node_modules package.json dist/

# make a compressed package with sequence
si pack dist/ -o crypto-prices.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send crypto-prices.tar.gz

# start a sequence with currency parameters, this will output Instance ID
si seq start <sequence-id> ETH USD

# See output
si inst output <instance-id>
```

#### Output

Once you run `si inst output <instance-id>` command you will get output like this one:

```bash
Request ok: http://127.0.0.1:8000/api/v1/instance/87442a03-a8ca-451c-b89f-d5371774c2f3/output status: 200 OK
"{\"data\":{\"base\":\"ETH\",\"currency\":\"USD\",\"amount\":\"3231.79\"}}"
"{\"data\":{\"base\":\"ETH\",\"currency\":\"USD\",\"amount\":\"3232.98\"}}"
"{\"data\":{\"base\":\"ETH\",\"currency\":\"USD\",\"amount\":\"3231.79\"}}"
```
