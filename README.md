# Sequence template for Scramjet Transform Hub  <!-- omit in toc -->

## How to start the journey? <!-- omit in toc -->

- [Intro](#intro)
- [Dictionary](#dictionary)
- [Installation](#installation)
  - [Node](#node)
  - [Scramjet Interface](#scramjet-interface)
  - [Scramjet Transform Hub](#scramjet-transform-hub)
- [Prepare the package](#prepare-the-package)
  - [1. Specify the JSON file](#1-specify-the-json-file)
  - [2. Write a sequence](#2-write-a-sequence)
  - [3. Make a package from sequence](#3-make-a-package-from-sequence)
  - [3. Run the Transform Hub](#3-run-the-transform-hub)
  - [4. Upload the package](#4-upload-the-package)
- [What next?](#what-next)

---

## Intro

**Scramjet Transform Hub** (STH) is an execution system that will be installed on a managed server by the developer. Once installed, it will serve as an execution platform for programs on this server. Developers will be able to quickly and simply execute programs on this platform, which will automatically forge connections between programs and allow for remote control of program running, managing and termination.

The main aim of STH is to enable developers to execute programs in a much more efficient and simpler way than is currently available. Think of it as an operating system living on a managed server, fully controlled by the developer, but drastically cutting the code required to run applications.

STH right now support only node, but we will do more engines and languages shortly.
<!-- Think about short info - what in the feature -->

The repository contains two templates: `template-ts` witch use TypeScript and `template-js` use JavaScript. Choose one of them and see `Hello Alice example`. There are also sample apps, that you can use and have fun experimenting with them 😎.

## Dictionary

What is **sequence**?
> Chained list of functions with at least one function element.

What is **package**?
> Package is zipped folder witch contains sequence and package.json file.

What is **instance**?
> Executed sequence, in other words instance of the sequence that is running.

What is **package.json**?
> Contains the characteristic of the sequence, and instance in json format. [See how to prepare the package.json file](#1-specify-the-json-file).

## Installation

### Node

Check if you already have Node.js and npm installed, run the following commands in your console:

```bash
node -v
npm -v
```

If your local machine don't have node.js installed download it. Choose the way and follow the instructions.

- [Download binary file to install node.js](https://nodejs.org/en/download/)
- [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)

### Scramjet Interface

STH provide two ways of maintenance, via tools like:​

- **Scramjet Command Line Interface** (CLI): external tool, that allow to manage CSH from terminal (aka Scramjet toolkit);​
- **Application Protocol Interface** (API): will allow to manage CSH via, endpoints using HTTP/1.1;​

The toolkit will help you to make a package, upload and manage it. Toolkit will be available from Command Line Interface (CLI).

Scramjet CLI is and external tool and can be obtained via:

- pre-compiled binary,
- node package manager - [NPM](npm_link).

Download the binary:

```bash
curl 'https://scramjet.sh/install-cli.sh' | bash -s #verify
```

Install via NPM globally:

```bash
npm install -g si
```

### Scramjet Transform Hub

<!-- ToDo: how to install Host and execute it -->

## Prepare the package

### 1. Specify the JSON file

The package.json should be filled as shown below:

- `name` - name of the sequence,
- `main` - file that sequence will be start with,
- `engines` - name of programming language interpreters / runtime engines, that will be installed on the container for e.g. node, python etc.
- `config` - contains sequence, instance setup.

*Example of package.json:*

```json
{​​
  "name": "package-name",​​
  "version": "0.0.1",​​
  "license": "",​​
  "author": "",​​
  "main": "index",​​
  "dependencies": {​​
    "package": "0.0.1"
  },​​
  "engines": {​​
      "node": ">=10",
      "scramjet": ">=0.9"
  },
  "config": {​​
      "": "" //ports, etc.
  }​​
}​

```

> **HINT**: \* Remember to provide the required values: `name`, `main` and `engines`.

### 2. Write a sequence

As introduced previously, the sequence is chained functions. It can take input as an argument and return some output. Then the output can be passed to the following function.

Input, as well as output, is a type of stream. It can transfer data, objects such as an array, JSON, function, etc... <!-- ToDo: Verify --> .

To start with template/sample first go to proper folder:

```bash
cd <template-X> 
# or
cd <sample-app/sample_name>
```

Than install dependencies:

```bash
npm -i
```

<!-- ToDo: link to types in doc, etc.  -->

### 3. Make a package from sequence

The package should also contain all dependencies that are needed to execute the sequence. If that's the case the node_modules folder should be in the `dist/package`.

When you are creating package using node engine with dependencies, remember that your package must contain node_modules folder.

### 3. Run the Transform Hub

<!-- ToDo: how to run Host -->

### 4. Upload the package

Chose the way.

- CLI:

  ```bash
  > si pack <path_to_filename.tar.gz | git_url>
  ```

- API:

  ```bash
    curl -H "Content-Type: application/octet-stream" --data-binary /
    "@<working_directory>/scramjet-sequence-template/.../package_name.tar.gz" /
    http://localhost:8000/api/v1/sequence -v
  ```

> **HINT**: use command `pwd` in project root directory to see the `<working_directory>` path.

## What next?

- [See how to use API](https://github.com/scramjetorg/sth-docs)
- [See how to use CLI](https://github.com/scramjetorg/sth-docs)
