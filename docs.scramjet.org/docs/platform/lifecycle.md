---
slug: "/platform/lifecycle"
title: Sequence Lifecycle
description: Sequence Lifecycle
separator: Development Basics
position: 2
type: "platform"
order: 3
---

# Sequence Lifecycle

There are four major steps in the Sequence lifecycle in the Scramjet Cloud Platform

* Sequence Source code - your code in development form as text files
* Sequence Package - the built program compiled with it's dependencies in one file
* Sequence, The - the program sent to the Platform and ready for execution
* Sequence Instance - an executed program while it's running

This document describes the process and their internal stages.

## Source code

In this phase the program is being written by the developer and may contain additional 
files or items that you need for development. The minimal source code would consist of:

1. A source file (js for instance):
   ```js
   module.exports = async function() {
     // do stuff here.
   }
   ```
2. A basic configuration file - `package.json` - this always needs to be defined, no matter the language.
   ```json
   {
     "name": "@example/my-sequence",
     "version": "0.1.1",
     "main": "./index.js"
   }
   ```

And that's it.

You may consider using build scripts to create a structure as above and remove the unneeded development files. Task runners like Yarn, Gulp or similar are quite good choices.

<!-- 

Scramjet CLI Interface `cli` provides a tool to generate the basic source code for different languages. You can run this simple command:

> `si template <name> <directory>`

The list of templates can be seen in [Scramjet Sequence Templates repo on Github](https://github.com/scramjetorg/platform-samples/tree/main/templates)

-->

## Sequence Package

A Sequence Package is a `tar.gz` file that contains:

1. The above source code or a compiled version of your program
2. Additional files needed by the program to run (dependencies)
3. The definition in `package.json`.

These items put together in a tarball will allow all needed files to be sent to the platform. Once you have a directory with contents as mentioned above you can just create a tarball, but if you don't remember the commandline and/or would prefer to have Scramjet to run some basic checks, we've prepared a command to get you to the next stage in lifecycle:

```bash
si seq pack <directory> [-o <output.tar.gz>]
```

> Rememeber: this won't install your dependencies, so make sure you do `pip install -r requirements.txt` or `npm i` wherever it makes sense.

## The Sequence

A package becomes a sequence via the process of `<drumroll>` uploading it to the platform. It's that easy:

```bash
si seq send <file.tar.gz>|-
```

If you ommit the filename and instead add the `-` as shown above, the last sequence packed with `si` will be sent.

All the sequences sent to Scramjet Cloud Platform can be listed, removed and most importantly invoked to become an `Instance`

## Sequence Instance

When the sequence is started it becomes an instance - you can think of this like a program window, you can start as much as you want. You can start as many instances as you like within the limits of your platform Space or your Self-Hosted Hub.

In order to start your instance you can use the API, the web Console or this simple CLI command:

```bash
si seq start <id>|- [...arguments]
```

You can pass different argument every time you start a new Sequence Instance and use those in your implementation. This means within a sequence like this:

```js
module.export => async function* (initialNumber = 0, length = 1000) {
  for (let i = initialNumber; i < initialNumber + length; i++)
    yield i;
}
```

The output of the sequence can be controlled by the arguments, so using this command:

```bash
si seq start <id> 3000 10
si inst output -
```

You will see the output like this:

```
3000
3001
3002
3003
3004
3005
3006
3007
3008
3009
```

## What happens when the sequence ends

When the sequence ends it's process gets removed along with any parts the sequence left behind.

The output, logs and stdio will be accessible for a short time period for inspection.

