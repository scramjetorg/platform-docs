## scraping

This is a simple and trivial example of scraping web pages.

We scrap current time from https://www.timeanddate.com/worldclock/poland and return this as a stream.

### Running

```bash
# install dependencies
npm install

# transpile TS->JS to dist/
npm run build

# prepare standalone JS package
cp -r node_modules package.json dist/

# make a compressed package with sequence
si pack dist

# send sequence to transform hub, this will output Sequence ID
si seq send dist.tar.gz

# start a sequence, this will output Instance ID.
si seq start <sequence-id>

# See output
si inst output <instance-id>

# Optional commands below:

# Check console.log messages
si inst stdout <instance-id>

# Check console.error messages
si inst stderr <instace-id>
```