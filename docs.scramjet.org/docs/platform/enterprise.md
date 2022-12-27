---
slug: "/platform/enterprise"
title: Enterprise Features
description: Enterprise Features
separator: More Info
position: 7
type: "platform"
order: 7
---

# Enterprise features

Scramjet Cloud Platform Enterprise is an fully self hosted system working in a similar way to the publicly available version, but thanks to the flexibility of deployment structure and extended module library maintained by Scramjet, the feature set is extended.

If you're looking for any of the following features, please get in touch with us using the [Scramjet Cloud Platform Enterprise contact form](/contact-form).

## Future public features

Some features currently available as Enterprise only will make their way to the public version of Scramjet Cloud Platform, here's the general list:

### Core Features

* **Local State Storage** - The AppContext methods of `setState` and `getState` are available to store application state between restarts
* **Distributed State** - Ability to share the state depicted above between multiple running Sequences
* **Custom Containers** - Ability to run Scramjet runners in specific container images and using custom image repos.
* **Custom Languages** - Ability to add own programming language environment for Sequences.
* **Instance Scalability** - Ability to temporarily get over the limit of memory/CPU/disk
* **Sequential Scalability** - Ability to run mulitple Sequences in a single process when the throughput is lower
* **Topic Scalability** - Ability to start more sequences when the topic throughput falls below upload/speed
* **Consistent Hashing** - Ability to direct specific data points to the same instance based on custom logic
* **Sequence Bundling** - Ability to start whole spaces with instances according to predefined configuration
* **DLQ Support** - Automatic resolution of Dead Letter Queues
* **I/O Storage Cache** - Ability to store input and output data between API and non-API solutions
* **Low Latency Mode** - Ability to start sequences with input latency reduced to 10µs

### Public Cloud Features

* **Inter-cloud topics** - Ability to create data Spaces shared between multiple cloud providers.
* **Multi-cloud Sequences** - Sequences running in chosen Cloud Providers (current support: Google Cloud, Amazon Web Services, Microsoft Azure and OVH Cloud, with custom implementation possible)
* **Inter-cloud API Transport** - Ability to start gateway instances at a cloud provider of your choice
* **VPC Support** - Ability to add Hubs in Cloud Provider VPC's with VM and docker images available
* **Managed Kubernetes Support** - Ability to use own Managed Kuberetes Clusters
* **Managed Docker Support** - Ability to use Docker instances from Public Clouds
* **Managed VM Support** - Ability to run programs directly on VM systems like AWS EC2

### API Gateway Features

* **Custom Endpoints** - Ability to expose the custom API endpoints on Space, Hub and Instance levels
* **Public API's** - Ability to expose custom, non-autorized, publically available API's (including )
* **Websocket Endpoints** - Ability to expose topics and sequence streams as websockets
* **TCP/UDP Socker Support**

### Edge/localised processing

* **Local Hubs** - Ability to add own Hubs to public Spaces without the need to expose ports or VPN's
* **Local API** - Ability to expose Scramjet Cloud Platform API's in closed networks
* **Data tunelling** - Ability to expose API data to local machines

### IoT Features

* **IoT Adapters** - Ability to start Sequences on low power devices (RPi2040 and STM32)
* **Custom Protocols** - Ability to use custom communication protocols, like Bluetooth LE or Lightweight M2M.
* **OTA Updates** - Ability to deploy software over-the-air, without physical access to local machines

### Machine Learning features

* **GPU Instances** - Ability to start sequences on GPU instances for Machine Learning
* **AI Instances** - Ability to start sequences on GPU instances for complex AI Inference

## Enterprise only features

The following features are bound to the management layer of the platfor and require custom deployment of Scramjet Cloud Plafrom and will not be making it's way to the public version of the platform in near future.

* **Proxmox Support** - Ability to start Sequences on virtual machines controlled by ProxMox
* **Bare Metal Support** - Ability to start Hubs on Bare Metal machines
* **Firecracker VM support** - Ability to use Firecracker support
* **Custom Runtime Adapters** - Ability to use custom Runtime Adapters
* **End-to-end encryption** - Full GPG encryption of data between the CLI and the Sequence Instance with secure key exchange
