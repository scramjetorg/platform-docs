---
slug: "/platform/quick-start"
title: Platform Quick Start
description: Platform Quick Start
separator: Development Basics
position: 2
type: "platform"
calc: false
order: 2
---

# Platform Quick Start

> **Deploy** and **execute** long running data **programs** that, **​transform** **in real-time** and transport **data** ​between multiple clouds and **on-premise** machines, just as **simply** as starting a program on a laptop, ​with no tedious configurations, VPNs or DevOps work.​

## Log in to Scramjet Cloud Platform Panel

<div className="w-200"></div>

| ![Scramjet Login](../../images/screens/log-in-page.png) |  To try our platform and get **30 days free of charge**, please [sign up to Scramjet Cloud Platform panel here](https://console.scramjet.cloud). <br/> If you are already our user, please log in to the [Scramjet Cloud Platform Panel](https://console.scramjet.cloud/) through your provided mail and password. |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

## Start the journey with Scramjet 🚀

There are only three simple steps!

- [Set up the environment](https://console.scramjet.cloud/settings).
- [Deploy one of the demo Transform Sequence programs](https://docs.scramjet.org/platform/samples).
- Write your own Transform Sequence from [templates](https://docs.scramjet.org/platform/templates) in [JavaScript](https://docs.scramjet.org/platform/development-guide-js), [TypeScript](https://docs.scramjet.org/platform/development-guide-ts) or [Python](https://docs.scramjet.org/platform/development-guide-py)

![Scramjet Cloud Platform welcome page](../../images/screens/cp-welcome-page.png)

## Step 1: Set up the environment

Dear user, in order to use our Scramjet Cloud Platform from a command line in a development environment you'll need a Posix compatible console. You can run WSL2 in Windows, [here's a good guide from Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-11-with-gui-support#2-install-wsl) or bash for Windows with MinGW or Git Bash. On Mac a normal Bash terminal will work just as well.

You will also need Node.js together with its package manager npm. Please refer to installation helper for node and npm in case of any problems. You must have Bash installed while using Windows.

Open the command prompt and follow the steps below to configure Scramjet Cloud Platform (SCP).

1. Check if the SCP Command Line Interface (SCP CLI) is installed by typing `si` into the terminal. If not, install SCP CLI by the command.

   ```bash
   npm i -g @scramjet/cli && si --help
   ```

2. Generate SCP CLI Token.

   [![Token will not be saved. After generation, please store it on your device.](../../images/screens/generate-token.png)](https://console.scramjet.cloud/settings)

   After token generation copy and paste the following CLI command for setting up config.

   ```bash
   si config set json '{"middlewareApiUrl": "https://api.scramjet.cloud/api/v1", "env": "production", "token": "<GeneratedToken>"}'
   ```

3. Check if your setup is working properly by listing your programs (Sequences).

   ```bash
   si seq list
   ```

4. There should be sample program listed. Start it using the command:

   ```bash
   si seq start <sequence-id>
   ```

5. After the program starts the Instance id will be returned.

   Show output data form the running program (instance).

   ```bash
   si inst output <instance-id>
   ```

6. Open the new terminal and type the commend below and hit enter.

   ```bash
   si inst input <instance-id>
   ```

After the command execution, running Instance awaits for data to be passed as stdin. To do that please type into the command prompt, for example "John" and hit enter. In the terminal window where we read the Instance output the message: "Hello John" should appear.
