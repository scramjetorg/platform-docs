# scraping

This is a simple and trivial example of scraping web pages.

The scraper takes URL and CSS ID selector as input parameters and returns data every second.

To test this please use URL: <https://www.timeanddate.com/worldclock/poland> and ID: `#ct`. Scraper will connect to the website and read (scrap) the current time. Next, it returns this as a stream.
As URL and ID are parametrized we can use other websites too. For example, URL: <https://time.is/> and ID: `#clock`

___

### The execution of this sample has been visualized in the form of a short video that is available on our [YouTube](https://www.youtube.com/channel/UChgTmKeuAsKj8kDnylkmP6Q) channel 👉 [How to scrape websites using Scramjet Transform Hub?](https://www.youtube.com/watch?v=w7c_YgBvcGo&t=3s)

___

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
# go to 'scraping' directory
cd samples/scraping

# install dependencies
npm install

# transpile TS->JS and copy node_modules and package.json to dist/
npm run build

# deploy the Sequence from the dist/ directory, which contains transpiled code, package.json and node_modules
si seq deploy dist --args '["https://www.timeanddate.com/worldclock/poland", "#ct"]'

# See output
si inst output -

# Optional commands below:

# Check console.log messages
si inst stdout -

# Check console.error messages
si inst stderr -
```

> 💡**NOTE:** Command `deploy` performs three actions at once: `pack`, `send` and `start` the Sequence. It is the same as if you would run those three commands separately:

```bash
si seq pack dist/ -o scraping.tar.gz    # compress 'scraping/' directory into file named 'scraping.tar.gz'

si seq send scraping.tar.gz    # send compressed Sequence to STH, this will output Sequence ID

si seq start - --args '["https://www.timeanddate.com/worldclock/poland", "#ct"]'    # start the Sequence with arguments, this will output Instance ID
```

## Output

```bash
$ si inst output -
Request ok: http://127.0.0.1:8000/api/v1/instance/41783884-2e97-4b78-9639-aac5d7ff8447/output status: 200 OK
13:06:10
13:06:15
13:06:20
13:06:25
13:06:31
13:06:36
13:06:41
13:06:46
13:06:51
13:06:56
(...)
```
