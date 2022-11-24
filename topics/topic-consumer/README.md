# topic consumer

Sequence that reads the data from topic and writes modified data to output.

___

## Running

Open the terminal and run the following commands:

```bash
# go to sequence directory
cd topic-consumer

# install dependencies
npm install

# transpile TS->JS and copy node_modules and package.json to dist/
npm run build

# compress 'dist/' directory into file named 'topic-consumer.tar.gz'
si seq pack dist/ -o topic-consumer.tar.gz

# start the Sequence, this will output Instance ID
si seq start -

# see the Instance output
si inst output -
```

## Output

Once you run `si inst output -` command you should get an output similar to this one:

```bash
$ si inst output -
Hello Alice! 
Hello Ada! 
Hello Aga! 
Hello Michael! 
Hello Patrick! 
Hello Rafael! 
Hello Aida! 
Hello Barbra! 
Hello Natalie! 
Hello Tom! 
Hello Jerry!
...
```
