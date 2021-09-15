import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import EventSource = require("eventsource");

const url = 'https://stream.wikimedia.org/v2/stream/recentchange';

const app: ReadableApp<string> = async function (_stream, search) {
  // Prepare filter
  let filter;
  if (search) {
    filter = (data) => eval(search);
  } else {
    filter = (data) => data;
  }

  console.error('filter: ' + filter)

  const outputStream = new PassThrough({ encoding: 'utf-8' });

  const eventSource = new EventSource(url);

  eventSource.onopen = function (event) {
    console.log('--- Opened connection.');
  };

  eventSource.onerror = function (event) {
    console.error('--- Encountered error', event);
  };

  eventSource.onmessage = function (event) {
    const data = [event.data];
    const result = data.map(data => JSON.parse(data)).filter(filter)[0];
    if (result) outputStream.write(JSON.stringify(result));
  };

  return outputStream;
};


export default app;