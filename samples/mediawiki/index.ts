import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import EventSource = require("eventsource");

const url = 'https://stream.wikimedia.org/v2/stream/recentchange';

const app: ReadableApp<string> = async function (_stream) {
  const outputStream = new PassThrough({ encoding: 'utf-8' });

  const eventSource = new EventSource(url);

  eventSource.onopen = function (event) {
    console.log('--- Opened connection.');
  };

  eventSource.onerror = function (event) {
    console.error('--- Encountered error', event);
  };

  eventSource.onmessage = function (event) {
    outputStream.write(JSON.stringify(event.data));
  };

  return outputStream;
};


export default app;