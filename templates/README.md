# Templates :pencil:

We have prepared for you some templates. User templates allow you to apply predefined settings to start building your own applications. Using templates, you can easily set up multiple applications with similar settings.

You can use it as a base for your own samples 👉 [sample template](https://github.com/scramjetorg/scramjet-cloud-docs/tree/main/templates). For this moment we support two variants of template in two programming languages:
 - JavaScript (Node.js) 👉 [template](https://github.com/scramjetorg/scramjet-cloud-docs/tree/main/templates/template-js)
 - TypeScript (ts-node) 👉 [template](https://github.com/scramjetorg/scramjet-cloud-docs/tree/main/templates/template-ts)

In the following sections we will describe both templates' contents and show you how they can be used in your own project.

## Work with JavaScript (Node.js)

This application package template contains two files:

- package.json - this file holds all the important information about the project in plain JSON Object format. It contains human-readable metadata about the project (like the project name and description) as well as functional metadata like the package version number or dependencies required by the application.`package.json` file is one of the basic requirement to have in the root of every project. This is the heart of any Node.js project, used by the application to find its dependencies to install, scripts to run, etc. If you would like to start your project from scratch, without using our js-template, you would need to create a directory and run `npm init` inside. This command would create a `package.json` file for you with all the obligatory properties, for example:

```json
{
  "name": "sample-project",  // the name of the project
  "version": "1.0.0",        // the version of the project
  "description": "",         // a short description of the project
  "main": "index.js",        // the entry point/file of the project
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"  // the script to run tests, you can add more scripts to this object
  },
  "author": "",              // the author of the project
  "license": "ISC"           // the license of the project
}
```

All the properties from the above are mandatory and some are not. Of course more properties can be added to this object if you need them, such as `dependencies` and `devDependencies`. Dependencies are simply all the other modules that your project will use. In template's `package.json` file there is one more property `"repository"`, which shows the repository address, where the source code of the package is located.

- index.js - this is where you should put your code and all the logic of the application you create. It will be the entry point of your application. In our template we introduce you to a very straight forward application, which simply reads input stream and write it to the output stream.

```js
const { PassThrough } = require("stream");

module.exports = function(input) {
    // create a clean output stream
    const out = new PassThrough({encoding: 'utf-8'});

    input.on("data", data => {
       // write some data to the output stream
        out.write(data)
    });
    // return the output stream so it can be consumed (e.g. by CLI client)
    return out;
};
```

This is the minimal signature for a function that takes a stream and returns a stream.

```typescript
<T,U>(inp: ReadableStream<T>, ...args: any[]) => AnyReadable<U>
```

And this is what our template app does, it takes any input that will be sent or piped to it and simply writes it to the output stream. Of course you can add some logic to this function, but to keep the template simple we will just write the data to the output stream.

To see how this template works you can run it with a few simple commands:

### **open 3 terminals**
### in the 1️⃣ terminal: 
- run command `scramjet-transform-hub`
### in the 2️⃣ terminal:
- `cd templates`
- `si pack template-js`
- `si seq send template-js.tar.gz`
- `si sequence start <sequence-id>`
- `si instance output <instance-id>`
### in the 3️⃣ terminal:
The command below will run the app in the background. The app generates random numbers from 1 to 10 and write them to instance's `/input` endpoint (to instance which will be run on sth). In this way we are sending an input stream that will be consumed by our template app.

- `node ./tools/stream-gen-tool/numbers-gen.js <instance-id>`

### **expected output:**

![template1](../images/template1.png)

What you can see in the attached image is 3 terminals that illustrates the template's workflow:

Terminal :one: shows the logs of running `scramjet-transform-hub` process. 

Terminal :two: shows the output of the program that we launched using STH CLI. 

Terminal :three: shows the output of the `node` command that runs the app which generates random numbers and sends them to the instances's input..


## Work with TypeScript (ts-node)