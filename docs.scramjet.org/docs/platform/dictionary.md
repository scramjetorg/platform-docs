---
slug: "/dictionary"
title: "Dictionary"
description: "dictionary"
separator: "Concept"

order: 2
type: "no"
---

# Dictionary 📘 <!-- omit in toc -->

The idea of dictionary is not new. This one is meant to bring closer the terminology that we use in our project.
Even when we think that some word has a different meaning in the outside world, here we have description what it means in case of Scramjet Platform project.
Using right words in specific context should help us all to prevent misunderstanding and mistakes, it should also lead us to faster and more effective development and platform usage.

If you think that some word definitions are missing, please feel free to contact us or [add an issue](https://github.com/scramjetorg/scramjet-cloud-docs/issues).

- [Asynchronous](#asynchronous)
- [Container](#container)
- [Framework](#framework)
- [Instance](#instance)
- [Input](#input)
- [Image](#image)
- [SDK](#sdk)
- [Sequence](#sequence)
- [Sequence Function](#sequence-function)
- [Scramjet CLI](#scramjet-cli)
- [Scramjet Hub](#scramjet-hub)
  - [Scramjet Transform Hub (STH)](#scramjet-transform-hub-sth)
  - [Scramjet Cloud Platform Hub](#scramjet-cloud-platform-hub)
- [Socket](#socket)
- [Stdio](#stdio)
- [Synchronous](#synchronous)
- [TaaS](#taas)
- [Thread](#thread)

## Asynchronous

Asynchronous execution of operations allows multiple processes/functions to happen at the same time. We do not have to wait for the result of the first function/method call, but we perform the next and subsequent ones. Physically, in a computer, true asynchronicity requires multiple CPU cores. In case of single-core CPU, asynchronicity is faked by dividing the linear processor time between the different processes. See also [synchronous](#synchronous).

## Container

[Container](https://www.docker.com/resources/what-container). According to a definition of docker: "A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another".

## Framework

Scramjet Framework is a popular stream processing library that allows efficient processing of large and real-time data sets. It is the operational core of our platform. Thanks to it, users can process the data of any size, in real time or on demand, and in a highly efficient manner. It allows us to simplify processing in parallel, concurrently, and sequentially, so you can focus on the core aspect of your business, not on the finding ways to be efficient enough.

## Instance

The Instance (compute instance) is a running Sequence, that can process an enormous amount of data on the fly without losing persistence.

## Input

Input is a set of parameters/values that are passed to the function.

## Image

[Container](#container) image. The image is a "snapshot" of the system and software that runs inside the container.
The image can exist without the container. A container needs an image to run it and perform any productive function.

## SDK

Software Development Kit. A collection of tools and libraries to create a software. It usually includes a compiler, runtime, and necessary libraries.

## Sequence

Transform Sequence is a list of chained functions with a lightweight application business logic that contains a developer code. The minimal number is one function.

## Sequence Function

Single function, atomic element of the [sequence](#sequence) written by the developer.

## Scramjet CLI

Scramjet Command Line Interface. It allows to communicate with Scramjet Transform Hub (STH) and Scramjet Cloud Platform (SCP).

## Scramjet Hub

Hub allows to run programs in different data centers, computers or devices in local network.

### Scramjet Transform Hub (STH)

Scramjet Transform Hub is a type of Hub that you can develop locally. It could be installed on the local machine or single board computer for IOT purpose.

### Scramjet Cloud Platform Hub

Scramjet Cloud Hub is STH that is connected to the Scramjet Cloud Platform.

## Socket

Socket is a kind of an endpoint in a two-way communication channel between the server and the receiving software (client). Typically the socket is used for a specific flow of events. In the case of the client-server model, the socket on the server listens when requested by the client. The client connects to the server through the socket. The socket can be a socket on the disk or it can be an IP socket - so you can actually serve HTTP API on your disk - for real!

## Stdio

It means standard input (stdin), standard output (stdout) and standard error (stderr). Application communication channels with the outside world (e.g. the console). Stdin allows you to enter information into an application (e.g. from the keyboard). Stdout allows you to display messages from the application, e.g. on a monitor/printer, etc.

## Synchronous

Performing actions synchronously means pausing program execution until one action is executed, blocking any other actions from being performed at the same time on the same [thread](#thread)
Example: sending a request to the API-> waiting for a response (the entire application is waiting) -> response to a response -> sending another request. See also [asynchronous](#asynchronous).

## TaaS

Transform as a Service is a concept picked up by the founder of Scramjet. In fact, this is what we are creating, the platform. Unlike FaaS, which executes the code of functions (often very simple ones), TaaS aims to perform optimal performance transformations on the data stream.

## Thread

A thread is a single process used in program to complete tasks. Each thread can only perform a single task at once:

```bash
Task A ---> Task B ---> Task C
```
