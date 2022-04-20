# transform-string-stream

Sequence that modifies incoming stream of strings by adding a prefix and a suffix.

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
# go to 'transform-string-stream' directory
cd samples/transform-string-stream

# install dependencies
npm install 

# transpile TS->JS to dist/
npm run build

# deploy the Sequence from the dist/ directory, which contains transpiled code, package.json and node_modules
si seq deploy dist --args '["Woogie", "Boogie"]'

# See output of Instance process
si inst output -
```

> 💡**NOTE:** Command `deploy` performs three actions at once: `pack`, `send` and `start` the Sequence. It is the same as if you would run those three commands separately:

```bash
si seq pack dist/ -o transform-string-stream.tar.gz    # compress 'transform-string-stream/' directory into file named 'transform-string-stream.tar.gz'

si seq send transform-string-stream.tar.gz    # send compressed Sequence to STH, this will output Sequence ID

si seq start - --args '["Hello ", "Bye!"]'    # start the Sequence with arguments, this will output Instance ID
```

**The third terminal**

```bash
# Send file to the Instance input steam
si inst input - name.txt
# the date will be read from the file 'name.txt'
```

or

```bash
# Send text to the Instance input steam
si inst input -
> Michael
# if file not given the data will be read from stdin
```

## Output

```bash
# Now you should see "Hello John Bye" in output console
$ si inst output -
Request ok: http://127.0.0.1:8000/api/v1/instance/7a1ffd59-9d1a-4e8f-a246-020124803931/output status: 200 OK
Hello Michael
Bye!
```
