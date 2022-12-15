---
slug: "/platform/api-reference"
title: "API Reference"
description: "API Reference"
separator: Interface Reference
position: 4
type: "platform"
order: 2
---

# Application Protocol Interface (API) Reference

- [Introduction](#introduction)
- [Space operations](#hub-operations)
- [Hub operations](#hub-operations)
- [Sequence operations](#sequence-operations)
- [Instance operations](#instance-operations)
- [Topics operation on data](#topics-operation-on-data)

---

## Introduction

Scramjet Cloud Platform API supports the following methods:

1. <strong class="get">[ GET ]</strong> - all operations requesting data from the Scramjet Cloud Platform (SCP),
2. <strong class="post">[ POST ]</strong> - creating new Hub, Sequence, Sequence Instances or for messaging and streaming data to a Sequence,
3. <strong class="put">[ PUT ]</strong> - updating existing Sequences or Instances,
4. <strong class="delete">[ DELETE ]</strong> - removeing operations eg. Hub or Sequence.

**API Base URL examples**

```md
# Self Hosted Hub

http://127.0.0.1:11000/api/v1/

# Scramjet Cloud Platform Space

https://api.beta.scramjet.cloud/api/v1/space/:id/api/v1

# Scramjet Cloud Platform Hub

https://api.beta.scramjet.cloud/api/v1/space/:id/api/v1/sth/:id/api/v1/
```

> Please remember to provide content-type in Header for POST and DELETE methods.

**Example cURL**

```bash
curl -X POST http://127.0.0.1:11000/api/v1/sequence/:id/start -H 'content-type: application/json'
```

> To communicate with the Cloud Platform API, please remember to provide authorization Bearer Token in Headers.

**Example cURL**

```bash
curl -X GET https://api.beta.scramjet.cloud/api/v1/space/:id/api/v1/list -H 'accept: */*' -H 'authorization: Bearer {Token}' -H 'content-type: application/json'
```

**No token provided or wrong token response**

```json
{
  "message": "Forbidden"
}
```

## Space operations

**API Base SCP Space URL**

```bash
https://api.beta.scramjet.cloud/api/v1/space/:id/api/v1
```

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/version</code> <small>- show space version</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "service": "@scramjet/manager",
  "apiVersion": "v1",
  "version": "0.22.0",
  "build": "8b39d26"
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/load</code> <small>- show space load info</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "avgLoad": 0.15,
  "currentLoad": 10.34503968983302,
  "memFree": 27063754752,
  "memUsed": 16267390976,
  "fsSize": [
    {
      "fs": "/dev/mapper/ubuntu--vg-ubuntu--lv",
      "type": "ext4",
      "size": 51716325376,
      "used": 11687919616,
      "available": 37864574976,
      "use": 23.59,
      "mount": "/etc/hosts"
    }
  ]
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/list</code> <small>- list space Hubs</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
[
  {
    "id": "sth-6cd78f999b-ntdtw", 
    "info": {
      "created": "2022-04-07T11:42:59.185Z",
      "lastConnected": "2022-04-07T11:42:59.187Z"
    },
    "healthy": true,
    "isConnectionActive": true
  }
]
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/sequences</code> <small>- show all Sequences on Space</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
["a54675bd-fed8-4b67-9c3e-47c3302083a7", "00539df4-d0e2-4190-8ea9-52a2a22c3122"]
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instances</code> <small>- show list of Instances on Space</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
[
  [
    ["66e0e68f-7ad8-4c90-9233-23748c5f2445"],
    ["bde7e8a1-0aa6-41ae-b922-f29eaf7dbe26"]
  ]
]
```

</details>


<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/topics</code> <small>- list Space Topics</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>
```json
[
  {
    "name": "messages-slack",
    "contentType": "application/json",
    "actors": [
      {
        "role": "consumer",
        "type": "host",
        "stream": true,
        "hostId": "sth-1",
        "retired": false
      },
      {
        "role": "consumer",
        "type": "host",
        "stream": true,
        "hostId": "sth-0",
        "retired": false
      }
    ]
  },
  {
    "name": "messages-slack-inbound",
    "contentType": "application/json",
    "actors": [
      {
        "role": "provider",
        "type": "host",
        "stream": true,
        "hostId": "sth-1",
        "retired": false
      },
      {
        "role": "consumer",
        "type": "host",
        "stream": true,
        "hostId": "sth-1",
        "retired": false
      }
    ]
  }
]
```

</details>

<details>
<summary>
    <strong className="post">[ POST ]</strong>  <code>&#123;API Base&#125;/topic/:name​</code> <small>- sends data to the Topic, if it does not exist, the Topic is created</small>
</summary>

**Parameters**

<small>No parameters</small>

**Request Headers**

<small>Content-type: application/x-ndjson</small>

**Responses**

<small>Status: <code>200</code> - Success - when data to topic is sent with the header indicating the end of data</small>
<small>Status: <code>202</code> - accepted - when data to topic is sent without the header indicating the end of data (default)</small>

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/topic/:name​</code> <small>- get data from the Topic</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Topic data stream.</small>

<small>Status: <code>200</code> - Success</small>

```json
{
  "source": "Twitter",
  "id": "850006245121695778",
  "content": "Natural wetlands make up ~30% of global total CH4 emissions",
  "user": {
    "id": 1234994945,
    "name": "Climate Change Conference",
    "screen_name": "Climate Change"
  }
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/log</code> <small>- show logs form Space</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Content-type: application/octet-stream</small>

<small>Status: <code>200</code> - Success</small>

```bash
sth-0: {"level":"TRACE","msg":"Sequence finished with success","ts":1661330645068,"from":"CSIController","Host":{},"data":[0]}
sth-0: {"level":"INFO","msg":"Cleanup completed","ts":1661330645070,"from":"CSIController","Host":{}}
sth-0: {"level":"TRACE","msg":"Instance stopped.","ts":1661330645070,"from":"CSIController","Host":{}}
sth-0: {"level":"TRACE","msg":"Finalizing...","ts":1661330645071,"from":"CSIController","Host":{}}
sth-0: {"level":"DEBUG","msg":"Request","ts":1661330786491,"from":"Host","Host":{},"data":["date: 2022-08-24T08:46:26.491Z, method: GET, url: /api/v1/instances, status: 200"]}
sth-0: {"level":"DEBUG","msg":"Request","ts":1661330786642,"from":"Host","Host":{},"data":["date: 2022-08-24T08:46:26.641Z, method: GET, url: /api/v1/sequences, status: 200"]}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/sth/:id/info</code> <small>- show the Hub info</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "id": "sth-0",
  "info": {
    "created": "2022-07-08T08:54:53.394Z",
    "lastConnected": "2022-07-18T15:10:37.567Z",
    "lastDisconnected": "2022-07-18T15:10:37.323Z"
  },
  "healthy": true,
  "isConnectionActive": true
}
```

</details>

## Hub operations

**API Base SCP Hub URL**

```bash
https://api.beta.scramjet.cloud/api/v1/space/:id/api/v1/sth/:id/api/v1/
```

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/version</code> <small>- show the Hub version</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "service": "@scramjet/host",
  "apiVersion": "v1",
  "version": "0.24.2",
  "build": "source"
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/config</code> <small>- show the Hub config</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "logLevel": "trace",
  "logColors": true,
  "cpmUrl": "mm-api.org-5fa96f7c-058h-9o59-8645-y7d4b0af2717.svc.cluster.local:11000",
  "cpmId": "org-5fa96f7c-058h-9o59-8645-y7d4b0af2717-manager",
  "docker": {
    "prerunner": {
      "image": "scramjetorg/pre-runner:0.24.2",
      "maxMem": 128
    },
    "runner": {
      "image": "",
      "maxMem": 512,
      "exposePortsRange": [30000, 32767],
      "hostIp": "0.0.0.0"
    },
    "runnerImages": {
      "python3": "scramjetorg/runner-py:0.24.2",
      "node": "scramjetorg/runner:0.24.2"
    }
  },
  "identifyExisting": false,
  "host": {
    "hostname": "0.0.0.0",
    "port": 8000,
    "apiBase": "/api/v1",
    "instancesServerPort": 8001,
    "infoFilePath": "/tmp/sth-id.json",
    "id": "sth-0"
  },
  "instanceRequirements": {
    "freeMem": 256,
    "cpuLoad": 10,
    "freeSpace": 128
  },
  "safeOperationLimit": 512,
  "instanceAdapterExitDelay": 9000,
  "runtimeAdapter": "kubernetes",
  "startupConfig": "",
  "exitWithLastInstance": false,
  "heartBeatInterval": 10000,
  "kubernetes": {
    "namespace": "org-5fa96f7c-058h-9o59-8645-y7d4b0af2717",
    "sthPodHost": "sth-0.msth.org-5fa96f7c-058h-9o59-8645-y7d4b0af2717.svc.cluster.local",
    "runnerImages": {
      "python3": "scramjetorg/runner-py:0.24.2",
      "node": "scramjetorg/runner:0.24.2"
    },
    "timeout": "0",
    "runnerResourcesRequestsCpu": "0.01",
    "runnerResourcesRequestsMemory": "8M",
    "runnerResourcesLimitsCpu": "0.565",
    "runnerResourcesLimitsMemory": "1024MB"
  }
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/load-check</code> <small>- monitor CPU, memory and disk usage metrics on the Hub machine</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "avgLoad": 0.04,
  "currentLoad": 2.34338747099768,
  "memFree": 26667257856,
  "memUsed": 16138383360,
  "fsSize": [
    {
      "fs": "/dev/mapper/ubuntu--vg-ubuntu--lv",
      "type": "ext4",
      "size": 51716325376,
      "used": 11699834880,
      "available": 37852659712,
      "use": 23.61,
      "mount": "/etc/hosts"
    }
  ]
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/log</code> <small>- show logs form Hub</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Content-type: application/octet-stream</small>

<small>Status: <code>200</code> - Success</small>

```bash
{"level":"TRACE","msg":"Sequence finished with success","ts":1661330645068,"from":"CSIController","Host":{},"data":[0]}
{"level":"INFO","msg":"Cleanup completed","ts":1661330645070,"from":"CSIController","Host":{}}
{"level":"TRACE","msg":"Instance stopped.","ts":1661330645070,"from":"CSIController","Host":{}}
{"level":"TRACE","msg":"Finalizing...","ts":1661330645071,"from":"CSIController","Host":{}}
{"level":"DEBUG","msg":"Request","ts":1661330786491,"from":"Host","Host":{},"data":["date: 2022-08-24T08:46:26.491Z, method: GET, url: /api/v1/instances, status: 200"]}
{"level":"DEBUG","msg":"Request","ts":1661330786642,"from":"Host","Host":{},"data":["date: 2022-08-24T08:46:26.641Z, method: GET, url: /api/v1/sequences, status: 200"]}
```

</details>

---

## Sequence operations

**API Base SCP Hub URL**

```bash
https://api.beta.scramjet.cloud/api/v1/space/:id/api/v1/sth/:id/api/v1/
```

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/sequences</code> <small>- show all Sequences saved on the Hub</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
[
  {
    "id": "a54675bd-fed8-4b67-9c3e-47c3302083a7",
    "config": {
      "type": "kubernetes",
      "entrypointPath": "index.js",
      "version": "0.13.1",
      "name": "@scramjet/simple-counter-js",
      "id": "a54675bd-fed8-4b67-9c3e-47c3302083a7",
      "description": "Simple counter",
      "author": "Scramjet",
      "keywords": ["counter"],
      "args": [ 1, { "magicKey": "'Lorem'" }, "Ipsum" ],
      "repository": "github:scramjetorg/transform-hub",
      "sequenceDir": "/root/.scramjet_k8s_sequences/a54675bd-fed8-4b67-9c3e-47c3302083a7",
      "engines": {
        "node": ">=14"
      }
    },
    "instances": []
  },
  {
    "id": "00539df4-d0e2-4190-8ea9-52a2a22c3122",
    "config": {
      "type": "kubernetes",
      "entrypointPath": "./index",
      "version": "0.13.1",
      "name": "@scramjet/hello",
      "id": "00539df4-d0e2-4190-8ea9-52a2a22c3122",
      "description": "Hello world",
      "author": "Scramjet",
      "keywords": ["hello", "streaming", "start"],
      "repository": {
        "type": "git",
        "url": "https://github.com/scramjetorg/transform-hub.git"
      }
      "sequenceDir": "/root/.scramjet_k8s_sequences/00539df4-d0e2-4190-8ea9-52a2a22c3122",
      "engines": {}
    },
    "instances": ["bde7e8a1-0aa6-41ae-b922-f29eaf7dbe26"]
  }
]
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/sequence/:id</code> <small>- show sequence details</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "id": "4f63ca71-74fd-481e-accd-1fd9e20fd09f",
  "config": {
    "type": "kubernetes",
    "entrypointPath": "index.js",
    "version": "0.22.0",
    "name": "@scramjet/hello",
    "id": "4f63ca71-74fd-481e-accd-1fd9e20fd09f",
    "sequenceDir": "/root/.scramjet_k8s_sequences/4f63ca71-74fd-481e-accd-1fd9e20fd09f",
    "engines": {
      "node": ">=10"
    }
  },
  "instances": [
    "b4a1243f-1747-4c97-8b35-ca9d57ead48c"
  ]
}
```

**Responses**

<small>Status <code>404</code> - Not Found</small>

```json
{
  "error": "Sequence 74bb441e-a456-4f6e-a66b-3026b9543a35 not found"
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/sequence/:id/instances</code> <small>- show sequence instances</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
[
  "e70b87a1-7c53-4317-b720-66e4e2b5af04",
  "2a9e9fb9-bdc8-4638-b8a1-0ad4e71eee70"
]
```

**Responses**

<small>Status <code>404</code> - Not Found</small>

```json
{
  "error": "Sequence 74bb441e-a456-4f6e-a66b-3026b9543a35 not found"
}
```

</details>

<details>
<summary>
    <strong className="post">[ POST ]</strong> <code>&#123;API Base&#125;/sequence</code> <small>- add new Sequence</small>
</summary>

**Parameters**

| Name      | Description                         | Type   | Required |
| --------- | ----------------------------------- | ------ | -------- |
| file      | compressed package in tar.gz format | binary | yes      |
| appConfig | additional package.json config file | json   | no       |
| x-name    | alias name for sequence             | header | no       |

**Responses**

<small>Status: <code>200</code> - OK</small>

```json
{
  "id": "2c3068e5-7c74-45bb-a017-1979c41fc6d0" // sequence id
}
```

<small>Status <code>405</code> - Method Not Allowed</small>

```json
{
  "error": "Sequence with name <sequenceName> already exist"
}
```
<small>Status <code>422</code> - Unprocessable Entity</small>

```json
{
  "error": Error | string | unknown 
}
```
</details>

<details>
<summary>
    <strong className="put">[ PUT ]</strong> <code>&#123;API Base&#125;/sequence/:id_name</code> <small>- update exising Sequence</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - OK</small>

```json
{
  "id": "2c3068e5-7c74-45bb-a017-1979c41fc6d0" // sequence id
}
```

<small>Status <code>404</code> - Not Found</small>

```json
{
  "error": "Sequence with name <:id_name> not found"
}
```

<small>Status <code>409</code> - Conflict</small>

```json
{
  "error": "Sequence with name <sequenceName> already exists"
}

<small>Status <code>422</code> - Unprocessable Entity</small>

```json
{
  "error": Error | string | unknown 
}
```


</details>

<details>
<summary>
    <strong className="post">[ POST ]</strong> <code>&#123;API Base&#125;/sequence/:id/start</code> <small>- start chosen Sequence</small>
</summary>

**Parameters**

| Name      | Description                                           | Type | Required |
| --------- | ----------------------------------------------------- | ---- | -------- |
| appConfig | additional package.json config file                   | json | no       |
| args      | additional arguments that instance should starts with | json | no       |

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "message": "Sequence c9803353-f44e-4e75-8b2e-11a8b07924c7 starting"
  "id": "c9803353-f44e-4e75-8b2e-11a8b07924c7",
}
```

<small>Status <code>400</code> - Bad request</small>

```json
{
  "error": Error | string | unknown
}
```

<small>Status <code>404</code> - Not Found</small>

```json
{
  "error": "Sequence c9803353-f44e-4e75-8b2e-11a8b07924c7 not found"
}
```

<small>Status <code>507</code> - Insufficient Space on Resource</small>

```json
{
  "error": "Insufficient Space on Resource"
}
```

</details>

<details>
<summary>
    <strong className="delete">[ DELETE ]</strong> <code>&#123;API Base&#125;/sequence/:id</code> <small>- delete a Sequence by id</small>
</summary>
Note: If Instance is started from a given Sequence, Sequence can not be removed

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "id": "a54675bd-fed8-4b67-9c3e-47c3302083a7"
}
```

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Sequence a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

<small>Status <code>409</code> - Conflict - the instance is still running</small>

```json
{
  "error": "Can't remove- Sequence in use"
}
```

<small>Status <code>500</code> - Internal server error</small>

```json
{
  "error": "Error removing Sequence: <error>"
}
```

</details>

---

## Instance operations

**API Base SCP Hub URL**

```bash
https://api.beta.scramjet.cloud/api/v1/space/:id/api/v1/sth/:id/api/v1/
```

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instances</code> <small>- show list of Instances running on the Hub</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
[
  {
    "id": "bde7e8a1-0aa6-41ae-b922-f29eaf7dbe26",
    "appConfig": {},
    "sequence": "00539df4-d0e2-4190-8ea9-52a2a22c3122",
    "created": "2022-07-19T21:07:11.043Z",
    "started": "2022-07-19T21:07:13.668Z",
    "status": "running"
  },
  {
    "id": "217ff6c1-2054-46e4-8f69-d5151cd313a7",
    "appConfig": {},
    "sequence": "00539df4-d0e2-4190-8ea9-52a2a22c3122",
    "created": "2022-07-19T22:08:46.577Z",
    "started": "2022-07-19T22:08:49.121Z",
    "status": "running"
  },
  {
    "id": "fe314445-ccd7-41f5-bff4-37163cd21940",
    "appConfig": {},
    "sequence": "a54675bd-fed8-4b67-9c3e-47c3302083a7",
    "created": "2022-07-19T22:09:36.852Z",
    "started": "2022-07-19T22:09:39.444Z",
    "status": "running"
  }
]
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong> <code>&#123;API Base&#125;/instance/:id</code> <small>- show data of chosen Instance</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status <code>200</code> - Success </small>

```json
{
  "id": "bde7e8a1-0aa6-41ae-b922-f29eaf7dbe26",
  "appConfig": {},
  "sequence": "00539df4-d0e2-4190-8ea9-52a2a22c3122",
  "created": "2022-07-19T21:07:11.043Z",
  "started": "2022-07-19T21:07:13.668Z",
  "status": "running"
}
```
<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>

<details>
<summary>
    <strong className="post">[ POST ]</strong> <code>&#123;API Base&#125;/instance/:id/_stop</code> <small>- end instance gracefully and prolong operations or not for task completion​</small>
</summary>

**Parameters**

| Name             | Description                                                                     | Type    | Required |
| ---------------- | ------------------------------------------------------------------------------- | ------- | -------- |
| timeout          | The number of milliseconds before the Instance will be killed. Default: 7000ms. | number  | no       |
| canCallKeepalive | If set to true, the instance will prolong the running. Default: false.          | boolean | no       |

**Responses**

<small>Status <code>202</code> - Accepted </small>

```json
{
  "id": "178ed84a-78eb-489e-b3be-870b201ffe1f",
  "appConfig": {},
  "sequenceArgs": [],
  "sequence": "ce5538ac-944b-4e6c-9e0b-46b1e36ad500",
  "sequenceInfo": {
    "id": "ce5538ac-944b-4e6c-9e0b-46b1e36ad500",
    "config": {
      "type": "docker",
      "container": {
        "image": "scramjetorg/runner:0.28.1",
        "maxMem": 512,
        "exposePortsRange": [
          30000,
          32767
        ],
        "hostIp": "0.0.0.0"
      },
      "name": "@scramjet/hexdump",
      "version": "0.22.0",
      "engines": {
        "node": ">=10"
      },
      "config": {},
      "sequenceDir": "/package",
      "entrypointPath": "index.js",
      "id": "ce5538ac-944b-4e6c-9e0b-46b1e36ad500",
      "description": "Application to produce hexdump from input",
      "author": "Eryk <open-source@scramjet.org>",
      "keywords": [
        "dump",
        "hex",
        "streaming"
      ],
      "args": [ 1, { "magicKey": "'Lorem'" }, "Ipsum" ],
      "repository": {
        "type": "git",
        "url": "https://github.com/scramjetorg/transform-hub.git"
      },
    }
  },
  "created": "2022-09-06T10:16:23.456Z",
  "started": "2022-09-06T10:16:24.383Z",
  "status": "stopping"
}
```

<small>Status <code>400</code> - Bad request </small>

```json
{
  "error": "Invalid timeout format"
}
```

```json
{
  "error":  "Invalid canCallKeepalive format"
}
```

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>

<details>
<summary>
    <strong className="post">[ POST ]</strong>  <code>&#123;API Base&#125;/instance/:id/_kill</code> <small>- end instance gracefully waiting for unfinished tasks</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>202</code> - accepted</small>

```json
{
  "id": "3e9038ce-1144-4b5b-881b-7bc0f31271df",
  "appConfig": {},
  "sequenceArgs": [],
  "sequence": "2fa97993-72eb-43bc-b78b-59e723de5eea",
  "sequenceInfo": {
    "id": "2fa97993-72eb-43bc-b78b-59e723de5eea",
    "config": {
      "type": "docker",
      "container": {
        "image": "scramjetorg/runner:0.28.1",
        "maxMem": 512,
        "exposePortsRange": [
          30000,
          32767
        ],
        "hostIp": "0.0.0.0"
      },
      "name": "@scramjet/hexdump",
      "version": "0.22.0",
      "engines": {
        "node": ">=10"
      },
      "config": {},
      "sequenceDir": "/package",
      "entrypointPath": "index.js",
      "id": "2fa97993-72eb-43bc-b78b-59e723de5eea",
      "description": "Application to produce hexdump from input",
      "author": "Eryk <open-source@scramjet.org>",
      "keywords": [
        "dump",
        "hex",
        "streaming"
      ],
      "args": [ 1, { "magicKey": "'Lorem'" }, "Ipsum" ],
      "repository": {
        "type": "git",
        "url": "https://github.com/scramjetorg/transform-hub.git"
      }
    }
  },
  "created": "2022-09-06T10:31:57.821Z",
  "started": "2022-09-06T10:31:58.756Z",
  "status": "killing"
}
```

<small>Status <code>400</code> - Bad request </small>

```json
{
  "error": "Invalid removeImmediately format"
}
```

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>
<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instance/:id/health</code> <small>- check status about Instance health</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

```json
{
  "healthy": true
}
```

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>

### Events

Cloud Platform allows interaction (communication) with an instance by sending events with or without any information defined in the object​. Furthermore, it lets providing and receiving streams with all kinds of data files.

Event contains `<eventName>`, `<handler>` with optional `<message>` of any type: string, num, json obj, array, etc..

<details>
<summary>
    <strong className="post">[ POST ]</strong>  <code>&#123;API Base&#125;/instance/:id/_event</code> <small>- send event to the Instance</small>
</summary>

**Parameters**

| Name        | Type     | Description                  | Required |
| :---------- | :------- | ---------------------------- | -------- |
| `eventName` | `string` | Name of an event             | true     |
| `message`   | `string` | JSON formatted event payload | false    |

**Responses**

<small>Content-type: application/octet-stream</small>

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```



</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instance/:id/event</code> <small>- get the data stream with the events from the Instance</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Content-type: application/octet-stream</small>

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```


</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instance/:id/once</code> <small>- get the last event sent by the Instance</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Content-type: application/octet-stream</small>


<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>

### Input/Output (I/O)

The data can be sent to the input stream of the Instance where it can be consumed. Everything the Instance writes to its output stream also can be consumed through the endpoint.

<details>
<summary>
    <strong className="post">[ POST ]</strong>  <code>&#123;API Base&#125;/instance/:id/input</code> <small>- send data to the Instance</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

<small>Status <code>405</code> - Method Not Allowed. This status code is returned when the Instance expects the input to be provided from the Topic API. </small>

```json
{
  "error": "Input provided in other way"
}
```

<small>Status <code>406</code> - Not Acceptable. Expected content-type in request header </small>

```json
{
  "error": "Content-Type must be defined"
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instance/:id/output</code> <small>- get the output stream from the Instance</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Content-type: application/octet-stream</small>

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>

<details>
<summary>
    <strong className="post">[ POST ]</strong>  <code>&#123;API Base&#125;/instance/:id/stdin​</code> <small>- process.stdin</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instance/:id/stdout</code> <small>- process.stdout</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Content-type: application/octet-stream</small>

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instance/:id/stderr</code> <small>- process.stderr</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Content-type: application/octet-stream</small>

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/instance/:id/log</code> <small>- stream all instance logs</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>

<small>Content-type: application/octet-stream</small>

```bash
2021-11-19T16:12:22.948Z log (Sequence) 42
2021-11-19T16:12:23.949Z log (Sequence) 41
2021-11-19T16:12:24.950Z log (Sequence) 40
2021-11-19T16:12:25.951Z log (Sequence) 39
2021-11-19T16:12:26.952Z log (Sequence) 38
2021-11-19T16:12:27.952Z log (Sequence) 37
2021-11-19T16:12:28.953Z log (Sequence) 36
2021-11-19T16:12:29.953Z log (Sequence) 35
```

<small>Status <code>404</code> - Not found </small>

```json
{
  "error": "Instance a54675bd-fed8-4b67-9c3e-47c3302083a7 not found"
}
```


</details>

---

## Topics operation on data

**API Base SCP Hub URL**

```bash
https://api.beta.scramjet.cloud/api/v1/space/:id/api/v1/sth/:id/api/v1/
```

**Type of Headers**

- "x-end-stream" - close topic stream [optional, boolean]. If x-end-stream header value is true, the topic stream is closed after processing this request. The default value is false.

- "content-type" - specify stream content type [optional, boolean]. The content-type header specifies data type of this topic.
  The recognized values are: text/x-ndjson, application/x-ndjson, application/x-ndjson, text/plain, application/octet-stream. The default value is application/x-ndjson.​

<details>
<summary>
    <strong className="post">[ POST ]</strong>  <code>&#123;API Base&#125;/topic/:name​</code> <small>- sends data to the Topic, if it does not exist, the Topic is created</small>
</summary>

**Parameters**

<small>No parameters</small>

**Request Headers**

<small>Content-type: application/x-ndjson</small>

**Responses**

<small>Status: <code>200</code> - Success - when data to topic is sent with the header indicating the end of data</small>
<small>Status: <code>202</code> - accepted - when data to topic is sent without the header indicating the end of data (default)</small>

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/topic/:name​</code> <small>- get data from the Topic</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Topic data stream.</small>

<small>Status: <code>200</code> - Success</small>

```json
{
  "source": "Twitter",
  "id": "850006245121695778",
  "content": "Natural wetlands make up ~30% of global total CH4 emissions",
  "user": {
    "id": 1234994945,
    "name": "Climate Change Conference",
    "screen_name": "Climate Change"
  }
}
```

</details>

<details>
<summary>
    <strong className="get">[ GET ]</strong>  <code>&#123;API Base&#125;/topics</code> <small>- list Hub Topics</small>
</summary>

**Parameters**

<small>No parameters</small>

**Responses**

<small>Status: <code>200</code> - Success</small>
```json
[
  {
    "contentType": "application/x-ndjson",
    "topic": "delay-test-4"
  },
  {
    "contentType": "",
    "localProvider": "1fcbde43-c28c-420a-a724-9ece860d655a",
    "topic": "messages-slack-inbound"
  },
  {
    "contentType": "",
    "localProvider": "5a8029f8-220e-4ed5-b981-9f3347cf1545",
    "topic": "messages-slack-outbound"
  }
]
```

</details>
