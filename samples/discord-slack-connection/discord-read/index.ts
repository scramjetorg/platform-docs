import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";

import { Client, Intents } from 'discord.js';
import { token } from './config.json';

type HasTopicInformation = {
    contentType?: string,
    topic?: string
};

/**
 * Multi output application.
 *
 * @param {any} _stream - Dummy input stream
 */

export = async function (_stream: any) {
    const ps: PassThrough & HasTopicInformation = new PassThrough({ objectMode: true });

    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('messageCreate', (message) => {
        console.log(message)
        ps.write({ id: message.id, text: message.content, channel: message.channelId, /* thread */ });
    });

    client.login(token);

    ps.topic = "messages"; // TODO: Decide if this can be hardcoded or not
    ps.contentType = "application/x-ndjson";

    return ps;
} as ReadableApp<any>;