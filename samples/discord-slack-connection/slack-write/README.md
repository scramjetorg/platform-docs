# Slack Write

Read messages from topic and write to slack

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

# start a sequence, this will output Instance ID. Provide SLACK_WEBHOOK_URL as the second parameter
si seq start <sequence-id> <SLACK_WEBHOOK_URL>

# view messages in topic
si topic get messages

```
