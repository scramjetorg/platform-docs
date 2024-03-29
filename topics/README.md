# Topics

Topics enable building highly efficient data streaming pipelines. The topic data pipelines can be used to transfer data between your Instances.

Each Instance can be either producer and/or customer of one topic.

![topics-diagram](../images/topic-diagram.svg)

The topics are also available under their own API endpoints. Topics API endpoint can have multiple producers and consumers.

## Topics Visibility

The topics are created in a Space and can be accessible only within that Space. A Space is Scramjet environment which provides data isolation.
By default, a user account has one Space and one Hub. A Hub is an engine which runs user programs (Sequences). When Hub is connected to
Space all topics created on this Hub are also accessible on the Space and on all Hubs connected to this Space.
This enables transferring data between your Instances even if they are running on different Hubs.

A Space and a Hub can be visible in the Platform Panel:

![space](../images/si-space.png)

You can also list your Spaces using the [Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli):

```bash
si space ls
```

and all Hubs connected to the given Space with:

```bash
si hub ls
```

You can also list Spaces directly using [SCP API](https://docs.scramjet.org/platform/api-reference#hub-operations):

```bash
curl https://api.beta.scramjet.cloud/api/v1/spaces \
    -H 'accept: */*' \
    -H 'authorization: Bearer YOUR-ACCESS-TOKEN-HERE' \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json'
```

You will need a Space ID if you want to send data to a topic using [Topics API](#topic-api).

## Topic API

The Topic API has a dedicated endpoint ```/topic```:

```bash
{API Base}/topic/:name​
```

where ```:name``` is the topic name of your choice.

When you send the first request to this endpoint, the topic is automatically created and ready to be used.

You can send data to the topic with a simple POST request:

```bash
[ POST ] {API Base}/topic/:name​ 
```

Example:

```bash
curl https://api.beta.scramjet.cloud/api/v1/space/<space-ID>/api/v1/sth/<hub-ID>/api/v1/topic/topicTestName \
    -H 'accept: */*' \
    -H 'authorization: Bearer YOUR-ACCESS-TOKEN-HERE' \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{"test": 1}'
```

and receive it with the GET request under the same endpoint:

```bash
[ GET ] {API Base}/topic/:name​ 
```

Example:

```bash
curl https://api.beta.scramjet.cloud/api/v1/space/<space-ID>/api/v1/sth/<hub-ID>/api/v1/topic/topicTestName \
    -H 'accept: */*' \
    -H 'authorization: Bearer YOUR-ACCESS-TOKEN-HERE' \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json'
```

What is also interesting, the topic is created not only in response to a POST request but also with a simple GET request. This means that every GET / POST request sent to the endpoint `/topic/:name` will initiate a new topic, no matter if some data is sent there or not. You can visualize this like this → a GET request opens a pipe with the given topic name (`/:name`), which is ready for data transfer, then every POST request will be filling this pipe with data.

All topics available in the space can be listed by sending GET request to `/topics` endpoint.

```bash
[ GET ] {API Base}/topics​ 
```

Example:

```bash
curl https://api.beta.scramjet.cloud/api/v1/space/<space-ID>/api/v1/sth/<hub-ID>/api/v1/topics \
    -H 'accept: */*' \
    -H 'authorization: Bearer YOUR-ACCESS-TOKEN-HERE' |jq
```

More information on Topics API can be found in [Scramjet API reference](https://docs.scramjet.org/platform/api-reference#topics-operation-on-data).

## Instance Topic Producer

Indicating that your Instance is a producer is as easy as setting the two attributes on the output stream returned from the Instance. These attributes are topic name and topic content type.

Below is JavaScript snippet example of creating a topic producer Instance for the topic named ```names``` of content type ```application/x-ndjson```:

```js
// The main file of your Sequence is specified in the "package.json" configuration file.
// The function exported in the main file of your Sequence.
module.exports = async function(_inputStream) {
    // Initiate an Instance output stream.
    const outputStream = new PassThrough({ objectMode: true });

    // Write something to the Instance output stream.
     const data = { name: "Hulk" };
     outputStream.write(data);
    
    // Indicate that this stream produces data to topic named "names" which has content type "application/x-ndjson".
    outputStream.topic = "names";
    outputStream.contentType = "application/x-ndjson";

    return outputStream;
};
```

Full Sequence source code can be found [here](./topic-provider-js/index.js).
This Sequence is also available in a form of [an already packed tar.gz](./topic-provider-js.tar.gz) ready to be run on the Hub.

## Instance Topic Consumer

If you wish to now create an Instance that would be a consumer of this topic you need to export from your main file an array. The first element of this array will be an object indicating the required Topic name and content type.

```js
// The main file of your Sequence is specified in the "package.json" configuration file.
// The array exported in the main file of your Sequence.
module.exports = [
    // The first element of this array specifies the topic name as "names" and content type as "application/x-ndjson".
    { requires: "names", contentType: "application/x-ndjson" },
    // The second element of the array is the first Sequence function we wish to call.
    function(inputStream) {
        // Initiate Instance output stream
        const outputStream = new PassThrough({ objectMode: true });

        // Data from the topic stream "names" are written to the Instance input stream.
        // You can e.g. transform the input data and write them to the Instance output stream.
        (inputStream)
            .map((data) => `Hello ${data.name}! \n`)
            .pipe(outputStream);

        return outputStream;
    }
];
```

Full Sequence source code can be found [here](./topic-consumer-js/index.js)
This Sequence is also available in a form of [an already packed tar.gz](./topic-consumer.tar.gz) ready to be run on the Hub.

## Change Instance Provider or Consumer Topic Name

You can override the topic name used in your Sequence source code when you start its Instance.

It can be easily done when starting the Instance using [Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli).

The CLI command to start a Sequence supports overriding topic which Instances produces and consumes with two corresponding options;
```--output-topic``` and ```--input-topic```.

## Override Topic Name of Instance Topic Provider

Let's take [our example Sequence which produces data](./topic-provider-js/index.js) to topic named ```names``` and run it but modify the topic name to ```testNames```:

```bash
si seq start - --output-topic "testNames"
```

![topicoutputoverride](../images/si-topic-output-override-send.png)

The ```-``` in the above command automatically perfoms the operation for the last saved Sequence ID. More about its use can be found in the [documentation of CLI session configuration](https://docs.scramjet.org/platform/cli-reference#session-configuration).

After we successfully started our Sequence with ```--output-topic```, we can list the topics and see that the new topic ```testNames``` appeared:

![topicoutputoverridels](../images/si-output-override-ls.png)

We can now test if the data was written to the ```testNames``` topic by consuming the topic with the ```si topic get <topicName>``` command:

![topicoutputoverridegettopic](../images/si-output-override-get-topic.png)

## Override Topic Name of Instance Topic Consumer

Similarly to overriding topic name of Instance topic provider we can override topic name for Instance topic consumer.

We can take [our example Sequence which consumes topic data](./topic-consumer-js/index.js) named ```names``` and also change its topic name to ```testNames```:

```bash
si seq start - --input-topic "testNames"
```

If we have an Instance which is both a consumer and a provider of topics, we can override both topic names by combining the two options:

```bash
si seq start - --input-topic "testNames" --output-topic "preprocessedNames"
```

## Accessing Topics via CLI

If you wish to give the topics a test drive a convenient way to do it is through the [Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli)
[The Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli) has full topics support enabling;

- Sending data to a topic from the standard input or a file
- Receiving data from a topic
- Listing the topics created on Space

![helptopics](../images/si-topic-help.png)

## Topic FAQ

### Why do I get ```415 Unsupported Media Type``` error when sending data to topic?

```bash
$ si topic send names ~/data.json
Error: Failed to request 'http://127.0.0.1:8000/api/v1/topic/names' with code 415.
```

This error means that the format of data you are trying to send to topic does not match the data format required by this topic.
The data format required by the topic is defined when the topic is created and can not be modified.

If you wish to check the data format required by the topic you can list the topics, e.g. using [Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli):

```bash
si topic ls
```

![listtopics](../images/si-output-override-ls.png)

If you use [Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli) to send data to a topic, you can use ```-t``` option to indicate the topic data format.
For example, to send data to topic named ```topicTestName``` expecting data in format ```application/x-ndjson```:

```bash
si topic send topicTestName -t application/x-ndjson ~/data.json

```

### Why data is not available in topic?

If your Instance seems not to be obtaining data from a topic or you are having trouble getting all topic data using Topics API please first check if there are no active consumers of this topic. When the data in a topic is consumed it is no longer available. The only way to make is available is to write it to the topic stream again.

If you are working with the Scramjet Cloud Platform (SCP) you can check the current consumers of the topic using Topics API on your Space:

```bash
curl https://api.beta.scramjet.cloud/api/v1/space/<space-ID>/api/v1/topics \
    -H 'accept: */*' \
    -H 'authorization: Bearer YOUR-ACCESS-TOKEN-HERE' \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json'
```

The response to this HTTP request will return a list of topics available on the Space and information on all actors using the topics. Actors can have a role of ```consumer``` or ```provider``` and an attribute ```retired``` signaling whether an actor is still active or not.

![listtopicsspace](../images/topics-space-ls.png)

In the screen shot above we can see two topics; ```names``` and ```avengers``` both having one consumer and one provider each being currently not active.
