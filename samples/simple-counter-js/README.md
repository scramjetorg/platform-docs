## simple-counter

---

A simple sequence, that counts and logs the number in one-second intervals. As a default, the counter is started with 0 and ends with 1000. These values can be changed by passing the `start` and `end` parameters.

### Running

```bash
# go to 'simple-counter-js' directory
cd samples/simple-counter-js

# make a compressed package with sequence
si pack . -o simple-counter-js.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send simple-counter-js.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id>

# See output of instance process
si inst output <instance-id>
```

```json
{
  "name": "@scramjet/simple-counter",
  "version": "0.13.1",
  "description": "A simple sequence, that counts to 1000, and logs the number in one-second intervals.",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "https://github.com/scramjetorg/transform-hub.git"
  },
  "dependencies": {
    "scramjet": "^4.35.20"
  }
}
```