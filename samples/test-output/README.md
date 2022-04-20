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

# go back to samples/ directory
cd ../

# deploy 'hello' Sequence
si seq deploy test-output

# See output of Instance process
si inst output -
```

> 💡**NOTE:** Command `deploy` performs three actions at once: `pack`, `send` and `start` the Sequence. It is the same as if you would run those three commands separately:

```bash
si seq pack . -o test-output.tar.gz    # compress 'test-output/' directory into file named 'test-output.tar.gz'

si seq send test-output.tar.gz    # send compressed Sequence to STH, this will output Sequence ID

si seq start -    # start the Sequence, this will output Instance ID
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
