---
title: Setting up Influxdb
author: ryana
date: 2013-12-29
template: article.jade
---

I wanted to get a place set up where I could store some quantified self data. Specifically my blood sugar results, insulin intake and the food I eat (with some
nutritional info appended). We've been poking at using [InfluxDB][influx] for a project at work, and I think it is a perfect fit for this use case. This article
documents how I got that all set up.

## The Setup

I took the [Dokku][dokku] [droplet][digitalocean] that I set up [earlier](../moving-to-dokku) and manually added the [InfluxDB docker file][influx-docker] using
the following steps:

1. SSH'd into my droplet and ran these commands:
  1. `docker pull fujin/influxdb` - This gets the latest version from the docker index.
  2. `docker run -p 8083:8083 -p 8086:8086 -name="influxdb" fujin/influxdb` - The -p's map the containers 8083 (admin) and 8086 (api) ports to the host's ports of
  the same number. The -name parameter makes it so that we can start/stop this container by name in the future. You'll have to do a `docker rm influxdb` if you need
  to make changes between runs.
2. After verifying that all worked (by going to http://ryanarana.com:8083 in my browser) I ctrl-c'd and then ran `docker start influxdb` to start the container up
in the background.

After that I spent some time changing passwords and setting up users and a database via curl since previous attempts at using the web admin interface were spotty
at best. And that's pretty much it for the server side. Now I'm working on adding stuff to an [iOS client app](https://github.com/ryana/influx-client) that [a
coworker][courtf] made as a way to learn some iOS to allow me to send data to the server.

[influx]: http://influxdb.org
[dokku]: https://github.com/progrium/dokku
[digitalocean]: http://digitalocean.com
[influx-docker]: https://index.docker.io/u/fujin/influxdb/
[courtf]: https://github.com/courtf
