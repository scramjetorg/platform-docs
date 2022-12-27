---
slug: "/platform/api-client-js"
title: "Javascript API Client"
description: "Javascript API Client"
separator: Interface Reference
type: "platform"
---

# Javascript API Client

The `API Client` package provides a Middleware API Client to use with the Scramjet Platform. It allows access to platform resources using an access token and helps with HostClient, SequenceClient and InstanceClient creation.

Usage:

```js
import { MiddlewareClient } from "@scramjet/middleware-api-client";

let middlewareClient = new MiddlewareClient(middlewareUrl);
```

## Authorization

The Platform requires requests to be authorized. `Access token` can be easily obtained by following steps from the [quick start](/platform/quick-start) section. Request can be authorized by adding the `Authorization` header. The example below shows how to do it with the middleware-api-client.

```js
import { MiddlewareClient } from "@scramjet/middleware-api-client";
import { ClientUtils } from "@scramjet/client-utils";

let middlewareClient = new MiddlewareClient(middlewareUrl);

ClientUtils.setDefaultHeaders({
  Authorization: `Bearer ${token}`,
});
```

## Users Space and HostClient

The Middleware API Client helps retrieve the list of spaces bound to the user. It has a helpful method that does just that. It's also the first step for the HostClient creation.

```js
const spaces = await middlewareClient.getManagers();
// [
//   {
//      "id":"org-11111111-2222-3333-4444-555555555555-manager"
//   }
// ]
```

> There is usually one Space available.

Next, we have to create the HostClient. For that to be possible the Space Manager has to be requested for the list of available hosts.

```js
const spaceClient = middlewareClient.getManagerClient(spaces[0].id);
const spaceHubs = await spaceClient.getHosts();
// [
//    {
//       "id":"sth-0",
//       "info":{
//          "created":"2022-07-07T13:37:30.416Z",
//          "lastConnected":"2022-07-14T07:39:34.781Z",
//          "lastDisconnected":"2022-07-14T07:38:41.105Z"
//       },
//       "healthy":true,
//       "isConnectionActive":true
//    }
// ]
```

> There is usually one Hub available.

Having Hubs available allows for the HostClient to be created.

```js
const hostClient = spaceClient.getHostClient(spaceHubs[0].id);
```

HostClient allows for listing available Instances and Sequences and for the creation of corresponding clients.

## Sequence and Instance clients

For the Sequence or Instance client to be created the entity id is needed. It can be retrieved from the HostClient listing the instances and sequences. Creating HostClient in the context of Scramjet Platform was shown in the [Users Space and HostClient](#users-space-and-hostclient) section.

_Creating SequenceClient_

The SequenceClient requires the sequence id. It can be found in the list of sequences.

```js
const sequencesList = await hostClient.listSequences();
// [
//    {
//       "id":"11111111-2222-3333-4444-555555555555",
//       "config":{
//          "type":"kubernetes",
//          "entrypointPath":"hello.js",
//          "version":"0.19.0",
//          "name":"@scramjet/hello-js",
//          "id":"11111111-2222-3333-4444-555555555555",
//          "sequenceDir":"/root/.scramjet_k8s_sequences/11111111-2222-3333-4444-555555555555",
//          "engines":{}
//       },
//       "instances":[]
//    },
//    (...)
// ]
```

Having the Sequence id allows for the SequenceClient to be created and its methods to be called. For example start of the Sequence results in the creation of the new Instance.

```js
const sequenceClient = hostClient.getSequenceClient(sequencesList[0].id);
const instanceClient = await sequenceClient.start({ appConfig: {} });
```

_Creating InstanceClient_

The InstanceClient requires the instance id. It can be found in the list of instances.

```js
const instancesList = await hostClient.listInstances();
// [
//    {
//       "id":"21111111-3222-4333-5444-655555555555",
//       "appConfig":{},
//       "sequence":"11111111-2222-3333-4444-555555555555",
//       "created":"2022-07-14T08:09:34.221Z",
//       "status":"starting"
//    },
//    (...)
// ]
```

Having the Instance id allows for the InstanceClient to be created and its methods to be called. For example, killing the Instance results in Instance immediate stop.

```js
const instanceClient = hostClient.getInstanceClient(instancesList[0].id);
await instanceClient.kill();
```

## Docs

See the code documentation here:

- [MiddlewareClient](https://github.com/scramjetorg/transform-hub/tree/HEAD/docs/middleware-api-client/classes/MiddlewareClient.md)
- [HostClient](https://github.com/scramjetorg/transform-hub/tree/HEAD/docs/api-client/classes/HostClient.md)
- [SequenceClient](https://github.com/scramjetorg/transform-hub/tree/HEAD/docs/api-client/classes/SequenceClient.md)
- [InstanceClient](https://github.com/scramjetorg/transform-hub/tree/HEAD/docs/api-client/classes/InstanceClient.md)

## More reading

- [Stream Protocol](stream-protocol)
- [API Reference](api-reference)
