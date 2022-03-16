# Slack Write

Read messages from topic and write to Slack.

In order to get SLACK_WEBHOOK_URL you need to create application in Slack first.
Please refer to notes in [slack-read](../slack-read/) example.

Once you have a application in Slack. Open it and under Features select `Incoming Webhooks`

Activate incoming webhooks and add a new webhook to workspace by clicking on `Add New Webhook to Workspace` button. Follow prompts and select which channel you want to use.

Copy Webhook URL and use it later as `SLACK_WEBHOOK_URL` in the notes below.

## Running

```bash
# install dependencies
npm install

# transpile TS->JS to dist/
npm run build

# make a compressed package with Sequence
si pack dist

# send Sequence to transform hub, this will output Sequence ID
si seq send dist.tar.gz

# start a Sequence, provide SLACK_WEBHOOK_URL as the second parameter
si seq start - <SLACK_WEBHOOK_URL>

# view messages in topic
si topic get messages

```
