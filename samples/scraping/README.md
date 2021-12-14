## scraping

This is a simple and trivial example of scraping web pages.

The scraper takes URL and CSS ID selector as input parameters and returns data every second.

To test this please use URL: https://www.timeanddate.com/worldclock/poland and ID: `#ct`. Scraper will connect to the website and read (scrap) the current time. Next, it returns this as a stream.
As URL and ID are parametrized we can use other websites too. For example, URL: https://time.is/ and ID: `#clock`

### Running
Open two terminals and run the following commands:

**The first terminal:**
```bash
# start sth
scramjet-transform-hub
```

**The second terminal**
```bash
# go to 'scraping' directory
cd samples/scraping

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

# start a sequence, this will output Instance ID. As the CSS ID has # (hash) sign surround it with quotes:
si seq start <sequence-id> https://www.timeanddate.com/worldclock/poland '#ct'

# See output
si inst output <instance-id>

# Optional commands below:

# Check console.log messages
si inst stdout <instance-id>

# Check console.error messages
si inst stderr <instance-id>
```
