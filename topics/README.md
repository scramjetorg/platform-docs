# Topics

Topics enable building highly efficient data streaming pipelines. The topic data pipelines can be used to transfer data between your Instances.

Each Instance can be either producer and/or customer of one topic.

The topics are also available under their own API endpoints. Topics API endpoint can have multiple producers and consumers.

## Topics Visibility

The topics are created in a Space and can be accessible only within that Space. A Space is Scramjet environment which provides data isolation.
By default, a user account has one Space and one Hub. A Hub is an engine which runs user programs (Sequences).

A Space can be visible in the Platform Panel:

![space](../images/si-space.png)

You can also list your Spaces using the [Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli):

```bash
si space ls
```

or directly by API:

```bash
curl https://api.beta.scramjet.cloud/api/v1/spaces -H 'accept: */*' -H 'authorization: Bearer YOUR-ACCESS-TOKEN-HERE' -H 'cache-control: no-cache' -H 'content-type: application/json'
```

## Topic API

The dedicated topic endpoint has an endpoint:

```bash
{API Base}/topic/:name​
```

where ```:name``` is the topic name of your choice.

When you send the first request to this endpoint, the topic is automatically created and ready to be used.

You can send data to to the topic with a simple POST request:

```bash
[ POST ] {API Base}/topic/:name​ 
```

Example:

```bash
curl https://api.beta.scramjet.cloud/api/v1/space/<space-ID>/api/v1/sth/<hub-ID>/api/v1/topic/topicTestName -H 'accept: */*' -H 'authorization: Bearer YOUR-ACCESS-TOKEN-HERE' -H 'cache-control: no-cache' -H 'content-type: application/json' -d '{"test": 1}'
```

and recieve it with the GET request under the same endpoint:

```bash
[ GET ] {API Base}/topic/:name​ 
```

Example:

```bash
curl https://api.beta.scramjet.cloud/api/v1/space/<space-ID>/api/v1/sth/<hub-ID>/api/v1/topic/topicTestName -H 'accept: */*' -H 'authorization: Bearer YOUR-ACCESS-TOKEN-HERE' -H 'cache-control: no-cache' -H 'content-type: application/json'
```

More information on Topics API can be found in [Scramjet API reference](https://docs.scramjet.org/platform/api-reference#topics-operation-on-data).

## Instance Topic Producer

Indicating that your Instance is a producer is as easy as setting the two attributes on the output stream returned from the Instance. These attributes are topic name and topic content type.

Below is JavaScript snippet example of creating a topic producer Instance for the topic named ```names``` of content type ```application/x-ndjson```:

```js
// The function exported in the main file of your Sequence. The main file of your Sequence is specified in the "package.json" configuration file.
export = async function(_input) {
    // Initiating a stream which will be used as a topic stream in this Sequence.
    const ps: PassThrough & HasTopicInformation = new PassThrough({ objectMode: true });

    // Everything written to this stream will be available in the topic stream.
     const data = { name: "Hulk" };
     ps.write(data);
    
    // Indicating that this stream produces data to topic named "names" which has content type "application/x-ndjson".
    ps.topic = "names";
    ps.contentType = "application/x-ndjson";

    return ps;
} as ReadableApp<any>;
```

Full Sequence code can be found [here](https://github.com/scramjetorg/reference-apps/blob/main/js/endless-names-output/index.ts)

## Instance Topic Consumer

If you wish to now create an Instance that would be a consumer of this topic you need to export from your main file an array. The first element of this array will be an object indicating the required Topic name and content type.

```js
// The array exported in the main file of your Sequence. The main file of your Sequence is specified in the "package.json" configuration file.
const mod: (TransformApp | { requires: string, contentType: string})[] = [
    // The first element of this array specifies the topic name as "names" and content type as "application/x-ndjson".
    { requires: "names", contentType: "application/x-ndjson" },
    // The second element of the array is the first Sequence function we wish to call
    function(input: Streamable<any>) {
        const out = new PassThrough({ objectMode: true });

       // Consume topic "names and write something to an output stream, e.g.
        (input as StringStream)
            .map((data: any) => "Name is: " + data.name + "\n")
            .pipe(out);

        return out;
    }
];
export default mod;
```

Full Sequence code can be found [here](https://github.com/scramjetorg/reference-apps/blob/main/js/hello-input-out/src/index.ts)

## Accessing Topics via CLI

If you wish to give the topics a test drive a convenient way to do it is through the [Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli)
[The Scramjet CLI](https://www.npmjs.com/package/@scramjet/cli) has full topics support enabling;

- Sending data to a topic from the standard input or a file
- Receiving data from a topic
- Listing the topics created on Space

![listtopics](../images/si-topic-help.png)
