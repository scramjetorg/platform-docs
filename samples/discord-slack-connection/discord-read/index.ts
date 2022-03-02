import { ReadableApp, HasTopicInformation } from "@scramjet/types";
import { PassThrough } from "stream";

import { Client, Intents } from 'discord.js';

import formatter from './utils';

export = async function (_stream: any, token: string, topic: string) {
    const out: PassThrough & HasTopicInformation = new PassThrough({ objectMode: true });

    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    client.on('messageCreate', (message) => {
        out.write({ id: message.id, text: formatter(message.content), channel: message.channelId });
    });

    client.login(token);

    out.topic = topic;
    out.contentType = "application/x-ndjson";

    return out;
} as ReadableApp<any>;