# hello-snowman ⛄

Sequence that reads incoming stream (input), and and modifies it by adding a text message according to the incoming data.

Stream is generated in [stream-gen.js](../tools/stream-gen-tool/stream-gen.js) file, where numbers in range of <-50,50> are randomly chosen and sent as Celsius degrees to `hello-snowman` Instance API endpoint `/input`.

Our `hello-snowman` app will read and interpret these Celsius degrees, and will inform us about state of our Snowman:

- if temperature will be 0 or below, Sequence will return message:

```bash
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
```

- in the other case (temperature above 0 degrees), Sequence will return message:

```bash
 Snowman ⛄ is melting! 🥵
```

> 💡 **Please note that the sample below requires some previous installations before you start running it, you will find them [here](../../README.md#3-install-scramjet-transform-hub).**

## Running

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

# make a compressed package with Sequence
si pack . -o hello-snowman.tar.gz

# send Sequence to transform hub, this will output Sequence ID
si seq send hello-snowman.tar.gz

# start a Sequence, this will output Instance ID
si seq start -

# See output of Instance process
si inst output -
```

**In the third terminal**

```bash
# Start stream generator tool with Instance ID as parameter
node ./tools/stream-gen-tool/stream-gen.js <instance_id>
```

## Output

Now you should see the output in the console:

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
