# topic provider

Topic provider. Sequence that produces/writes data under topic called 'names'.

___

## Running

Open the terminal and run the following commands:

```bash
# install dependencies
npm install

# transpile TS->JS and copy node_modules and package.json to dist/
npm run build

# compress 'dist/' directory into file named 'topic-provider.tar.gz'
si seq pack dist/ -o topic-provider.tar.gz

# start the Sequence, this will output Instance ID
si seq start -
```
