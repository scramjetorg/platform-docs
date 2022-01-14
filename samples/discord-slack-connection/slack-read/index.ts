import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import axios from 'axios'
import WebSocket from 'ws';

const SLACK_APPS_CONNECTION_OPEN_URL =
    'https://slack.com/api/apps.connections.open';

type HasTopicInformation = {
    contentType?: string,
    topic?: string
};

const messages: String[] = [];

/**
 * Remove application specific formatting and use internal STH tags instead.
 * 
 * @param {String} input Text to be formatted
 * @returns {String}
 */
function formatter(input: String): String {
    return input.replace(/\*\*(\w+)\*\*/, '<sth:b>$1</sth:b>')
        .replace(/\*(\w+)\*/, '<sth:i>$1</sth:i>')
        .replace(/~~(\w+)~~/, '<sth:s>$1</sth:s>')
        .replace(/__(\w+)__/, '<sth:u>$1</sth:u>');
}

/**
 * Multi output application.
 *
 * @param {any} _stream - Dummy input stream
 * @param {String} SOCKET_MODE_TOKEN - Token
 */

export = async function (_stream: any, SOCKET_MODE_TOKEN: String) {
    const ps: PassThrough & HasTopicInformation = new PassThrough({ objectMode: true });

    // Get WebSocket URL
    const { data: response } = await axios.post(
        SLACK_APPS_CONNECTION_OPEN_URL,
        null,
        {
            headers: { Authorization: `Bearer ${SOCKET_MODE_TOKEN}` },
        }
    );

    if (response.ok) {

        const socket = new WebSocket(response.url);

        socket.on('open', function (e) {
            console.log('CONNECTED...');
        });

        socket.on('message', function (buffer) {
            console.log('ON MESSAGE EVENT');
            console.log(buffer.toString());
            const event = JSON.parse(buffer.toString());

            if (event.type === 'events_api') {
                // Acknowledge message
                socket.send(JSON.stringify({ envelope_id: event.envelope_id }));

                // Safeguard against repeated messages 
                const msg = messages.find(
                    (element) => element === event?.payload?.event?.client_msg_id
                );

                if (msg === undefined) {
                    ps.write({ id: event.payload.event.client_msg_id, text: formatter(event.payload.event.text), channel: event.payload.event.channel, thread_ts: event.payload.event.ts });
                    messages.push(event?.payload?.event?.client_msg_id);
                }
            }
        });
    }


    ps.topic = "messages"; // TODO: Decide if this can be hardcoded or not
    ps.contentType = "application/x-ndjson";

    return ps;
} as ReadableApp<any>;