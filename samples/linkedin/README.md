# linkedin

Sequence that reads CSV input (e.g. dump of companies from crunchbase), uses RapidAPI to gather additional data from LinkedIn and outputs aggregated details.

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