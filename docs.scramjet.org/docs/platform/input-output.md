---
slug: "/platform/input-output"
title: "Input/Output"
description: "Input/Output operations"
separator: Development Guide
position: 4
type: "platform"
order: 7
---

# Input and output

- [Producing data (output stream)](#producing-data-output-stream)
- [Consuming data (input stream)](#consuming-data-input-stream)
- [No I/O](#no-i-o)

Sequence is a program that produces, consumes or transforms data. It’s a function or an array of functions. They typically look somewhat like this:

```js
/** The function parameters are
 * input stream
 * ...params passed to Instance on start
 */
module.exports = function (input, param1, param2) {
  return new PassThrough({ 
    transform(chunk, encoding, callback) {
      this.push(`Hello ${chunk.toString(encoding)}`);
      callback();
    } 
  });
}
```

This converts the data from lines of data to `Hello ` lines of data. It's a data transformer, as it uses the input and has an output. Let's dive into what it means.

## Producing data (output stream)

To stream data from a Sequence, you need to return values over time. Some constructs in JavaScript which enable that are NodeJS streams, Generators and Iterables. Whatever you `return` from your Sequence will be your **_output_** stream. You can choose whichever solution is right for you.

The output options are as follows:

### Async iterators and generators

The simplest way to expose data is creating a data generator. The data generator will create new data items that will be exposed on the output stream or an output topic.

Here's how such a generator may look in Python:

```py
async def run(context, input):​
  while True:​
    async for result in await get_page_from_api():​
      yield result​
    await asyncio.sleep(1)​
```

In this example you see the `yield` keyword is used to expose items fetched from an API. Every single result will come as a single item on the input of another sequence connected via a topic, or as a single JSON line in the API protocol.

Similar construct in Node.js would look as follows:


```js
module.exports = async function* (_stream) {​
  while (true) {​
    yield* await getPageFromAPI();​
    await wait(1000);​
  }​
};
```

A cool feature of JavaScript generators is that those can `yield*` - this means that an iterator or an array can be passed and therefore multiple chunks can be send to the output stream. This is advisable for efficiency reasons.

Generators have one additional benefit: they will not produce more data if data isn't read. If you start a generator in your Sequence but not read from it, the program will run a couple initial iterations to fill in the buffers, but eventually it will stop at `yield` and wait until you read the data from another Sequence or through the API.

### Stream output

Alternatively streamed output can be used, both Python and Node runners will accept a stream as a result, so the code would look a little bit like this in Node:

```js
const { Readable } = require("stream");

module.exports = () => {
  let n = 0;
  return new Readable({
    read() {
      this.push(`Chunk: ${n++}`);
    }
  });
}
```

Similarly in Python:

```py
import io

def run():
  output = io.StringIO()
  output.write('Hello World!')
  output.close()

  return output
```

Streams can be better suited when exposing data from http requests or files. They will also be a more efficient option, but in most use cases the benefits will be very vague as fetching the data will be the biggest bottleneck.

## Consuming data (input stream)

Some Sequences you write will need to consume data that's created by other sequences or send via API. The data will be passed to your Sequence as the first positional argument, excluding `self` in Python.

```js
module.exports = (input) => { /* ... */ }
               // ^^^^^- this is the input!
```

```py
def run(self, input):
            # ^^^^^ - this is the input!
```

Remember it's the position, not the name! ;)

Below you'll find some samples of what to use.

### Async iteration

Input can be parsed with async iteration:

```js
module.exports = async function (input) {
  for await (const chunk of input) {
    // do something with chunk
  }
}
```

Similarily in Python this would be:

```py
async def run(self, input):
    for msg in input:
        print(f'Topic name={msg.topic}, Message={msg.value}')
```

### Stream protocols

Another option in node.js is to use streams:

```js
module.exports = async function (input) {  
  input.on("data", () => {
    // do something with data
  })
  
  // remember to resolve the promise when the sequence is done
  return new Promise(res => input.on("finish", res));
}
```

With stream you can control when you'd like to process more data with pause and resume like this:

```js
function isProcessOverloaded() {
  // check if API limits are not exceeded.
}

module.exports = async function (input) {  
  input.on("data", async () => {
    // do something with data

    if (isProcessOverloaded()) {
      input.pause(); // this will stop the data from being sent
      await new Promise(res => setTimeout(res, 200))
      input.resume(); // this will resume the data flow
    }
  })
  
  // remember to resolve the promise when the sequence is done
  return new Promise(res => input.on("finish", res));
}
```

This will result in slowing down data upload to the platform so that you can run your processing at the right speed. It's quite handy when you're dealing with API limits also.

## No I/O

There's some cases when you just want a program to run and you're not interested in inputs, outputs or topics. Here's how to write such programs:

Javascript:

```js
module.exports = async () => {
  return new Promise(); // when this Promise is resolved, the platform will assume that the program finished and can be stopped.
}
```

And python:

```py
async def run(context, input):​
  return asyncio.Future() # when this Future is resolved, the platform will assume that the program finished and can be stopped.
```

As you see, all you need to do is to inform the platform that the program is running and when it's done.