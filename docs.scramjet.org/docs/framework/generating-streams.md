---
slug: "/framework/generating-streams"
title: "Streams"
description: "Generating streams"
separator: Development Guide
position: 2
type: "framework"
order: 2
---

# Generating streams

Scramjet allows easy stream generation by using an exposed static method from available on every Scramjet stream class. The from method always returns a stream - if errors occur, those will be emitted as an error event.

Depending on the passed argument, from method will:

- Instance of self - the argument will be returned immediately. This is usefull when you're not sure what kind of stream you're working on.
- Any Readable node.js stream - stream will be piped to a new instance of class we called the from upon.
- Any Array will be iterated, all the items will be pushed to the stream and stream will be ended. This means that stream backpressure is not taken into account and may induce slightly more memory to be used.
- Any Iterable - an object containing an @@iterator accessor method that is not an Array will be iterated as an Array would, but next() method will be called using backpressure.
- GeneratorFunction including AsyncGeneratorFunction - essentially any async function\* () {} expression will be used as a way to generate stream chunks one by one.

Additionally you can pass a function - this function will be called and it's outcome will be used to feed the stream. Even if you pass an async function the method will return the new stream immediately and wait for resolution underneath, like this:

```js
DataStream.from(async () => JSON.parse(await loadArray("./array.json"))).each(
  console.log
); // you'll have your data from your array here.
```

It's also possible to pass a string here - scramjet will attempt to resolve a node.js module and use it's outcome as if it was the method depicted above.

## Simple asynchronous streams

The underlying PromiseTransformStream in scramjet allows also to create read, write and transform streams using async functions.

**Readable stream:**

```js
const readable = new DataStream({
  async promiseRead() {
    const out = await readSomeData();
    return out;
  },
});
```

**Writeable stream:**

```js
const writable = new DataStream({
  async promiseWrite(chunk, encoding) {
    await fs.promises.writeFile(chunk.file, chunk.data);
  },
});
```

**Transform stream:**

```js
const transform = new DataStream({
  async promiseTransform(chunk, encoding) {
    const contents = await fs.promises.readFile(chunk.file);

    return { ...chunk, contents };
  },
});
```

## Compatibility with other streams

Scramjet is compatible with all streaming frameworks based on node.js streams.

You can pipe any of the following stream to scramjet and pipe them back:

- Event Stream
- Gulp streams
- Highland.js
- Any node.js stream

We'll some samples here.
