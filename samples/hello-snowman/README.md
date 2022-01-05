## hello-snowman :snowman:

----
Sequence that reads incoming stream (input), and and modifies it by adding a text message according to the incoming data.

Stream is generated in [stream-gen.js](../tools/stream-gen-tool/stream-gen.js) file, where numbers in range of <-50,50> are randomly chosen and sent as Celsius degrees to `hello-snowman` instance API endpoint `/input`.

Our `hello-snowman` app will read and interpret these Celsius degrees, and will inform us about state of our Snowman:

- if temperature will be 0 or below, sequence will return message: `Snowman is freezing ... :)`
- in the other case (temperature above 0 degrees), sequence will return message: `Snowman is melting! :(`

> :bulb: **Please note that the sample below requires some previous installations before you start running it, you will find them [here](../../README.md#3-install-scramjet-transform-hub).**

### Running

Open three terminals and run the following commands:

**The first terminal:**

```bash
# start sth
scramjet-transform-hub
```

**The second terminal**

```bash
# go to 'hello-snowman' directory
cd samples/hello-snowman

# install dependencies
npm install

# make a compressed package with sequence
si pack . -o hello-snowman.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send hello-snowman.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id>

# See output of instance process
si inst output <instance-id>
```

**In the third terminal**

```bash
# Start stream generator tool with instance ID as parameter
node ./tools/stream-gen-tool/stream-gen.js <instance_id>
```

### Now you should see something like this in output console:

```js
----------------------------------------
Message# 1 | Temperature measure
INPUT | -16
OUTPUT| Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️

----------------------------------------
Message# 2 | Temperature measure
INPUT | 49
OUTPUT| Snowman ⛄ is melting! 🥵

----------------------------------------
Message# 3 | Temperature measure
INPUT | 16
OUTPUT| Snowman ⛄ is melting! 🥵

----------------------------------------
Message# 4 | Temperature measure
INPUT | -46
OUTPUT| Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️

----------------------------------------
```
