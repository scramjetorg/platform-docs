## scraping

This is a simple and trivial example of scraping web pages.

The scraper takes URL and CSS ID selector as input parameters and returns data every second.

To test this please use URL: https://www.timeanddate.com/worldclock/poland and ID: `#act`. Scraper will connect to the website and read (scrap) the current time. Next, it returns this as a stream.

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
si seq start <sequence-id> https://www.timeanddate.com/worldclock/poland #act

# See output
si inst output <instance-id>

# Optional commands below:

# Check console.log messages
si inst stdout <instance-id>

# Check console.error messages
si inst stderr <instace-id>
```