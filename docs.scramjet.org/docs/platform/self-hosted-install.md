---
slug: "/platform/self-hosted-installation"
title: "Self Hosted Install"
description: "Self Hosted Hub Install"
separator: Self Hosted
position: 5
type: "platform"
order: 8
---

# Self Hosted Hub Installation

## Prepare environment

In order to install Scramjet Transform Hub, please follow these 3 steps:

1. Get Linux machine (local UNIX/Linux OS, cloud VM etc)
2. Install Docker on this Linux machine ([official Docker instructions are here](https://docs.docker.com/get-docker/))
3. Install npm on this machine ([official instructions are here](https://nodejs.org/)). Currently we recommend Node.js version 16.x LTS.

## Install STH

Open one Linux terminal window and issue following commands:

- **Install Scramjet Transform Hub and STH CLI:**

```bash
npm i -g @scramjet/sth @scramjet/cli
```

- **Run STH:**

```bash
scramjet-transform-hub
```

> 💡 **HINT:** There is also an alias for running STH: `sth`

More detailed installation instructions can be found in our [STH GitHub repository](https://github.com/scramjetorg/transform-hub/tree/main#installation-clamp).

## Run your first Sequence

### Review the Sequence package

Before running the Sequence let's have a quick look what's inside the Sequence package.

We have prepared for you a simple JavaScript sample Sequence called "hello-snowman". This Sequence's code is available in our [Scramjet-cloud-docs repository](https://github.com/scramjetorg/scramjet-cloud-docs/tree/main/samples/hello-snowman) on GitHub. In this directory you will find two files:

- `package.json` - manifest file that describes this particular Sequence
- `index.js` - the main file containing user's program logic.

This particular application is written in plain JavaScript to simplify this example. However, you can also write your Sequences in TypeScript and build them before packaging and sending Sequence to STH.

> In the [Templates](/platform/templates) section you will find a more specific descriptions of the particular file's content.

There is no need to change anything in our `hello-snowman` Sequence for a first run. Let's move to the next step.

### Run the Sequence

There are 5 steps to follow in order to deploy the example Sequence:

<details>
<summary>
    <strong>1. Pack your Sequence into a <code>*.tar.gz</code> package</strong>
</summary>

Every Sequence app needs to be packaged (compressed) before sending to STH. Package is a simple TAR archive and our STH CLI has a special command to pack an app directory into a Sequence tarball.

> **💡 Note:** any time, you can display STH CLI help by issuing terminal command `si help` (for general help). For more information on a specific command, type help + command-name (ie. `si sequence help`)

Please open new terminal window (and keep the first one open with STH running). Then issue following commands in the root directory of this repository:
Pack directory `hello-snowman` into archive `hello-sequence.tar.gz`:

```bash
si pack ./samples/hello-snowman/ -o ./samples/hello-snowman.tar.gz
```

There is no output shown in the terminal but you can verify with `ls` that tarball package is created inside `samples` directory. Please move to the next step.

</details>

<details>
<summary>
    <strong>2. Send the Sequence package</strong>
</summary>

Send `hello-snowman.tar.gz` to the running STH (default localhost API endpoint will be used by the CLI send command) by issuing following command:

```bash
si sequence send ./samples/hello-snowman.tar.gz
```

> 💡 **Note:** if you receive reply: **Request ok: <http://127.0.0.1:8000/api/v1/sequence> status: 422 Unprocessable Entity**, it means that STH Docker images are not yet pulled from DockerHub. Please wait 2-3 minutes and try to issue `si sequence send` command again. We are working on fixing this issue in the next STH release. Also, if you keep receiving docker errors you can start sth without docker: `scramjet-transform-hub --no-docker`

> If you encounter any problems or issues while using our platform, please visit our **[Troubleshooting](https://github.com/scramjetorg/transform-hub#troubleshooting-collision)** section, where some of the problems are already known and described. You are also very welcome to [log an issue/bug](https://github.com/scramjetorg/transform-hub/issues/new/choose) on GitHub any time.

The output will look similar to this one:

```bash
Request ok: http://127.0.0.1:8000/api/v1/sequence status: 202 Accepted
SequenceClient {
  _id: 'cf775cc1-105b-473d-b929-6885a0c2182c',
  host: HostClient {
    apiBase: 'http://127.0.0.1:8000/api/v1',
    client: ClientUtils {
      apiBase: 'http://127.0.0.1:8000/api/v1',
      log: [Object]
    }
  },
  sequenceURL: 'sequence/cf775cc1-105b-473d-b929-6885a0c2182c'
}
```

Now we have uploaded Sequence to STH. Each time a Sequence is being uploaded, a random ID (GUID) number is assigned to it, in this case our Sequence ID is:

`_id: 'cf775cc1-105b-473d-b929-6885a0c2182c'`

STH also exposes REST API endpoint for each Sequence and this is also described in this response.
Exposed Sequence ID allows us to move to the next step where we will start the Sequence.

</details>

<details>
<summary>
    <strong>3. Run the Sequence</strong>
</summary>

We can now use Sequence ID to start uploaded Sequence. The command is `si seq start <sequence_id>`. To make our users life easier we provided an alias for Sequence ID: `-` thanks to which you can skip copy&paste ID, and simply type: `si seq start -`. This CLI functionality replaces `-` argument with the last item the user interacted with or `select` ed.

You can also pass arbitrary number of parameters by providing them after `<sequence_id>`, in case of our `hello-snowman` no parameters are used. Use the following command to start the Sequence:

```bash
si sequence start cf775cc1-105b-473d-b929-6885a0c2182c
```

or

```bash
si sequence start -
```

The output will look similar to this one:

```bash
Request ok: http://127.0.0.1:8000/api/v1/sequence/cf775cc1-105b-473d-b929-6885a0c2182c/start status: 200 OK
InstanceClient {
  host: HostClient {
    apiBase: 'http://127.0.0.1:8000/api/v1',
    client: ClientUtils {
      apiBase: 'http://127.0.0.1:8000/api/v1',
      log: [Object]
    }
  },
  _id: 'e70222d1-acfc-4e00-b046-4a3a9481c53b',
  instanceURL: 'instance/e70222d1-acfc-4e00-b046-4a3a9481c53b'
}
```

Once Sequence is up and running, it becomes an Instance. The Instance also receives its own unique ID (GUID).

In this case Instance ID is: `id: 'e70222d1-acfc-4e00-b046-4a3a9481c53b'`.
Of course, Sequences can be run multiple times. Each run will create a separate Instance with a distinct Instance ID.

</details>

<details>
<summary>
    <strong>4. Send data to the Sequence</strong>
</summary>

We want to make your life easier and for this very example, we have prepared a special Node.js app that will generate a stream of simple messages and send them to our running Instance of `hello-snowman`.

For fun, our stream generator will send simple text messages containing temperature readings from artificial weather station. Temperature value will be generated randomly in range of <-50,50> degrees Celsius.
Our `hello-snowman` app will read and interpret these messages and will inform us about state of our Snowman:

- if temperature will be 0 or below, Sequence will return message: `Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️`
- in the other case (temperature above 0 degrees), Sequence will return message: `Snowman ⛄ is melting! 🥵`

To run this app, please execute the following command from the root of our directory
`node ./tools/stream-gen-tool/stream-gen.js <instance_id>`. In our case this would look like this:

```bash
node ./tools/stream-gen-tool/stream-gen.js e70222d1-acfc-4e00-b046-4a3a9481c53b
```

The output will look similar to this one:

<span className="small">

```js
----------------------------------------
Message# 1 | Temperature measure
INPUT | -16
OUTPUT| Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️

---

Message# 2 | Temperature measure
INPUT | 49
OUTPUT| Snowman ⛄ is melting! 🥵

---

Message# 3 | Temperature measure
INPUT | 16
OUTPUT| Snowman ⛄ is melting! 🥵

---

Message# 4 | Temperature measure
INPUT | -46
OUTPUT| Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️

---

```

</span>

Our Sequence generator app does two things here:

- Sends stream of messages; each one containing number with temperature value
- Reads output from STH API that is generated by our `hello-snowman` Sequences

Separately, you can also open a new terminal window and see log of this particular instance with command `si instance log <instance_id>`. In our case this would be:

```bash
si instance log e70222d1-acfc-4e00-b046-4a3a9481c53b
```

The sample output will be similar to this one:

```bash
...
2021-08-09T04:29:39.790Z log (object:Runner) Input message <Buffer 32 30>
2021-08-09T04:29:40.791Z log (object:Runner) Input message <Buffer 2d 34>
2021-08-09T04:29:41.792Z log (object:Runner) Input message <Buffer 33 33>
2021-08-09T04:29:42.798Z log (object:Runner) Input message <Buffer 2d 34 35>
2021-08-09T04:29:43.801Z log (object:Runner) Input message <Buffer 2d 33 36>
...
```

</details>

<details>
<summary>
    <strong>5. Get the Instance output</strong>
</summary>

Once `hello-snowman` Sequence is up and running we can check the output that the Instance produces, we have also sent some input data to this Instance to consume. To see what the program does to this data use the command below, it will show you the Instance output after data transformation. Open one more terminal and paste:

```bash
si inst output e70222d1-acfc-4e00-b046-4a3a9481c53b
```

or by using alias

```bash
si inst output -
```

This is an example output that you should get:

```bash
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is melting! 🥵
Snowman ⛄ is melting! 🥵
Snowman ⛄ is melting! 🥵
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is melting! 🥵
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is melting! 🥵
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
Snowman ⛄ is melting! 🥵
Snowman ⛄ is freezing 🥶 Winter is coming ❄️ ❄️ ❄️ ❄️ ❄️
```

</details>

> 🎉 Congratulations! 🥳 You have run your first Scramjet Transform Hub Sequence!
