# Slack Read

Read messages from Slack and write to topic.

In order to read messages from Slack you need to create application first. Go to [Slack API](https://api.slack.com/apps) and `Create New App`.
Next, select you app and under `Settings` -> select `Socket Mode`.
Enable Socket Mode as per message:

> To start receiving payloads in Socket Mode, turn on the toggle below and call the apps.connections.open endpoint using an App Level Token to establish a connection.

After enabling socket mode, follow link to App Level Tokens, scroll down to `App-Level Tokens` and generate new token. Give it a name and select scope: `connections:write`.

Copy SOCKET_MODE_TOKEN. It will look like: `xapp-1-A....`

## Running

```bash
# install dependencies
npm install

# transpile TS->JS to dist/
npm run build

# make a compressed package with sequence
si pack dist

# send sequence to transform hub, this will output Sequence ID
si seq send dist.tar.gz

# start a sequence, this will output Instance ID. Provide SOCKET_MODE_TOKEN as the second parameter
si seq start - <SOCKET_MODE_TOKEN>

# view messages in topic
si topic get messages
```
