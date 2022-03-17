# Discord Read

Read messages from Discord channel and write to topic.

[Discord Documentation](https://discord.js.org/#/docs/discord.js/stable/general/welcome)

In order to read messages from Discord we need to create a bot first:

* Go to Developer Portal and click on [Applications](https://discord.com/developers/applications)
* Click on `New Application` button and give it a name. Then click on `Create`.
* In the newly created and selected app, click on `Bot` and click on `Add Bot` button.
* Under `Build-A-Bot` either click on `Click to Reveal Token` link or on `Copy` button to get Discord Bot Token. **This is important!**
* You can uncheck Public Bot.
* You can customize its name and icon.
* Expand `OAuth2` and select `URL Generator`.
* Select `bot` under scopes and `Read Messages/View Channels` under bot permissions. Copy URL.
* Paste the URL into web browser address bar. Connect to Discord message will appear. Select your server from `Add To Server` dropdown and click on `Continue`.
* Confirm permissions on the next screen by clicking `Authorize` button.
* You will get a confirmation saying: *you may now close this window or tab*.

Create a file called `config.json` and add:

```json
{
    "token": "DISCORD_BOT_TOKEN_GOES_HERE"
} 
```

Add `config.json` to main directory in `discord-read` sample and follow running process below:

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

# start a Sequence
si seq start -

# view messages in topic
si topic get messages
```
