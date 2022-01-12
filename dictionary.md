[Home](README.md)

# Dictionary :book:

The idea of dictionary is not new. This one is meant to bring closer the terminology that we use in our project.
Even when we think that some word has a different meaning in the outside world, here we have description what it means in case of Scramjet Platform project.
Using right words in specific context should help us all to prevent misunderstanding and mistakes, it should also lead us to faster and more effective development and platform usage.

If you think that some word definitions are missing, please feel free to contact us or log an issue.

[A](#a)|[B](#b)|[C](#c)|[D](#d)|[E](#e)|[F](#f)|[G](#g)|[H](#h)|[I](#i)|[J](#j)|[K](#k)|[L](#l)|[M](#m)|[N](#n)|[O](#o)|[P](#p)|[Q](#q)|[R](#r)|[S](#s)|[T](#t)|[U](#u)|[V](#v)|[W](#w)|[X](#x)|[Y](#y)|[Z](#z)|

## A

### Account

User's account for the Scramjet platform. It is used to store user's data and to authenticate user's actions. We differentiate between two types of accounts:

- business account
- individual account

### API

A set of defined commands and calls that allow independent applications to communicate with each other. More info: [Application Programming Interface](https://en.wikipedia.org/wiki/API)

### Application / App

Collection of [sequences](#sequence) implementing a given business requirement developed by [developer(s)](#developer), uploaded and launched on [instances](#instance) on an array of [hosts](#host)

### Application Interface (CSI)

Application Interface is an interface exposed by [Sequence](#sequence) to communicate with the [Runner](runner)

### Artifact

Artifacts are byproducts of software development, e.g. project diagrams, plans, etc. In fact, this dictionary is also an [artifact](https://en.wikipedia.org/wiki/Artifact_(software_development))

### Asynchronous

Asynchronous execution of operations allows multiple processes/functions to happen at the same time. We do not have to wait for the result of the first function/method call, but we perform the next and subsequent ones. Physically, in a computer, true asynchronicity requires multiple CPU cores. In case of single-core CPU, asynchronicity is faked by dividing the linear processor time between the different processes. See also [synchronous](#synchronous)


## C

### CLI

Command Line Interface. Command line tool to allows control over the platform

### Client

Client is a very multi meaning word so let's try not to use it. It is allowed in case when context leave no space for interpretation such as "client-server architecture"

### Compilation

Compilation is a process of transforming a source code written in any programming language(human readable) into machine code(machine language), which is executed by the computer

### Container

[Container](https://www.docker.com/resources/what-container). According to a definition of [docker](#docker): "A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another"

### CSH

Cloud Server Host -> [Host](#host)

### CSH Client

[Supervisor's](#supervisor) element, which is responsible for communication with [CSH](#csh)

### CSI

Cloud Server Instance -> [Instance](#instance)

### Cucumber

[Cucumber](https://cucumber.io/) is a framework for automation testing based on [BDD](#bdd), it uses [Gherkin](#gherkin) syntax

## D

### Developer

In other words: software developer. A user of the platform who implements functions and sequences

### Docker

Just like a [virtual machine](#virtual_machine_vm), docker is used to virtualize computer resources, but at the Operating System level, not the entire machine. The containerized operating system is placed in [containers](#container). They have access to selected resources of the base operating system (in a virtual machine these are hardware resources, in the docker these are the resources of the operating system installed on the device).
Thus, we can have this configuration: a physical machine has many virtual machines with different operating systems, each virtual machine can have many containers and each of them can have a different operating system.
Thanks to dockerization, we get rid of the problem of differences in software versions. The container image will behave the same on all machines, without having to install dependencies and worry about the specific system environment on each of them where we run it. Thus, we don't have to deal with a problem of missing libraries (in fact, we deal with it only once, when configuring a container).

The difference between the docker and virtual machines is that they are still operating within a common [kernel](#kernel) and architecture, so either the machines must have a consistent configuration (CPU architecture, platform - unix/win64/linux), or we have to create independent builds for supported configurations (like every package maintainer). Therefore, it is essential that [CSH](#csh) is open-source so that users can adapt it to their needs and the platforms, on which they will use it

### Docker daemon

Checks if a given CSI has the right to perform sensitive operations such as creating new containers, attaching [volumes](#volume), deleting containers, etc

### Docker Helper

Docker Helper is a utility component used by any component that needs to perform operations on Docker containers

### Docker Helper Interface

Docker Helper Interface defines methods that must be implemented by DockerodeDockerHelper (or any other docker helper in future). This is a set of methods that can be performed in [Docker](#docker), while the DockerodeDockerHelper class is a specific implementation of these methods (e.g. start container), it is done with the help of the dockerrode npm library (which is used to communicate with Docker)

### Docker Proxy

A CSI component, which supports [instance](#instance) in managing and communicating with the containers, that it creates. Docker Proxy protects against illegal container creation or deletion (generally illegal communication with [Docker daemon](#docker-daemon)). This protects us against a situation when, for example, some foreign program would try to manipulate the containers

## E

### Eslint

ESLint is a tool for a static code analysis ([linter](#linter)). It identifies and reports on patterns found in JavaScript code, the goal is to make code more consistent and avoiding bugs. More info: <https://eslint.org/>

### Endpoint

<!--TODO-->
## F

### Function

Single function, atomic element of the [sequence](#sequence) written by the [developer](#developer)

## G

### Gherkin

Gherkin is a domain-specific programming language created to write behavior descriptions (scenarios) to automate tests for programs/applications. Gherkin also supports [Cucumber](#cucumber) and [BDD](#bdd)

## H

### Host

A set of [instances](#instance) installed on the single operating system (host) together with software that controls instances and allows communication with external elements of the system via protocols (e.g. http)

## I

### ILifeCycle (ILC)

An interface for managing the space in which the [prerunner](#prerunner) and [runner](#runner) operate. It's implemented for example in [LifeCycle Docker Adapter](#lifecycle-docker-adapter-lcda)

### Instance

It is a running [sequence](#sequence). A bundle containing [runner](#runner) that runs a [sequence](#sequence) which is controlled by [supervisor](#supervisor). 

### Interface

In the context of Object-Oriented Programming (OOP), it is a set of methods and properties that the class, which implements interface, should implement, give a body (methods) or values(properties). The interface itself does not contain logic, method's bodies, or values for properties. [Examples](https://www.typescriptlang.org/docs/handbook/interfaces.html)

### Input

Input is a set of parameters/values that are passed to the function.

<!--TODO-->

### Image

[Container](#container) image. The image is a "snapshot" of the system and software that runs inside the container.
The image can exist without the container. A container needs an image to run it and perform any productive function

## J

### JSON

[JavaScript Object Notation](https://www.json.org/json-pl.html) is a lightweight data exchange format. Uses popular conventions from the C family of languages, including C++, C#, Java, JavaScript, Perl, Python, which makes it easy to understand and learn

## K

## L

### Lerna

[Lerna](https://lerna.js.org/) is a tool for managing a JS projects with multiple packages in the same repository, called a Monorepo

### LifeCycle Controller (LCC)

Key [instance](#instance) element, [Supervisor's](#supervisor) component, supervising its work:

- receives a stream with a sequence from [CSH](#host),
- passes this stream to [LiveCycle Docker Adapter](#lifecycle-docker-adapter-lcda)
- gets _config_
- forwards the communication channels (which they got from CSI) to the [LCA](#lifecycle-adapter-lca)
- handles stop/kill events that came from CSH to LCA
- via LCA runs the sequence sent by [host](#host)
- waits for sequence completion (natural, emergency) and communicates these facts to CSH
- triggers space cleaning after the sequence is finished (e.g. removing [containers](#container))

### LifeCycle Docker Adapter (LCDA)

One of the [supervisor's](#supervisor) components. LCDA is an interface that inherits from [IlifeCycle](#ilifecycle-ilc), it is responsible for communication with Docker:

- accepts stream with sequence from [LCC](#lifecycle-controller-lcc),
- creates an image of [prerunner](#prerunner),
- returns _config_, unpacked in prerunner, returns to LCC,
- creates an image of a [runner](#runner),based on information from _config_,
- on the request LCC runs [sequences](#sequence) in the runner container
- cleans after images,
- communicates failures and problems to the LCC,
- "binds" communication pipes coming from the runner container to those it got from LCC (coming from a [host](#host))

### Lifecycle Interface

Lifecycle Interface is an interface that lets [LifeCycle Controller](#lifecycle-controller-lcc) communicate with [LifeCycle Adapter](#ilifecycle-ilc)

### Loadcheck

One of the [supervisor's](#supervisor) components, which is responsible for collecting information about the work status of an [instance](#instance) and forwarding it to [LCC](#lifecycle-controller-lcc)

## M

### Manager

in the context of the Scramjet platform, Cloud Platform Manager is a host management software that provides service-discovery, controls the scaling of individual instances in accordance with the programmed logic and client configuration, providing [API](#api)

### MultiHost
<!--TODO-->

### MultiManager
<!--TODO-->

## N

### npm

[Node Package Manager](https://en.wikipedia.org/wiki/Npm_(software)). Package manager for JS/node.js projects

### nvm

[Node Version Manager](https://github.com/nvm-sh/nvm). In the context of Scramjet it is the version manager for [npm](#npm)

## P

### Platform

Complete, default working environment for our users. Application, host and instance management center

## R

### Routing

In general routing is a process of selecting a right path for information to be delivered. Depending on the context we have a network and application routing:

#### network

the process of selecting the best path for network packets (whether within or between networks). For more info visit [wiki](https://en.wikipedia.org/wiki/Routing)

#### application (API)

Catching a query from the user and redirecting it to the appropriate API function

### Runner

An executable written in one of the supported programming languages that starts the [sequence](#sequence) created by developer, inside the container controlled by the [supervisor](#supervisor)

## S

### Scramjet

Project as whole. Common misspell: __u__ instead of __a__. Beware!

### SDK

Software Development Kit. A collection of tools and libraries to create a software. It usually includes a compiler, runtime, and necessary libraries

### Sequence

It is a compressed package (`*.tar.gz`) containing file with a manifest(eg. `package.json`), describing the app and its configuration (such as main file to run); and a **main file** (eg. `index.js`, `app.ts`) that contains a developer's code that consists of chained functions with a lightweight application business logic . Minimal sequence consists of 1 [function](#function).

### Socket

Socket is a kind of an endpoint in a two-way communication channel between the server and the receiving software (client). Typically the socket is used for a specific flow of events. In the case of the client-server model, the socket on the server listens when requested by the client. The client connects to the server through the socket. The socket can be a socket on the disk or it can be an IP socket - so you can actually serve HTTP API on your disk - for real!

### SSH

[Secure Shell](https://en.wikipedia.org/wiki/SSH_(Secure_Shell)). It's a network cryptographic protocol

### stdin/stdout/stderr <!--TODO-->

standard input/standard output. Application communication channels with the outside world (e.g. the console). Stdin allows you to enter information into an application (e.g. from the keyboard). stdout allows you to display messages from the application, e.g. on a monitor/printer, etc

### STH <!--TODO-->

### Supervisor

An application supervising work of a single [instance](#instance). Communicates with [host](#host), returns health status of the sequence, runner, etc

### Synchronous

Performing actions synchronously means pausing program execution until one action is executed, blocking any other actions from being performed at the same time on the same [thread](#thread)
Example: sending a request to the API-> waiting for a response (the entire application is waiting) -> response to a response -> sending another request. See also [asynchronous](#asynchronous)

## T

### TaaS

Concept picked up by the founder of [Scramjet](#scramjet). Transform as a Service. In fact, this is what we are creating, the [platform](#platform). Unlike FaaS, which executes the code of functions (often very simple ones), TaaS aims to perform optimal performance transformations on the data stream

### Tests

Tests, a broad concept. There are different types of testing in programming, read about them below:

#### BDD

Behavior Driven Development - a software development method in which the task to be performed is determined by describing the expected result. This is achieved through an automated test describing the expected behavior of the system

#### unit tests

unit tests are written by the developer. Run by CI to check whether the newly written code has influenced the already existing code. Starting writing a new function/functionality from writing a test gives a high probability, that what we write will work as it was assumed. Unit tests should be written for key system components. They can be omitted for smaller fragments, helpers

### TCP

Transmission Control Protocol. A low-level networking protocol used for data transmission, it ensures that all packages arrive in the same order in which they were sent

### Thread

A thread is a single process used in program to complete tasks. Each thread can only perform a single task at once:

```bash
Task A ---> Task B ---> Task C
```

### Typescript

TypeScript is a programming language, which extends JavaScript by adding types to the language. Code written in TS is converted to JS and then run

## U

### User

Similar case to the _client_ word. Better not to use it or add additional verb such as "__platform__ user". [Developer](#developer) is a special user type

### UDP

User Datagram Protocol - a protocol that allows data to be sent continuously, it does not guarantee the actual delivery (in case of network problems, package is not retransmitted, it's lost). Useful when sending, for example, data from sensors- the next transmission will update realtime data. Applicable when losing even a significant part of data is acceptable. Thanks to the cut in handshaking this protocol is much faster than [TCP](#tcp), but less reliable when we must be sure that data has been received

## V

### Virtual Machine (VM)

Virtual Machine. Virtualization of a physical machine on a physical machine (it is a kind of Matrix but without Keanu :wink:). There can be several virtual machines on one physical machine. Each VM "eats" the resources of the physical machine (RAM/CPU/disk space). Virtual machines, however, cannot "look" into the resources of other machines, resources are separated (unless we consciously share, for example, a fragment of the disk). If you want to dive deeper into this topic, read also about [overcommitment](https://en.wikipedia.org/wiki/Memory_overcommitment)

### Volume

The term volume refers to a device or area of mass storage that is used to store data, such as a hard drive or hard drive partitions. [Docker](#docker) volumes are the preferred persistence mechanism for data generated and used by containers. Binding mount points depend on the directory structure and operating system of the host computer, while volumes are completely managed by Docker

## Y
