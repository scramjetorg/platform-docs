## hello 🙋‍♂️
----
Sequence that modifies incoming stream of strings by saying Hello :).

### Running
Open two terminals and run the following commands:

**The first terminal:**
```bash
# start sth
scramjet-transform-hub
```

**The second terminal**
```bash
# go to 'hello' directory
cd samples/hello

# install dependencies
npm install

# make a compressed package with sequence
si pack . -o hello.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send hello.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id>

# See output of instance process
si inst output <instance-id>

# In another terminal send file to instance input steam
si inst input <instance-id> name.txt
# if file not given the data will be read from stdin
```
<!-- TODO Delete when the issue is solved
Issue created for reading data from stdin https://github.com/scramjetorg/transform-hub/issues/165 
-->
### Output

```bash
# Now you should see "Hello John" in output console
$ si inst output 7a1ffd59-9d1a-4e8f-a246-020124803931
Request ok: http://127.0.0.1:8000/api/v1/instance/7a1ffd59-9d1a-4e8f-a246-020124803931/output status: 200 OK
Hello John
```