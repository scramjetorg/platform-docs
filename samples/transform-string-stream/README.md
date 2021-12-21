## transform-string-stream 
----
Sequence that modifies incoming stream of strings by adding a prefix and a suffix.

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
# go to 'transform-string-stream' directory
cd samples/transform-string-stream

# install dependencies
npm install 

# transpile TS->JS to dist/
npm run build 

# prepare standalone JS package
cp -r node_modules package.json dist/

# make a compressed package with sequence
si pack dist/ -o transform-string-stream.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send transform-string-stream.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id> Hello Bye

# See output of instance process
si inst output <instance-id>
```

**The third terminal**
```bash
# Send file to instance input steam
si inst input <instance-id> name.txt
# if file not given the data will be read from stdin
```
<!-- TODO Delete when the issue is solved
Issue created for reading data from stdin https://github.com/scramjetorg/transform-hub/issues/165 ---. ISSUE SOLVED!!! awaits release
-->

### Output

```bash
# Now you should see "Hello John Bye" in output console
$ si inst output 7a1ffd59-9d1a-4e8f-a246-020124803931
Request ok: http://127.0.0.1:8000/api/v1/instance/7a1ffd59-9d1a-4e8f-a246-020124803931/output status: 200 OK
Hello John Bye
```