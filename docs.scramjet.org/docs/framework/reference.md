---
slug: "/framework/reference"
title: "Reference"
description: "Reference"
separator: Development Guide
position: 2
type: "framework"
order: 1
---

# Framework Reference

Scramjet uses functional programming to run transformations on your data streams in a fashion
very similar to the well known event-stream node module. First create a stream from a source:

Use `DataStream.from(someThing)` to create a new stream from an Array, Generator, AsyncGenerator,
Iterator or Readable stream. See the [DataStream.from docs](/framework/data-stream/DataStream.from)
for more information, here's a sample.

```javascript
/* global StringStream, fs */
StringStream.from(fs.createReadStream("./log.txt")) // get from any readable stream
  .lines() // split the stream by line
  .use("./your-file"); // use some transforms from another file
```

Use `DataStream.pipeline(readable, transforms)` to create a pipeline of transform streams and/or
stream modules. Any number of consecutive arguments will get piped one into another.

```javascript
/* global StringStream, fs, gzip */
StringStream.pipeline(
  // process a number of streams
  fs.createReadStream("./log.txt.gz"),
  gzip.unzip() // all errors here will get forwarded
)
  .lines() // split the stream by line
  .use("./your-file"); // use some transforms from another file
```

Some methods like `from`, `use`, `flatMap` allow using ES6 generators and ES7 async generators:

```javascript
const fetch = require("node-fetch");
const { StringStream } = require("scramjet");

StringStream.from(
  async function* () {
    // construct a stream from an async generator
    yield "houses\n"; // yield - push a stream chunk
    // yield - push a whole stream
    yield* (await fetch("https://example.org/categories")).body;
  },
  { maxParallel: 4 } // set your options
)
  .lines() // split the stream by line
  .flatMap(async function* (category) {
    const req = await fetch(`https://example.org/posts/${category}/`);
    yield* await req.json(); // yield - push a whole array
  })
  .catch(err => `! Error occured ${err.uri}`)
  .toStringStream()
  .append("\n")
  .pipe(process.stdout); // pipe to any output
```

Most transformations are done by passing a transform function. You can write your function in three ways:

1. Synchronous

Example: a simple stream transform that outputs a stream of objects of the same id property and the length of the value string.

```javascript
DataStream.from(items).map(item => ({
  id: item.id,
  length: item.value.length,
}));
```

2. Asynchronous using ES2015 async await

Example: A simple stream that uses `Fetch API` to get all the contents of all entries in the stream

```javascript
StringStream.from(urls)
  .map(async url => fetch(url).then(res => res.json()))
  .JSONParse();
```

3. Asynchronous using Promises

Example: A simple stream that fetches an url mentioned in the incoming object

```javascript
datastream.map(
  item =>
    new Promise((resolve, reject) => {
      request(item.url, (err, res, data) => {
        if (err) reject(err);
        // will emit an "error" event on the stream
        else resolve(data);
      });
    })
);
```

The actual logic of this transform function is as if you passed your function to the `then` method of a Promise
resolved with the data from the input stream.

4. Streams with multi-threading

To distribute your code among the processor cores, just use the method `distribute`:

```javascript
datastream.distribute(
  16, // number of threads
  stream => {
    // multi-threaded code goes here.
    // it MUST return a valid stream back to the main thread.
  }
);
```

## Writing modules

Scramjet allows writing simple modules that are resolved in the same way as node's `require`. A module
is a simple javascript file that exposes a function taking a stream and any number of following arguments
as default export.

Here's an example:

```javascript
module.exports = (stream, arg1) => {
  const mapper = chunk => mapper(chunk, arg1);
  return stream.map(mapper);
};
```

Then it can be used with `DataStream.use` function like this:

```javascript
myStream.use("./path/to/my-module", "arg1");
```

If these modules are published you can also simply use `myStream.use("published-module")`.

For more universal modules you can use helper methods `createTransformModule` and `createReadModule` that scramjet exports. See more in about this in this blog post [Scramjet Modules](https://scramjet.org/modules).

## Typescript support

Scramjet aims to be fully documented and expose TypeScript declarations. First version to include definitions in `.d.ts`
folder is 4.15.0. More TypeScript support will be added with next versions, so feel free to report issues in GitHub.

## Detailed docs

Here's the list of the exposed classes and methods, please review the specific documentation for details:

- [`scramjet`](/framework/module-exports) - module exports explained
- [`scramjet.DataStream`](/framework/data-stream) - the base class for all scramjet classes, object stream.
- [`scramjet.BufferStream`](/framework/buffer-stream) - a stream of Buffers.
- [`scramjet.StringStream`](/framework/string-stream) - a stream of Strings.
- [`scramjet.NumberStream`](/framework/number-stream) - a stream of Numbers
- [`scramjet.MultiStream`](/framework/multi-stream) - A group of streams (for multi-threading and muxing).
- [more on plugins](/framework/plugins) - a description and link.

Note that:

- Most of the methods take a Function argument that operates on the stream items.
- The Function, unless it's stated otherwise, will receive an argument with the next chunk.
- If you want to perform your operations asynchronously, return a Promise, otherwise just return the right value.

## Quick reference of some methods

### :DataStream

DataStream is the primary stream type for Scramjet. When you parse your
stream, just pipe it you can then perform calculations on the data objects
streamed through your flow.

Use as:

```javascript
const { DataStream } = require("scramjet");

await DataStream.from(aStream) // create a DataStream
  .map(findInFiles) // read some data asynchronously
  .map(sendToAPI) // send the data somewhere
  .run(); // wait until end
```

[Detailed :DataStream docs here](/framework/data-stream)

**Most popular methods:**

- `new DataStream([opts])` - Create the DataStream.
- [`dataStream.map(func, [ClassType]) ↺`](/framework/data-stream/#module_scramjet.DataStream+map) - Transforms stream objects into new ones, just like Array.prototype.map
- [`dataStream.filter(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+filter) - Filters object based on the function outcome, just like Array.prototype.filter.
- [`dataStream.reduce(func, into) ⇄`](/framework/data-stream/#module_scramjet.DataStream+reduce) - Reduces the stream into a given accumulator
- [`dataStream.do(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+do) - Perform an asynchronous operation without changing or resuming the stream.
- [`dataStream.all(functions) ↺`](/framework/data-stream/#module_scramjet.DataStream+all) - Processes a number of functions in parallel, returns a stream of arrays of results.
- [`dataStream.race(functions) ↺`](/framework/data-stream/#module_scramjet.DataStream+race) - Processes a number of functions in parallel, returns the first resolved.
- [`dataStream.unorder(func)`](/framework/data-stream/#module_scramjet.DataStream+unorder) - Allows processing items without keeping order
- [`dataStream.into(func, into) ↺`](/framework/data-stream/#module_scramjet.DataStream+into) - Allows own implementation of stream chaining.
- [`dataStream.use(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+use) - Calls the passed method in place with the stream as first argument, returns result.
- [`dataStream.run() ⇄`](/framework/data-stream/#module_scramjet.DataStream+run) - Consumes all stream items doing nothing. Resolves when the stream is ended.
- [`dataStream.tap() ↺`](/framework/data-stream/#module_scramjet.DataStream+tap) - Stops merging transform Functions at the current place in the command chain.
- [`dataStream.whenRead() ⇄`](/framework/data-stream/#module_scramjet.DataStream+whenRead) - Reads a chunk from the stream and resolves the promise when read.
- [`dataStream.whenWrote(chunk) ⇄`](/framework/data-stream/#module_scramjet.DataStream+whenWrote) - Writes a chunk to the stream and returns a Promise resolved when more chunks can be written.
- [`dataStream.whenEnd() ⇄`](/framework/data-stream/#module_scramjet.DataStream+whenEnd) - Resolves when stream ends - rejects on uncaught error
- [`dataStream.whenDrained() ⇄`](/framework/data-stream/#module_scramjet.DataStream+whenDrained) - Returns a promise that resolves when the stream is drained
- [`dataStream.whenError() ⇄`](/framework/data-stream/#module_scramjet.DataStream+whenError) - Returns a promise that resolves (!) when the stream is errors
- [`dataStream.setOptions(options) ↺`](/framework/data-stream/#module_scramjet.DataStream+setOptions) - Allows resetting stream options.
- [`dataStream.copy(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+copy) - Returns a copy of the stream
- [`dataStream.tee(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+tee) - Duplicate the stream
- [`dataStream.each(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+each) - Performs an operation on every chunk, without changing the stream
- [`dataStream.while(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+while) - Reads the stream while the function outcome is truthy.
- [`dataStream.until(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+until) - Reads the stream until the function outcome is truthy.
- [`dataStream.catch(callback) ↺`](/framework/data-stream/#module_scramjet.DataStream+catch) - Provides a way to catch errors in chained streams.
- [`dataStream.raise(err) ⇄`](/framework/data-stream/#module_scramjet.DataStream+raise) - Executes all error handlers and if none resolves, then emits an error.
- [`dataStream.bufferify(serializer) : BufferStream ↺`](/framework/data-stream/#module_scramjet.DataStream+bufferify) - Creates a BufferStream.
- [`dataStream.stringify([serializer]) : StringStream ↺`](/framework/data-stream/#module_scramjet.DataStream+stringify) - Creates a StringStream.
- [`dataStream.toArray([initial]) : Array.&lt;any&gt; ⇄`](/framework/data-stream/#module_scramjet.DataStream+toArray) - Aggregates the stream into a single Array
- [`dataStream.toGenerator() : Generator.<Promise.&lt;any&gt;>`](/framework/data-stream/#module_scramjet.DataStream+toGenerator) - Returns an async generator
- [`dataStream.pull(pullable) : Promise.&lt;any&gt; ⇄`](/framework/data-stream/#module_scramjet.DataStream+pull) - Pulls in any readable stream, resolves when the pulled stream ends.
- [`dataStream.shift(count, func) ↺`](/framework/data-stream/#module_scramjet.DataStream+shift) - Shifts the first n items from the stream and pushes out the remaining ones.
- [`dataStream.peek(count, func) ↺`](/framework/data-stream/#module_scramjet.DataStream+peek) - Allows previewing some of the streams data without removing them from the stream.
- [`dataStream.slice([start], [length]) ↺`](/framework/data-stream/#module_scramjet.DataStream+slice) - Slices out a part of the stream to the passed Function.
- [`dataStream.assign(func) ↺`](/framework/data-stream/#module_scramjet.DataStream+assign) - Transforms stream objects by assigning the properties from the returned
- [`dataStream.empty(callback) ↺`](/framework/data-stream/#module_scramjet.DataStream+empty) - Called only before the stream ends without passing any items
- [`dataStream.unshift() ↺`](/framework/data-stream/#module_scramjet.DataStream+unshift) - Pushes any data at call time (essentially at the beginning of the stream)
- [`dataStream.endWith(item) ↺`](/framework/data-stream/#module_scramjet.DataStream+endWith) - Pushes any data at end of stream
- [`dataStream.accumulate(func, into) : Promise.&lt;any&gt; ⇄`](/framework/data-stream/#module_scramjet.DataStream+accumulate) - Accumulates data into the object.
- [`~~dataStream.consume(func) ⇄~~`](/framework/data-stream/#module_scramjet.DataStream+consume) - Consumes the stream by running each Function
- [`dataStream.reduceNow(func, into) : * ↺`](/framework/data-stream/#module_scramjet.DataStream+reduceNow) - Reduces the stream into the given object, returning it immediately.
- [`dataStream.remap(func, [ClassType]) ↺`](/framework/data-stream/#module_scramjet.DataStream+remap) - Remaps the stream into a new stream.
- [`dataStream.flatMap(func, [ClassType]) ↺`](/framework/data-stream/#module_scramjet.DataStream+flatMap) - Takes any method that returns any iterable and flattens the result.
- [`dataStream.flatten() : DataStream ↺`](/framework/data-stream/#module_scramjet.DataStream+flatten) - A shorthand for streams of arrays or iterables to flatten them.
- [`dataStream.concat() ↺`](/framework/data-stream/#module_scramjet.DataStream+concat) - Returns a new stream that will append the passed streams to the callee
- [`dataStream.join(item) ↺`](/framework/data-stream/#module_scramjet.DataStream+join) - Method will put the passed object between items. It can also be a function call or generator / iterator.
- [`dataStream.keep([count]) ↺`](/framework/data-stream/#module_scramjet.DataStream+keep) - Keep a buffer of n-chunks for use with {@see DataStream..rewind}
- [`dataStream.rewind([count]) ↺`](/framework/data-stream/#module_scramjet.DataStream+rewind) - Rewinds the buffered chunks the specified length backwards. Requires a prior call to {@see DataStream..keep}
- [`dataStream.stack([count], [drop]) ↺`](/framework/data-stream/#module_scramjet.DataStream+stack) - Returns a stream that stacks up incoming items always feeding out the newest items first.
- [`dataStream.distribute([affinity], [clusterFunc], [options]) ↺`](/framework/data-stream/#module_scramjet.DataStream+distribute) - Distributes processing into multiple sub-processes or threads if you like.
- [`dataStream.separateInto(streams, affinity) ↺`](/framework/data-stream/#module_scramjet.DataStream+separateInto) - Separates stream into a hash of streams. Does not create new streams!
- [`dataStream.separate(affinity, [createOptions], [ClassType]) : MultiStream ↺`](/framework/data-stream/#module_scramjet.DataStream+separate) - Separates execution to multiple streams using the hashes returned by the passed Function.
- [`dataStream.delegate(delegateFunc, worker, [plugins]) ↺`](/framework/data-stream/#module_scramjet.DataStream+delegate) - Delegates work to a specified worker.
- [`dataStream.rate(cps, [options]) ↺`](/framework/data-stream/#module_scramjet.DataStream+rate) - Limit the rate of the stream to a given number of chunks per second or given timeframe.
- [`dataStream.batch(count) ↺`](/framework/data-stream/#module_scramjet.DataStream+batch) - Aggregates chunks in arrays given number of number of items long.
- [`dataStream.timeBatch(ms, [count]) ↺`](/framework/data-stream/#module_scramjet.DataStream+timeBatch) - Aggregates chunks to arrays not delaying output by more than the given number of ms.
- [`dataStream.nagle([size], [ms]) ↺`](/framework/data-stream/#module_scramjet.DataStream+nagle) - Performs the Nagle's algorithm on the data. In essence it waits until we receive some more data and releases them
- [`dataStream.window(length) : WindowStream ↺`](/framework/data-stream/#module_scramjet.DataStream+window) - Returns a WindowStream of the specified length
- [`dataStream.toJSONArray([enclosure]) : StringStream ↺`](/framework/data-stream/#module_scramjet.DataStream+toJSONArray) - Transforms the stream to a streamed JSON array.
- [`dataStream.toJSONObject([entryCallback], [enclosure]) : StringStream ↺`](/framework/data-stream/#module_scramjet.DataStream+toJSONObject) - Transforms the stream to a streamed JSON object.
- [`dataStream.JSONStringify([endline]) : StringStream ↺`](/framework/data-stream/#module_scramjet.DataStream+JSONStringify) - Returns a StringStream containing JSON per item with optional end line
- [`dataStream.CSVStringify([options]) : StringStream ↺`](/framework/data-stream/#module_scramjet.DataStream+CSVStringify) - Stringifies CSV to DataString using 'papaparse' module.
- [`dataStream.exec(command, [options])`](/framework/data-stream/#module_scramjet.DataStream+exec) - Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.
- [`dataStream.debug(func) : DataStream ↺`](/framework/data-stream/#module_scramjet.DataStream+debug) - Injects a `debugger` statement when called.
- [`dataStream.toBufferStream(serializer) : BufferStream ↺`](/framework/data-stream/#module_scramjet.DataStream+toBufferStream) - Creates a BufferStream.
- [`dataStream.toStringStream([serializer]) : StringStream ↺`](/framework/data-stream/#module_scramjet.DataStream+toStringStream) - Creates a StringStream.
- [`dataStream.toBufferStream(serializer) : BufferStream ↺`](/framework/data-stream/#module_scramjet.DataStream+toBufferStream) - Creates a BufferStream.
- [`dataStream.toStringStream([serializer]) : StringStream ↺`](/framework/data-stream/#module_scramjet.DataStream+toStringStream) - Creates a StringStream.
- [`DataStream:from(input, [options]) : DataStream`](/framework/data-stream/#module_scramjet.DataStream.from) - Returns a DataStream from pretty much anything sensibly possible.
- [`DataStream:pipeline(readable) : DataStream`](/framework/data-stream/#module_scramjet.DataStream.pipeline) - Creates a pipeline of streams and returns a scramjet stream.
- [`DataStream:fromArray(array, [options]) : DataStream`](/framework/data-stream/#module_scramjet.DataStream.fromArray) - Create a DataStream from an Array
- [`DataStream:fromIterator(iterator, [options]) : DataStream`](/framework/data-stream/#module_scramjet.DataStream.fromIterator) - Create a DataStream from an Iterator

### :StringStream

A stream of string objects for further transformation on top of DataStream.

Example:

```js
StringStream.from(async () =>
  (await fetch("https://example.com/data/article.txt")).text()
)
  .lines()
  .append("\r\n")
  .pipe(fs.createWriteStream("./path/to/file.txt"));
```

[Detailed :StringStream docs here](/framework/string-stream/)

**Most popular methods:**

- `new StringStream([encoding], [options])` - Constructs the stream with the given encoding
- [`stringStream.shift(bytes, func) ↺`](/framework/string-stream/#module_scramjet.StringStream+shift) - Shifts given length of chars from the original stream
- [`stringStream.split(splitter) ↺`](/framework/string-stream/#module_scramjet.StringStream+split) - Splits the string stream by the specified RegExp or string
- [`stringStream.match(matcher) ↺`](/framework/string-stream/#module_scramjet.StringStream+match) - Finds matches in the string stream and streams the match results
- [`stringStream.toBufferStream() : BufferStream ↺`](/framework/string-stream/#module_scramjet.StringStream+toBufferStream) - Transforms the StringStream to BufferStream
- [`stringStream.parse(parser, [StreamClass]) : DataStream ↺`](/framework/string-stream/#module_scramjet.StringStream+parse) - Parses every string to object
- [`stringStream.toDataStream()`](/framework/string-stream/#module_scramjet.StringStream+toDataStream) - Alias for {@link StringStream#parse}
- [`stringStream.lines([eol]) ↺`](/framework/string-stream/#module_scramjet.StringStream+lines) - Splits the string stream by the specified regexp or string
- [`stringStream.JSONParse([perLine]) : DataStream ↺`](/framework/string-stream/#module_scramjet.StringStream+JSONParse) - Parses each entry as JSON.
- [`stringStream.CSVParse([options]) : DataStream ↺`](/framework/string-stream/#module_scramjet.StringStream+CSVParse) - Parses CSV to DataString using 'papaparse' module.
- [`stringStream.append(param) ↺`](/framework/string-stream/#module_scramjet.StringStream+append) - Appends given argument to all the items.
- [`stringStream.prepend(param) ↺`](/framework/string-stream/#module_scramjet.StringStream+prepend) - Prepends given argument to all the items.
- [`stringStream.exec(command, [options])`](/framework/string-stream/#module_scramjet.StringStream+exec) - Executes a given sub-process with arguments and pipes the current stream into it while returning the output as another DataStream.
- [`StringStream:SPLIT_LINE`](/framework/string-stream/#module_scramjet.StringStream.SPLIT_LINE) - A handy split by line regex to quickly get a line-by-line stream
- [`StringStream:fromString(stream, encoding) : StringStream`](/framework/string-stream/#module_scramjet.StringStream.fromString) - Creates a StringStream and writes a specific string.
- [`StringStream:pipeline(readable, transforms) : StringStream`](/framework/string-stream/#module_scramjet.StringStream.pipeline) - Creates a pipeline of streams and returns a scramjet stream.
- [`StringStream:from(source, [options]) : StringStream`](/framework/string-stream/#module_scramjet.StringStream.from) - Create StringStream from anything.

### :BufferStream

A facilitation stream created for easy splitting or parsing buffers.

Useful for working on built-in Node.js streams from files, parsing binary formats etc.

A simple use case would be:

```javascript
fs.createReadStream("pixels.rgba")
  .pipe(new BufferStream()) // pipe a buffer stream into scramjet
  .breakup(4) // split into 4 byte fragments
  .parse(buffer => [
    buffer.readInt8(0), // the output is a stream of R,G,B and Alpha
    buffer.readInt8(1), // values from 0-255 in an array.
    buffer.readInt8(2),
    buffer.readInt8(3),
  ]);
```

[Detailed :BufferStream docs here](/framework/buffer-stream/)

**Most popular methods:**

- `new BufferStream([opts])` - Creates the BufferStream
- [`bufferStream.shift(chars, func) ↺`](/framework/buffer-stream/#module_scramjet.BufferStream+shift) - Shift given number of bytes from the original stream
- [`bufferStream.split(splitter) : BufferStream ↺`](/framework/buffer-stream/#module_scramjet.BufferStream+split) - Splits the buffer stream into buffer objects
- [`bufferStream.breakup(number) : BufferStream ↺`](/framework/buffer-stream/#module_scramjet.BufferStream+breakup) - Breaks up a stream apart into chunks of the specified length
- [`bufferStream.stringify([encoding]) : StringStream`](/framework/buffer-stream/#module_scramjet.BufferStream+stringify) - Creates a string stream from the given buffer stream
- [`bufferStream.parse(parser) : DataStream`](/framework/buffer-stream/#module_scramjet.BufferStream+parse) - Parses every buffer to object
- [`BufferStream:pipeline(readable) : BufferStream`](/framework/buffer-stream/#module_scramjet.BufferStream.pipeline) - Creates a pipeline of streams and returns a scramjet stream.
- [`BufferStream:from(stream, [options]) : BufferStream`](/framework/buffer-stream/#module_scramjet.BufferStream.from) - Create BufferStream from anything.

### :MultiStream

An object consisting of multiple streams than can be refined or muxed.

The idea behind a MultiStream is being able to mux and demux streams when needed.

Usage:

```javascript
new MultiStream([...streams]).mux();

new MultiStream(function* () {
  yield* streams;
})
  .map(stream => stream.filter(myFilter))
  .mux();
```

[Detailed :MultiStream docs here](/framework/multi-stream/)

**Most popular methods:**

- `new MultiStream(streams, [options])` - Crates an instance of MultiStream with the specified stream list
- [`multiStream.streams : Array`](/framework/multi-stream/#module_scramjet.MultiStream+streams) - Array of all streams
- [`multiStream.source : DataStream`](/framework/multi-stream/#module_scramjet.MultiStream+source) - Source of the MultiStream.
- [`multiStream.length : number`](/framework/multi-stream/#module_scramjet.MultiStream+length) - Returns the current stream length
- [`multiStream.map(aFunc, rFunc) : Promise.<MultiStream> ↺`](/framework/multi-stream/#module_scramjet.MultiStream+map) - Returns new MultiStream with the streams returned by the transform.
- [`multiStream.find() : DataStream`](/framework/multi-stream/#module_scramjet.MultiStream+find) - Calls Array.prototype.find on the streams
- [`multiStream.filter(func) : MultiStream ↺`](/framework/multi-stream/#module_scramjet.MultiStream+filter) - Filters the stream list and returns a new MultiStream with only the
- [`multiStream.mux([comparator], [ClassType]) : DataStream`](/framework/multi-stream/#module_scramjet.MultiStream+mux) - Muxes the streams into a single one
- [`multiStream.add(stream)`](/framework/multi-stream/#module_scramjet.MultiStream+add) - Adds a stream to the MultiStream
- [`multiStream.remove(stream)`](/framework/multi-stream/#module_scramjet.MultiStream+remove) - Removes a stream from the MultiStream
- [`multiStream.route([policy], [count]) : MultiStream`](/framework/multi-stream/#module_scramjet.MultiStream+route) - Re-routes streams to a new MultiStream of specified size
- [`multiStream.smap(transform) ↺`](/framework/multi-stream/#module_scramjet.MultiStream+smap) - Map stream synchronously
- [`multiStream.cluster(clusterFunc, [options]) ↺`](/framework/multi-stream/#module_scramjet.MultiStream+cluster) - Distributes processing to multiple forked subprocesses.
- [`MultiStream:from(streams, [StreamClass]) : MultiStream`](/framework/multi-stream/#module_scramjet.MultiStream.from) - Constructs MultiStream from any number of streams-likes

### :NumberStream

Simple scramjet stream that by default contains numbers or other containing with `valueOf` method. The streams
provides simple methods like `sum`, `average`. It derives from DataStream so it's still fully supporting all `map`,
`reduce` etc.

[Detailed :NumberStream docs here](/framework/number-stream/)

**Most popular methods:**

- `new NumberStream(options)` - Creates an instance of NumberStream.
- [`numberStream.sum() : Promise.&lt;number&gt; | any ⇄`](/framework/number-stream/#module_scramjet.NumberStream+sum) - Calculates the sum of all items in the stream.
- [`numberStream.avg() : Promise.&lt;number&gt; | any ⇄`](/framework/number-stream/#module_scramjet.NumberStream+avg) - Calculates the sum of all items in the stream.

### :WindowStream

A stream for moving window calculation with some simple methods.

In essence it's a stream of Array's containing a list of items - a window.
It's best used when created by the `DataStream..window`` method.

[Detailed :WindowStream docs here](/framework/window-stream/)

**Most popular methods:**

- [`windowStream.sum([valueOf]) : NumberStream ↺`](/framework/window-stream/#module_scramjet.WindowStream+sum) - Calculates moving sum of items, the output NumberStream will contain the moving sum.
- [`windowStream.avg([valueOf]) : NumberStream ↺`](/framework/window-stream/#module_scramjet.WindowStream+avg) - Calculates the moving average of the window and returns the NumberStream

### :StreamWorker

StreamWorker class - intended for internal use

This class provides control over the subprocesses, including:

- spawning
- communicating
- delivering streams

[Detailed :StreamWorker docs here](/framework/stream-worker/)

**Most popular methods:**

- `new StreamWorker()` - Private constructor
- [`streamWorker.spawn() : StreamWorker ⇄`](/framework/stream-worker/#module_scramjet.StreamWorker+spawn) - Spawns the worker if necessary and provides the port information to it.
- [`streamWorker.delegate(input, delegateFunc, [plugins]) : DataStream`](/framework/stream-worker/#module_scramjet.StreamWorker+delegate) - Delegates a stream to the child using tcp socket.
- [`StreamWorker:fork([count]) : Array.<StreamWorker> ⇄`](/framework/stream-worker/#module_scramjet.StreamWorker.fork) - Spawns (Preforks) a given number of subprocesses and returns the worker asynchronously.
- [`StreamWorker:_getWorker() : StreamWorker ⇄`](/framework/stream-worker/#module_scramjet.StreamWorker._getWorker) - Picks next worker (not necessarily free one!)
