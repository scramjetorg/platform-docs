import { ReadableApp, HasTopicInformation } from "@scramjet/types";
import { PassThrough } from "stream";
import { Client, Intents } from 'discord.js';
import formatter from './utils';

const TOPIC = "messages-slack-inbound";

export = async function (_stream: any, token: string) {
    const out: PassThrough & HasTopicInformation = new PassThrough({ objectMode: true });

    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    
    client.on('ready', () => {
        console.log(`Connected to Discord API as ${client.user.tag}!`);
    });
    
    client.on('messageCreate', (message) => {
        out.write({ id: message.id, text: formatter(message.content), channel: message.channelId });
    });
    
    await client.login(token);

    out.topic = TOPIC;
    out.contentType = "application/x-ndjson";

    return out;
} as ReadableApp<any>;