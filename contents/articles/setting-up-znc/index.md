---
title: Setting up ZNC
author: ryana
date: 2013-12-30
template: article.jade
---

I recently set up [ZNC][znc] on my server, because having an irc bouncer is awesome! This article
documents the process I went through to set that up (mostly for my own reference later).

## Set Up

First I started with [this article][znc-article]. That article was great, very thorough and perfectly suited to my
[set up](../moving-to-dokku).

## Run At Start Up

Next, I put the following in `/etc/init.d/znc.sh` to start up ZNC at start up (with `755` permissions):

```bash
#! /bin/sh
# /etc/init.d/znc.sh
#

sudo -u znc-admin -H znc
```

Then ran `update-rc.d znc.sh defaults` and ignored the warnings about LSB information.

[znc]: http://znc.in
[znc-article]: https://www.digitalocean.com/community/articles/how-to-install-znc-an-irc-bouncer-on-an-ubuntu-vps
