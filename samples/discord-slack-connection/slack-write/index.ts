import { Streamable, WritableApp } from "@scramjet/types";
import { DataStream } from "scramjet";
import axios from "axios";
import formatter from './utils';

const TOPIC = "messages-slack-inbound";

const sequence: [{ requires: string, contentType: string }, WritableApp] = [
    {
        requires: TOPIC,
        contentType: "application/x-ndjson"
    },
    function (input: Streamable<any>, slackWebhookUrl: string) {
        (input as DataStream)
            .map((data) => 
                axios.post(slackWebhookUrl, { text: formatter(data.text) })
            )
    }
];

export default sequence;