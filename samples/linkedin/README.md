# Linkedin

Sequence that reads CSV input (e.g. dump of companies from crunchbase), uses RapidAPI to gather additional data from LinkedIn and outputs aggregated details.

## Running

Open three terminals and run the following commands:

**The First Terminal:**

```bash
# start sth
scramjet-transform-hub
```

**The Second terminal**

```bash
# go to 'crypto-prices' directory
cd samples/linkedin

# install dependencies
npm install

# transpile TS->JS and copy node_modules and package.json to dist/
npm run build

# deploy the Sequence from the dist/ directory, which contains transpiled code, package.json and node_modules
si seq deploy dist
# copy instance _id - you'll use this in 3rd terminal window

# see the Instance output
si inst output -
```

**The third terminal**

```bash
# replace INSTANCE_ID with actual instance ID and pipe CSV output to instance input
cat companies.csv | si inst input INSTANCE_ID
```
