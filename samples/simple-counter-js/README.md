## simple-counter

---

A simple sequence, that counts and logs the number in one-second intervals. As a default, the counter is started with 0 and ends with 1000. These values can be changed by passing the `start` and `end` parameters.

### Running

```bash
# go to 'simple-counter-js' directory
cd samples/simple-counter-js

# instal dependencies
npm install

# make a compressed package with sequence
si pack . -o simple-counter-js.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send simple-counter-js.tar.gz

# start a sequence, this will output Instance ID
si seq start <sequence-id>

# See output of instance process
si inst stdout <instance-id>
```

### Output

```bash
{ x: 1 }
{ x: 2 }
{ x: 3 }
{ x: 4 }
{ x: 5 }
{ x: 6 }
{ x: 7 }
{ x: 8 }
{ x: 9 }
{ x: 10 }
{ x: 11 }
{ x: 12 }
{ x: 13 }
{ x: 14 }
...
```

### Running the same sequence but with different parameters

```bash
# go to 'simple-counter-js' directory
cd samples/simple-counter-js

# instal node_modules
npm install

# make a compressed package with sequence
si pack . -o simple-counter-js.tar.gz

# send sequence to transform hub, this will output Sequence ID
si seq send simple-counter-js.tar.gz

# start a sequence with "start" and "end" parameters, this will output Instance ID
si seq start <sequence-id> 100 2000

# See output of instance process
si inst stdout <instance-id>
```

### Output

```bash
# the counter will start counting at 100 and finish at 200
{ x: 101 }
{ x: 102 }
{ x: 103 }
{ x: 104 }
{ x: 105 }
{ x: 106 }
...
{ x: 193 }
{ x: 194 }
{ x: 195 }
{ x: 196 }
{ x: 197 }
{ x: 198 }
{ x: 199 }
{ x: 200 }
```