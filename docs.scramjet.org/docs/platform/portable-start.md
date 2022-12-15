---
slug: "/platform/portable-install"
title: Portable Start
description: Scramjet Cloud Platform Portable Install and Usage
separator: Introduction
position: 1
type: "platform"
calc: false
order: 1
---

# Scramjet Cloud Platform Portable Install and Usage

This document describes the most handy way to "install" and use Scramjet CLI Interface `si` and the Transform Hub `sth` without having to install items globally. This guide works with all deployments, with it you should be `just fine`. :)

In order to use this, you need a Linux compatible command line with `node.js` with `npm` installed. If you need to install it please refer to the ([official instructions are here](https://nodejs.org/)). Currently we recommend Node.js version 16.x LTS.

NPM comes with a nice tool called `npx` which we'll use for your convenience.

## Run Scramjet CLI Interface without installing

In order to run `si` on any command line, just type `npx @scramjet/cli --help` - this is what you'll see:

```bash
~$ npx @scramjet/cli --help
```

The system will ask you if you do want to download the program when you issue the command for the first time. You should answer `y` when that happens.

If you want to continue using `si` this way without installing, you can use an alias in standard `bash` or `sh` most other clones like this:

```bash
~$ alias si="npx @scramjet/cli"
```

After that a simple `si config print` will show you the config.

## Using Scramjet Transform Hub without installing

Scramjet Transform Hub is the heart of Scramjet Cloud Platform and also an installable Self-Hosted solution. The installation process may be a little tedious at times and it does require additional configuration so please see the [guide for a self hosted install of Scramjet Cloud Platform](self-hosted-install.md) for more details.

To simply start STH on a fresh server with `node.js` installed run the following command:

```bash
~$ npx @scramjet/sth --help
```

Again the system will ask you if you do want to download the program when you issue the command for the first time. You should also answer `y` when that happens.

By default the server will start with the docker runtime adapter, you have a number of choices there, please refer to the [STH configuration docs](self-hosted-configuration.md) here.

## Compatibility

SI should work on:

* Any Linux based operating system - Ubuntu, Debian, Fedora, Centos, RedHat, Arch, SuSE and derivatives.
* Any BSD compatible system - MacOS, FreeBSD, OpenBSD
* Windows Subsystem for Linux (WSL)
* MinGW, Git Bash and similar solutions on Windows.

STH should work on:

* Any Linux based operating system - Ubuntu, Debian, Fedora, Centos, RedHat, Arch, SuSE and derivatives.
* Any BSD compatible system - MacOS, FreeBSD, OpenBSD
* Windows Subsystem for Linux (WSL)
