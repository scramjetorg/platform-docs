## transform-string-stream 
----
Sequence that modifies incoming stream of strings by adding a prefix and suffix.

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
si send transform-string-stream.tar.gz

# start a sequence
si start <sequence-id> "['Hello', '.']" 
```