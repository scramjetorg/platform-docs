---
slug: "/platform/transform-hub"
title: "The Transform Hub"
description: "The Transform Hub"
separator: Self Hosted
position: 5
type: "platform"
order: 7
---

# Transform Hub

Scramjet Transform Hub is a container supervisor that lies in the center of Scramjet Cloud Platform. It allows deployment, execution and monitoring of all applications executed on Scramjet Cloud Platform.

## The basics

Transform Hub allows Scramjet Cloud Platform to deploy and execute programs that you build and develop. As mentioned above, you can run any program you like, but you need to know a couple of important things:

- The program should consist of a function or an array of functions, such a program is called a **Transform Sequence**
- The Sequence will be executed with one of the dedicated adapters; Kubernetes, Docker or process.
- The main Sequence function receives a stream as input in the first argument. You can send the data to the input directly through the STH API or by using the CLI interface with command `si instance input`.
- If your Sequence contains more than one function, then the output from the first function is passed to the next one. Also, the first function in Sequence receives the input from the STH API.
- The last (or the only) function in Sequence can return a `Promise` or a `Stream` - based on this, the STH will know when processing is done.
- Once the returned `Promise` is resolved, or the `Stream` is ended, the STH will gracefully stop the Instance (an instance of running Sequence).
- You can communicate with the STH using the STH API directly or with the command line client `si` which we wrote for your convenience.
- The Sequence is called with an AppContext as `this`, a class that allows you to communicate with your Instance: send logs, provide health and resource usage stats info, send and receive events and more.
- You can run your Sequence multiple times with different arguments (for example: currency tickers with different symbols or sensor data readers for each sensor)
- The STH does not leave your server and doesn't use any external systems. It runs on the server you install it on.
- Currently the STH supports running programs written in Node.js and Python. We're working on bringing you the ability to execute programs written in other languages.

## Self hosted

Scramjet Transform Hub is available as open source software dual licensed under the AGPL-3.0 and MIT licenses. The source code for Scramjet Transform Hub can be found on [GitHub](https://github.com/scramjetorg/transform-hub).

The Scramjet Transform Hub repository linked above is intended for developers who would like to:

- participate in the Scramjet Transform Hub development community,
- register feature requests, issues and PRs for this product,
- build Transform Hub from source,
- dive into code and see how it works.

The developers who would like to simply use Scramjet Transform Hub to run data processing applications, we recommend following resources:

- ![GitHub logo](../../images/logos/github-icon.svg) [Repository with Quick Start and code samples](https://github.com/scramjetorg/scramjet-cloud-docs)
- ![NPM package STH](../../images/logos/npm-icon.svg) [Scramjet Transform Hub NPM package](https://www.npmjs.com/package/@scramjet/sth)
- ![NPM package CLI](../../images/logos/npm-icon.svg) [Scramjet CLI NPM package](https://www.npmjs.com/package/@scramjet/cli)

## Usage

Scramjet Transform Hub is a deployment and execution platform. Once installed on a server, it will allow you to start your programs and keep them running on a remote machine. You will be able to start programs in the background or connect to them and see their output directly on your terminal. You will be able to pipe your local data to the program as if it was running from your terminal. You can start your server in AWS, Google Cloud or Azure, start it on your local machine, install it on a Raspberry Pi or wherever else you'd like.

There's no limit to what you can use it for. Do you want a stock checker? A chatbot? Maybe you'd like to automate your home? Retrieve sensor data? Maybe you have a lot of data and want to transfer and wrangle it? You have a database of cities and you'd like to enrich your data? You do machine learning and you want to train your set while the data is fetched in real-time? Hey, you want to use it for something else and ask us if that's a good use? Ask us [via email](mailto:get@scramjet.org) 📧 or hop on our [Scramjet Discord](https://discord.gg/4EX3jHBe) <img src="../../images/logos/discord-seeklogo.com.svg" alt="Discord Logo" height="18px"/>

[Check our proposition of sample architecture for use cases in different industries.](https://scramjet.org/#use-cases)

We recommend to develop and run the STH on a linux based operating system, for instance [Ubuntu](https://ubuntu.com/download/server) installed. However, Mac and Windows are also supported and we're working on development guides for these two operating systems.🔜

Scramjet Transform Hub runs on [Node.js](https://nodejs.org/en/) and use three dedicated adapters for executing user programs:

- [Kubernetes](https://kubernetes.io/) - for the cloud environments and multiple servers,
- [Docker](https://www.docker.com/get-started) - the default for running in a standard server space,
- Process - for running as non-separated processes aimed for simple deployments.

## Where to go next

Here you can find more resources related to Scramjet Transform Hub:

- 📚 [Check out some samples](/platform/samples) - we have prepared some ready-to-use apps, which you can either use as a starting point for creating your own Sequences or simply run them just to see what they do, and how the STH works with them.
- 📂 [Start from our app templates](/platform/templates) - almost a blank file structure (package) and usage instructions, ready to be used as a starting point for building your own Sequences. This is the simplest base we can provide for you to start with.
- 🧑‍💻 [Contribute to STH development](https://github.com/scramjetorg/transform-hub) - please feel free to contribute to STH development by submitting pull requests or creating issues on GitHub.
- 🌐 [Visit our Scramjet.org page](https://scramjet.org) - check out our website for more information about our Scramjet team, history and products.

<!-- ## User's dictionary

There is a lot of terminology that we use in our project that may already be known to you. We have prepared a [dictionary](/docs/dictionary) of terms that you may find useful and which you will learn as you learn about Scramjet Platform. We try to keep the definitions short and simple. -->

---

<!-- <br> -->

### Thank you for reading, we hope you enjoyed it. If not, here is a random cheer up joke, that may make you smile 😁 <!-- omit in toc -->

[![Jokes Card](https://readme-jokes.vercel.app/api)](https://readme-jokes.vercel.app/api)
