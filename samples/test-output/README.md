## test-output
----
Sequence that just writes random values to output stream

### Running
```bash
# make a compressed package with sequence
si pack . -o test-output.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send test-output.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id>

# See output of instance process
si inst output <instance-id>
```