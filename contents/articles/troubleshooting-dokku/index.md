---
title: Troubleshooting Dokku
author: ryana
date: 2013-12-31
template: article.jade
---

I ran into some troubles while deploying my [article about setting up InfluxDB][influx-article] and had to do a fair amount of spelunking
to find what ended up being a really simple fix. This article aims to collect some pointers to avoid falling into this pit in the future.

## The List

I'll come back and update this list as I come across more of these but for now there's just the one. If you have any you'd like to share [tweet][twitter] at me or
[email](mailto:ryan@ryanarana.com) me, hell send me a [pull request][list-github]!

### Run `dokku logs <app-name>` first!

First things first: look at the logs! The issue that caused me to write this article in the first place, this could have saved me hours today.
I had gotten everything set up as outlined in the [article][influx-article] above, which doesn't actually use Dokku, but involved me mucking
around with [Docker][docker] manually, so I was a little leary of that going in. When I went to deploy the article I ran into this:

```
ryana[∴]aranasaurus-rex ~/src/blog[master]
± % git push deploy master
Counting objects: 9, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 1.44 KiB | 0 bytes/s, done.
Total 6 (delta 3), reused 0 (delta 0)
-----> Cleaning up ...
-----> Building ryanarana.com ...
remote: Error: No such container: 066de93653410ddc76df052f47370028f3887ace181af3b65b5b8946be12030a
remote: 2013/12/30 22:26:30 Error: failed to wait one or more containers
remote: /usr/local/bin/dokku: line 34: test: -eq: unary operator expected
To dokku@ryanarana.com:ryanarana.com
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'dokku@ryanarana.com:ryanarana.com'
```

What'd'ya mean `No such container`?! So I tried it again... maybe there was a network error or something silly. And sure enough this time it went through
successfully. So I load up ryanarana.com in my browser and get greeted with a 502 Bad Gateway. D'oh! And that's when I went down the completely wrong path
and wasted a couple of hours chasing white rabbits down dark holes. I won't go into to detail about all the things I did that didn't fix my problem, but
I will say the time wasn't *entirely* wasted as I now have a much better understanding of the underlying pieces that [Dokku][dokku] is built on, namely
[Docker][docker].

In the end, when I ran `dokku logs ryanarana.com` it showed me that the problem was actually that my main layout [Jade][jade] template was using a (now)
deprecated function and crashing. I guess I didn't update my local dependencies before running the site locally to check my changes and I didn't have
[Jade][jade] pinned so I got bit by that. When it deployed and ran `npm` it grabbed the latest version of [Jade][jade] and which had breaking changes. The
moral of the story: **Run `dokku logs <app-name>` first**.

[influx-article]: ../setting-up-influxdb/
[twitter]: https://twitter.com/thatryana
[list-github]: https://github.com/thatryana/blog/blob/master/contents/articles/troubleshooting-dokku/index.md
[dokku]: https://github.com/progrium/dokku
[docker]: http://www.docker.io
[jade]: http://jade-lang.com
