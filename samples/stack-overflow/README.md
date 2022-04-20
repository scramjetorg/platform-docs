# stack-overflow

Get number of changes in Stack Overflow tag count.

This queries SO API every X minutes, gathers, compares and outputs result as difference.

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
# go to 'stack-overflow' directory
cd samples/stack-overflow

# install dependencies
npm install

# transpile TS->JS to dist/
npm run build

# deploy the Sequence from the dist/ directory, which contains transpiled code, package.json and node_modules
si seq deploy dist --args '[minutes, "request_key"]'

# See Instance output
si inst output -

# Optional commands below:

# Check console.log messages
si inst stdout -

# Check console.error messages
si inst stderr -
```

> 💡**NOTE:** Command `deploy` performs three actions at once: `pack`, `send` and `start` the Sequence. It is the same as if you would run those three commands separately:

```bash
si seq pack dist/ -o stack-overflow.tar.gz    # compress 'dist/' directory into file named 'stack-overflow.tar.gz'

si seq send stack-overflow.tar.gz    # send packed Sequence to STH, this will output Sequence ID

si seq start - --args '[minutes, "request_key"]'   # start the Sequence with arguments ("request_key" argument is optional), this will output Instance ID
```

## Example output

```bash
{"diff":{"python":1,"c#":1,"android":1,"html":2,"jquery":1,"c++":1,"css":1,"node.js":1,"reactjs":1,".net":1,"swift":2,"xml":1,"vb.net":1,"amazon-web-services":1,"function":-1,"csv":1},"timestamp":1632986938780}
{"diff":{"python":1,"c#":1,"android":1,"html":2,"jquery":1,"c++":1,"css":1,"node.js":1,"reactjs":1,".net":1,"swift":2,"xml":1,"vb.net":1,"amazon-web-services":1,"function":-1,"csv":1},"timestamp":1632986998764}
{"diff":{"python":3,"java":2,"php":-1,"android":1,"c++":1,"sql":2,"r":1,"node.js":-1,"asp.net":1,"python-3.x":-1,"django":1,"angular":1,"excel":1,"pandas":1,"asp.net-mvc":-1,"typescript":1,"mongodb":-1,"windows":-1,"postgresql":1,"bash":1,"amazon-web-services":1,"dataframe":1,"python-2.7":-1,"qt":1},"timestamp":1632987118788}
```
