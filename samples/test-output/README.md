# test-output

Sequence that just writes random values to output stream.

> :bulb: **Please note that the sample below requires some previous installations before you start running it, you will find them [here](../../README.md#3-install-scramjet-transform-hub).**

## Running

Open two terminals and run the following commands:

**The first terminal:**

```bash
# start sth
scramjet-transform-hub
```

**The second terminal**

```bash
# go to 'test-output' directory
cd samples/test-output

# install dependencies
npm install

# make a compressed package with Sequence
si pack . -o test-output.tar.gz

# send Sequence to transform hub, this will output Sequence ID
si seq send test-output.tar.gz

# start a Sequence, this will output Instance ID
si seq start -

# See output of Instance process
si inst output -
```

## Output

```bash
Test 6
Test 0
Test 5
Test 4
Test 9
Test 2
Test 3
Test 4
Test 0
Test 2
Test 2
...
```
