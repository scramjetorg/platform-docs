# Topics

Topics enable building highly efficient data streaming pipelines.

These data pipelines can be built to transfer data between your Instances.

Each Instance can be either producer and/or customer of a topic.

## Topic Producer

Indicating that your Instance is a producer is as easy as setting the two attributes on the output stream returned from the Instance. These attributes are topic name and topic content type.

Below is JavaScript snippet example of creating a topic producer Instance for the topic named ```names``` of content type ```application/x-ndjson```:

```js
export = async function(_input) {
    const ps: PassThrough & HasTopicInformation = new PassThrough({ objectMode: true });

     const data = { name: "Hulk" };
     ps.write(data);
    
    // Indicating that this Instance produces data to topic named "names".
    ps.topic = "names";
    ps.contentType = "application/x-ndjson";

    return ps;
} as ReadableApp<any>;
```

Full Sequence code can be found [here](https://github.com/scramjetorg/reference-apps/blob/main/js/endless-names-output/index.ts)

## Topic Consumer

If you wish to now create an Instance that would be a consumer of this topic you need to export from your main file an array. The first element of this array will be an object indicating the required Topic name and content type.

```js
// In the main Sequence file we export an array.
const mod: (TransformApp | { requires: string, contentType: string})[] = [
    // The first element of this array includes topic name ("names") and content type ("application/x-ndjson")
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
