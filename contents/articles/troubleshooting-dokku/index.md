---
title: Troubleshooting Dokku
author: ryana
date: 2013-12-30
template: article.jade
---

I ran into some troubles while putting deploying my [article about setting up InfluxDB](../setting-up-influxdb) and had to do a fair amount of spelunking
to find what ended up being a really simple fix. This article aims to collect some pointers to where to look when hunting down problems with the [dokku
instance I've set up](../moving-to-dokku).

##

Run `dokku logs <app-name>` first!

[dokku]: https://github.com/progrium/dokku
