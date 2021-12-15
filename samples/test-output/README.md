## test-output
----
Sequence that just writes random values to output stream.

### Running
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

# make a compressed package with sequence
si pack . -o test-output.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send test-output.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id>

# See output of instance process
si inst output <instance-id>
```

### Output

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