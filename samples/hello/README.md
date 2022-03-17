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

# make a compressed package with Sequence
si pack . -o hello.tar.gz

# send Sequence to transform hub, this will output Sequence ID
si seq send hello.tar.gz

# start a Sequence, this will output I ID
si seq start -

# See output
si inst output -
```

**The third terminal**

```bash
# Send file to Instance input steam
si inst input -
# if file not given the data will be read from stdin
# type "John"
John
```

## Output

```bash
# Now you should see "Hello John" in output console
$ si inst output 7a1ffd59-9d1a-4e8f-a246-020124803931
Request ok: http://127.0.0.1:8000/api/v1/I/7a1ffd59-9d1a-4e8f-a246-020124803931/output status: 200 OK
Hello John
```
