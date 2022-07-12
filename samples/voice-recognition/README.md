# voice recognition

This is a simple and trivial example of voice recognition with Scramjet and speech_recognition Python library.

___

## Prerequisites

Our sample needs some external dependencies to run properly, however we are packing them in sample. The one thing that you need to run this sample is dependency needed by our **listen.py** script, to gather audo data from your microphone.

```bash
sudo apt-get install python3-pyaudio
```

> 💡**NOTE:** Packaging of Python Sequences is not very "pythonic" for now. If you have any idea, how we should resolve it for your comfort, please let us know [here](https://github.com/scramjetorg/transform-hub/issues/598).

## Running

Open two terminals and run the following commands:

**The first terminal:**

```bash
# start sth
DEVELOPMENT=1 scramjet-transform-hub
```

Thanks to **DEVELOPMENT** flag, you will be able to see sample output on terminal with STH logs.

**The second terminal**

```bash
# go to 'voice-recognition' directory
cd samples/voice-recognition

# install dependencies
yarn build:refapss

# Deploy sample to STH
si seq deploy dist/
```

> 💡**NOTE:** Command `deploy` performs three actions at once: `pack`, `send` and `start` the Sequence. It is the same as if you would run those three commands separately:

## Output

```bash
# You need to pass instane id to listen.py script. Gather it first
si inst ls
[{"id":"da9e41d8-e776-491f-b883-6e61afa93b97","sequence":"15228e0e-b7e3-4008-b4ee-e9aa1d0008d9"}]

# Run listen.py script
SCRAMJET_API_URL="http://localhost:8000/api/v1" INSTANCE_ID="da9e41d8-e776-491f-b883-6e61afa93b97" python3 listen.py

# You should see something similar to this. Now you can start talking :)
http://localhost:8000/api/v1 f5184065-93a0-4a53-96aa-b28ad87801cd
ALSA lib setup.c:547:(add_elem) Cannot obtain info for CTL elem (MIXER,'AC97 2ch->4ch Copy Switch',0,0,0): No such file or directory
ALSA lib pcm.c:2664:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.center_lfe
ALSA lib pcm.c:2664:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.side
ALSA lib pcm.c:2664:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.surround21
ALSA lib pcm.c:2664:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.surround21
ALSA lib setup.c:547:(add_elem) Cannot obtain info for CTL elem (MIXER,'AC97 2ch->4ch Copy Switch',0,0,0): No such file or directory
(...)

```

For test purpose, I said that ***I like pink elephants***. You can notice that it is visible in STH logs.

```bash
2022-07-11T08:12:43.021Z INFO  Host List Instances 
2022-07-11T08:12:43.021Z DEBUG Host Request [
  'date: 2022-07-11T08:12:43.021Z, method: GET, url: /api/v1/instances, status: 200'
]
2022-07-11T08:12:57.366Z INFO  PythonRunner Input headers: {'content-type': 'text/plain'} 
2022-07-11T08:12:57.366Z DEBUG PythonRunner Decoding input stream... 
2022-07-11T08:12:57.366Z DEBUG PythonRunner Input stream forwarded to the instance. 
2022-07-11T08:12:57.369Z DEBUG Host Request [
  'date: 2022-07-11T08:12:57.365Z, method: POST, url: /input, status: 200'
]
2022-07-11T08:12:58.702Z DEBUG PythonRunner Output type not set, using default 
2022-07-11T08:12:58.702Z INFO  PythonRunner Output type: text/plain 
2022-07-11T08:12:58.702Z DEBUG PythonRunner Output stream will be treated as text and encoded 
i like pink elephants 2022-07-11T08:12:59.057Z INFO  PythonRunner Finished. 
2022-07-11T08:12:59.069Z TRACE ProcessInstanceAdapter Runner process exited [ 10994 ]
2022-07-11T08:12:59.069Z TRACE CSIController Sequence finished with success [ 0 ]
2022-07-11T08:12:59.070Z TRACE Host CSIControlled ended [ 'Exit code: 0' ]
2022-07-11T08:12:59.070Z TRACE CSIController Instance stopped. 

```
