# Slack Read

Read messages from Slack and write to topic.

## Running

```bash
# install dependencies
npm install

# transpile TS->JS to dist/
npm run build

# prepare standalone JS package
cp -r node_modules package.json dist/

# make a compressed package with sequence
si pack dist

# send sequence to transform hub, this will output Sequence ID
si seq send dist.tar.gz

# start a sequence, this will output Instance ID. Provide SOCKET_MODE_TOKEN as the second parameter
si seq start <sequence-id> <SOCKET_MODE_TOKEN>

# view messages in topic
si topic get messages
```
