import { ReadableApp } from "@scramjet/types";
import { PassThrough } from "stream";
import EventSource = require("eventsource");

const url = 'https://stream.wikimedia.org/v2/stream/recentchange';
let streaming = false;
function init(outputStream, filter) {
  if (streaming) return;
  streaming = true;

  let eventSource = new EventSource(url);

  eventSource.onopen = function (event) {
    console.log('--- Opened connection.');
  };

  eventSource.onerror = function (event) {
    console.error('--- Encountered error', event);
  };

  eventSource.onmessage = function (event) {
    const data = [event.data];
    const result = data.map(data => JSON.parse(data)).filter(filter)[0];
    if (result) {
      const isOkayToContinue = outputStream.write(result);
      if (!isOkayToContinue) {
        // Wait for drain.
        console.log('--- Pause and wait for drain');
        eventSource.close();
        streaming = false;
      }
    }
  };
}

const app: ReadableApp<string> = async function (_stream, search) {
  // Prepare filter
  let filter;
  if (search) {
    filter = (data) => eval(search);
  } else {
    filter = (data) => data;
  }

  const outputStream = new PassThrough({ objectMode: true });

  init(outputStream, filter);

  outputStream.on("drain", () => {
    console.log('--- Resume');
    init(outputStream, filter)
  });

  return outputStream;
};


export default app;