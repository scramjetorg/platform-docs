---
slug: "/framework"
title: "About Framework"
description: "About Framework"
separator: Intro
position: 1
type: "framework"
order: 1
---

# About Scramjet Framework

**Version 4**

![Framework Logo](https://assets.scramjet.org/images/framework-logo-256.svg)

[![npm version](https://img.shields.io/npm/v/scramjet)](https://www.npmjs.com/scramjet)
[![npm downloads](https://img.shields.io/npm/dt/scramjet)](https://www.npmjs.com/scramjet)
[![last commit](https://img.shields.io/github/last-commit/scramjetorg/scramjet)](https://github.com/scramjetorg/scramjet)
[![Build status](https://img.shields.io/github/checks-status/scramjetorg/scramjet/master?label=build)](https://github.com/scramjetorg/scramjet)
[![Known Vulnerabilities](https://snyk.io/test/github/scramjetorg/scramjet/badge.svg)](https://snyk.io/test/github/scramjetorg/scramjet)
[![Discord](https://img.shields.io/discord/925384545342201896?label=discord)](https://discord.gg/52USU8q7AX)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7F7V65C43EBMW)

## What does it do?

Scramjet is a fast, simple, functional reactive stream programming framework written on top of node.js object
streams. The code is written by chaining functions that transform the streamed data, including well known map, filter and
reduce and fully compatible with ES7 async/await. Thanks to it some built in optimizations scramjet is much faster and much
much simpler than similar frameworks when using asynchronous operations.

The main advantage of scramjet is running asynchronous operations on your data streams. First of all it allows you to
perform the transformations both synchronously and asynchronously by using the same API - so now you can "map" your
stream from whatever source and call any number of API's consecutively. And if you're after some heavy maths
there's an option of running your stream as multi-threaded!

## Example

How about a full API to API migration, reading a long list of items from one API and checking them one after another,
pushing them to another API? With simultaneous request control? And outputting the log of the conversion? Easy!

```javascript
const fetch = require("node-fetch");
const get = async (url, options = {}) => (await fetch(url, options)).json;
const { StringStream } = require("scramjet");

StringStream.from(
  // fetch your API to a scramjet stream
  () => get("https://api.example.org/v1/shows/list")
)
  .setOptions({ maxParallel: 4 }) // set your options
  .lines() // split the stream by line
  .parse(line => {
    // parse strings to data
    const [id, title, url] = line.split(",");
    return { id, title, url };
  })
  .map(async myShow =>
    get({
      // use asynchronous mapping (for example send requests)
      uri: `http://api.local/set/${myShow.id}`,
      body: JSON.stringify(myShow),
    })
  )
  .stringify(resp => `+ Updated "${resp}"`)
  .catch(err => `! Error occured ${err.uri}`) // handle errors
  .append("\n")
  .pipe(process.stdout); // use any stream
```

Here you can find a most basic guide on how to execute the above example starting from just having access to some command
line: [Scramjet from Scratch](framework/quick-start)

## Execution and deployment

You can now run stream processing programs with our Scramjet Transform Hub. It will allow you to deploy and execute programs
on local and remote environments of your choice and it's as easy as:

```bash
npm i -g @scramjet/sth @scramjet/cli
scramjet-transform-hub &
si run <path-to-your-program-dir>
```

See more info:

- onour website [scramjet.org](https://scramjet.org),
- the documentation repo [scramjetorg/scramjet-cloud-docs](https://github.com/scramjetorg/scramjet-cloud-docs)
- the source code and development guide [scramjetorg/transform-hub](https://github.com/scramjetorg/transform-hub)

## Scramjet Framework core

Don't like dependencies? Scramjet packs just a couple of those, but if you are really really annoyed by second depth of
deps, please try [scramjet-core](https://www.npmjs.com/package/scramjet-core).

Only the most vital methods there, but the library is dependency free.

## Scramjet Framework pre-release

Scramjet is a simple reactive stream programming framework. The code is written by chaining functions that transform the streamed data, including well known map, filter and reduce (in JS and Python) or each (in C++).

The main advantage of Scramjet is running asynchronous operations on your data streams concurrently. It allows you to perform the transformations both synchronously and asynchronously by using the same API - so now you can "map" your stream from whatever source and call any number of API's consecutively.

This is a pre-release of the next major version (v5) of [JavaScript Scramjet Framework](https://www.npmjs.com/package/scramjet).

[Originally written](https://github.com/scramjetorg/scramjet) on top of node.js object streams, Scramjet is now being ported into cpp. This is what is happening in this repository. There is also [JavaScript/TypeScript](https://github.com/scramjetorg/framework-js) and [Python](https://github.com/scramjetorg/framework-python) version available.

**We are open to your feedback!** We encourage you to report issues with any ideas, suggestions and features you would like to see in this version. You can also upvote (`+1`) existing ones to show us the direction we should take in developing Scramjet Framework.

## License and contributions

As of version 2.0 Scramjet is MIT Licensed.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fscramjetorg%2Fscramjet.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fscramjetorg%2Fscramjet?ref=badge_large)

## Help wanted

The project need's your help! There's lots of work to do - transforming and muxing, joining and splitting, browserifying, modularizing, documenting and issuing those issues.

If you want to help and be part of the Scramjet team, please reach out to us, [on discord](https://discord.gg/52USU8q7AX) or email us: [opensource@scramjet.org](opensource@scramjet.org).

## Donation

Do you like this project? It helped you to reduce time spent on delivering your solution? You are welcome to buy us a coffee ;)

[Support us with Github Sponsors](https://github.com/sponsors/scramjetorg)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7F7V65C43EBMW)
