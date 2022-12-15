---
slug: "/platform/api-client-py"
title: "Python API Client"
description: "Python API Client"
separator: Interface Reference
type: "platform"
---

> 💡 **Note:** Python client is still in development stage. We support only Host API's with Python.

# Python API Client

The `Python API Client` package provides a simple API Client to use with the Scramjet Platform. It allows interaction with HostClient, SequenceClient and InstanceClient creation.

## Host client

To create Host client, you need to provide url to platform, like in example below.

```python
url = 'http://192.168.0.34:8000/api/v1'
host = HostClient(url)
```

You can now interact with `host` object, e.g. to check Host version

```python
response = asyncio.run(host.get_version())
print(f'Host version: {response}')
```

You can also send, start or delete Sequence with our API.

### Sending Sequence

```python
file = 'path/to/sequence.tar.gz'

app_config = {}
response = asyncio.run(host.send_sequence(file, app_config))
```

### Running Sequence

To run previously sent Sequence, you need to retrieve 'id' of it from response, e.g.

```python
import json
seq_id = json.loads(response).get('id')

response = asyncio.run(host.start_sequence(seq_id))
```

It works similarly for other endpoints.

## Sequence and Instance clients

To create Sequence or Instance client, you need to provide HostClient `object` parameter and `id' of requested Sequence/Instance. It can be found in the list of instances/sequences.

```python
url = 'http://192.168.0.34:8000/api/v1'
host = HostClient(url)

res = asyncio.run(host.list_sequences())
# [
#    {
#       "id":"11111111-2222-3333-4444-555555555555",
#       "config":{
#          "type":"kubernetes",
#         "entrypointPath":"hello.js",
#          "version":"0.19.0",
#          "name":"@scramjet/hello-js",
#          "id":"11111111-2222-3333-4444-555555555555",
#          "sequenceDir":"/root/.scramjet_k8s_sequences/11111111-2222-3333-4444-555555555555",
#          "engines":{}
#       },
#       "instances":[]
#    },
#   (...)
# ]

sequence_client = SequenceClient(id, host)
```

By analogy for instance client

```python
url = 'http://192.168.0.34:8000/api/v1'
host = HostClient(url)

res = asyncio.run(host.list_instances())
# [
#    {
#       "id":"21111111-3222-4333-5444-655555555555",
#       "appConfig":{},
#       "sequence":"11111111-2222-3333-4444-555555555555",
#      "created":"2022-07-14T08:09:34.221Z",
#       "status":"starting"
#    },
#    (...)
# ]

instance_client = InstanceClient(id, host)
```

Having the Instance ID or Sequence ID allows to use methods from the right clients. For example, killing the Instance results in Instance immediate stop.

```python
instance_client = InstanceClient(id, host)
asyncio.run(instance_client.kill())
```
