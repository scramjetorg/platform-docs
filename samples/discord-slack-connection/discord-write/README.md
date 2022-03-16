# Discord Write

Read messages from topic and write to discord via webhook

[Discord Documentation](https://discord.com/developers/docs/resources/webhook)

## Running

Before you start you need `DISCORD_WEBHOOK_URL`. In Discord go your server. Then next to server name click on the drop down menu and select `Server Settings` -> `Integrations` -> `Webhooks` -> `Create webhook` -> Select channel name and save changes. You can copy webhook URL by clicking on `Copy webhook URL` button.

WebHook URL has following format: `https://discord.com/api/webhooks/{webhook.id}/{webhook.token}`

where `webhook.id` are numbers and `webhook.token` are letters and numbers.

```bash
# install dependencies
npm install

# transpile TS->JS to dist/
npm run build

# make a compressed package with sequence
si pack dist

# send sequence to transform hub, this will output Sequence ID
si seq send dist.tar.gz

# start a sequence, this will output Instance ID. Provide DISCORD_WEBHOOK_URL as the second parameter
si seq start - <DISCORD_WEBHOOK_URL>

# view messages in topic
si topic get messages
```
