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
si seq start <sequence-id>

# See output of instance process
si inst output <instance-id>

# In another terminal send text to instance input steam
si inst input <instance-id>
> John

# Now you should see "Hello John" in output console
```