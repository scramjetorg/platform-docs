# Discord to Slack (and vice versa) Connection

In this project you will find 4 STH sequences:

* [discord-read](./discord-read/)
* [discord-write](./discord-write/)
* [slack-read](./slack-read/)
* [slack-write](./slack-write/)

You must run at least two (discord-read, slack write or discord-write, slack-read) in order to get one directional communication or all four for bi-directional communication.

Each sequence either reads or writes to specified application respectively and uses `messages` topic to exchange data between applications.

## TODO

As there is no way to map message IDs between the two applications, threads are not supported.

In order to get this working, sequences must keep a track of posted and written IDs.
