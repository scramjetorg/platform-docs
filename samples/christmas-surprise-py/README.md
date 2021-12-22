### Running

```bash
# make a compressed package with sequence
si pack . -o my_sequence.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send my_sequence.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id>

# See output of instance process
si inst output <instance-id>
```