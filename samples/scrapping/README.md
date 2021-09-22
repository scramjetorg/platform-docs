## scrapping

This is a simple and trivial example of scrapping web pages.

We scrap current time from https://currentmillis.com/ and return this as a stream.

### Troubleshooting

As this is using `puppeteer` some dependencies may or may be not installed already. If you run the code and get error like:

```bash
Error: Failed to launch the browser process!
/scramjet-cloud-docs/samples/scrapping/node_modules/puppeteer/.local-chromium/linux-901912/chrome-linux/chrome: error while loading shared libraries: libnss3.so: cannot open shared object file: No such file or directory

TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
```

Then you must install missing dependency, e.g. `sudo apt install libnss3`

If the error is:

```bash
Error: Failed to launch the browser process!
/scramjet-cloud-docs/samples/scrapping/node_modules/puppeteer/.local-chromium/linux-901912/chrome-linux/chrome: error while loading shared libraries: libgbm.so.1: cannot open shared object file: No such file or directory


TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
```

Then run: `sudo apt install libgbm-dev`