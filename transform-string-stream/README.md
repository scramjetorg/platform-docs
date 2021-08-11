## transform-string-stream 
----
Sequence that modifies incoming stream of strings by adding a prefix and a suffix.

### Running
```bash
# install dependencies
yarn install 

# transpile TS->JS to dist/
yarn build 

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

# In another terminal send text to instance input steam
si inst input <instance-id>
> John

# Now you should see "Hello John\n Bye" in output console
```