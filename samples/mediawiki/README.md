## mediawiki

---

Sequence that keeps printing mediawiki event stream.

### Running

```bash
# install dependencies
npm install

# transpile TS->JS to dist/
npm run build

# prepare standalone JS package
cp -r node_modules package.json dist/

# make a compressed package with sequence
si pack dist/ -o mediawiki.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send mediawiki.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id>

# See output
si inst output <instance-id>
```
