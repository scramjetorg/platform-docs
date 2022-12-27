---
slug: "/platform/topics"
title: Manage Data Flow
description: Manage Data Flow
separator: How to
position: 6

type: "platform"
order: 4
---

# Manage Data Flow - Topics

Topics are categories/labels used to organize input/output data. Messages can be send to or read from requested topics in Scramjet Platform. To be specific, producer Sequence writes data to topic, consumer Sequence reads data from requested topic.

Examples of producer/consumer Sequences you can find in [reference-apps](https://github.com/scramjetorg/reference-apps) repository.

1. To run producer Sequence

    ```bash
    seq start <sequence_id> --output-topic <topic>
    ```

2. To run consumer Sequence

    ```bash
    seq start <sequence_id> --input-topic <topic>
    ```

3. Sequence can be both producer and consumer

    ```bash
    seq start <sequence_id> --input-topic <topic> --output-topic <topic>
    ```
