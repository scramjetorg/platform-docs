## hello
----
Sequence that modifies incoming stream of strings by saying Hello :).

### Running
```bash
# make a compressed package with sequence
si pack . -o hello.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send hello.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id> "[]" 

# attach to sequence process
si inst attach <instance-id>
> John
Hello John!
```