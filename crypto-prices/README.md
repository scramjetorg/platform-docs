## crypto-prices
----
Sequence that keeps printing current crypto prices for a provided pair of currencies every 1s.

### Running
```bash
# install dependencies
yarn install 

# transpile TS->JS to dist/
yarn build 

# prepare standalone JS package
cp -r node_modules package.json dist/

# make a compressed package with sequence
si pack dist/ -o crypto-prices.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send crypto-prices.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id> "[\"ETH\", \"USD\"]" 

# See output
si inst output <instance-id>
```