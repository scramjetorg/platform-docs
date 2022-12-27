---
slug: "/platform/development-guide-py"
title: Python Guide
description: Python Development Guide
separator: Development Guide
position: 3
type: "platform"
order: 4
---

# Python Guide

Packaging a sequence is literally just compressing it into a tar.gz file. If your code doesn't use any dependencies you can simply run `tar czf /path/to/package.tar.gz .` and you're set. We suggest that you use the `si` command for packing, it'll do some extra checks to make sure that your package contains the needed files:

```bash
si seq pack
```

Currently supported runners, node.js and python, will run your program based on the `main` entry in `package.json` - this is clarified below.

What Sequence Package should contains to operate properly?

- index.js / index.py - the main file with user's program logic,
- package.json - manifest file that describes this particular Sequence,
- dependencies\* - preinstalled all dependencies that are needed to execute the Sequence,
- any additional files your code needs (data files, text files, libs and binaries\*\* etc.)

**Dependencies such as `node_modules` in case of JavaScript or `__pypackages__` in Python package.**

**Be aware that native binary may not work well with different architectures, we'll try to provide a solution for this in future releases.**

## The code

In order for a sequence to work correctly your code needs to expose a function that [Scramjet Transform Hub](/platform/transform-hub) or [Scramjet Cloud Platform](/platform) will execute. The function can do anything you want, you can also import any libraries or even perform computations as long as the function is exposed.

The signature of the function is as follows:

```py
def run(context, input, *args):
    return Stream
```

When the program is started by issuing the `si seq start <id> arg1 arg2` command, the function will get invoked with arguments from command line (you can do that via API as well). Mind you, over CLI all arguments will be strings.

## Package.json file

All Scramjet Sequences need a package.json - it's a small file typically used by node.js, but since it's a standard format we currently require you to add this json to the tar.gz packed file.

_Example: Python_

```json
    {​​
        "name": "package-name",​​
        "version": "0.0.1",​​
        "main": "./index.py",​​
        "dependencies": {​​
            "package": "0.0.1"
        },
        "assets": [
            "data.json"
        ],​​
        "engines": {​​
            "python3": "3.9.0"
        }​​
    }
```

## Dependencies

Scramjet Sequences are self-contained programs - meaning that in order to run it we need to receive all the code including the dependencies in the packaged `tar.gz` file. Typically this will mean installing your dependencies in the directory and packing them in the tar.gz file at the same time.

In python you typically [create a file called `requirements.txt`](https://pip.pypa.io/en/stable/reference/requirements-file-format/) and list the dependencies there. Then you need to install them so that they'll be visible to your program:

```bash
pip3 install -r requirements.txt
```

For convienience the program is started with a `__pypackages__` dir on PYTHON_PATH, so you can install your dependencies in there for clearer contents of the package. Then the command line will be:

```bash
pip3 install -t __pypackages__/ -r requirements.txt
```

## Code examples

1. Data Consumer

   ```py
   async def run(context, input):​
        async for id in input:​
            await save_entry_to_db(id)
   ```

2. Data Producer

   ```py
   async def run(context, input):​
        while True:​
            async for result in await get_page_from_api():​
                yield result​
            await asyncio.sleep(1)​
   ```

3. Data Transformer

   ```py
   async def run(context, input):​
        async for id in input:​
            yield await get_db_entry_for_id(id)​
   ```

4. Data Operator​

   ```py
   async def run(context, input):​
        while True:​
            await call_simple_api()​
            await asyncio.sleep(1)​
   ```
