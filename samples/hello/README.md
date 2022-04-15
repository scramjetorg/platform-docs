# hello 🙋‍♂️

Sequence that modifies incoming stream of strings by saying Hello :).

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
# go to 'hello' directory
cd samples/hello

# install dependencies
npm install

# go back to samples/ directory
cd ../

# deploy 'hello' Sequence
si seq deploy hello

# see the Instance output
si inst output -    # nothing happens until some is sent to input
```

> 💡**NOTE:** Command `deploy` performs three actions at once: `pack`, `send` and `start` the Sequence. It is the same as if you would run those three commands separately:

```bash
si seq pack . -o hello.tar.gz    # compress 'hello/' directory into file named 'hello.tar.gz'

si seq send hello.tar.gz    # send compressed Sequence to STH, this will output Sequence ID

si seq start -    # start the Sequence, this will output Instance ID
```

**The third terminal**

```bash
# Send file to Instance input steam
si inst input - path/to/file/data.txt
# if file not given the data will be read from stdin
si inst input -
# hit enter and type "John"
John
```

## Output

```bash
# Now you should see "Hello John" or "Hello Yogi" in output console
$ si inst output -
Request ok: http://127.0.0.1:8000/api/v1/I/7a1ffd59-9d1a-4e8f-a246-020124803931/output status: 200 OK
Hello John
```
