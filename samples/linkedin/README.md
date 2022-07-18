# Linkedin

Sequence that reads CSV input (e.g. dump of companies from crunchbase), uses RapidAPI to gather additional data from LinkedIn and outputs aggregated details.

## Pre-configuration

Create `config.json` file with following content:
```json
{
    "XRapidAPIKey": YOUR_RAPID_API_KEY_GOES_HERE
}

```

## Running

Open three terminals and run the following commands:

**The First Terminal:**

```bash
# start sth by executing command...
scramjet-transform-hub

# ...or use script
cd transform-hub
yarn start -P 8000
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
