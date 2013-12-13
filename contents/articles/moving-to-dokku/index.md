---
title: Moving to Dokku
author: ryana
date: 2013-12-12
template: article.jade
---

I wanted to get a place set up where I could quickly deploy basically anything to a subdomain of ryanarana.com and a [coworker](https://twitter.com/ungoldman) of mine had the same thought,
and he sent me to a [gist](https://gist.github.com/ngoldman/7287753) that he wrote summarizing his setting up of [Dokku](https://github.com/progrium/dokku)
on [DigitalOcean](http://digitalocean.com).

## Static Blog

I spent some time and got that running so that I can now simply add a git remote to any of my projects and `git push deploy master` and the project will be
deployed and hosted at `project-name.ryanarana.com`, given that it is one of Dokku's [supported platforms](https://github.com/progrium/buildstep#supported-buildpacks).

That was pretty exciting getting that working so I, of course, wanted to publish something to it immediately and the first thing I thought of was this blog!
But since this blog is effectively a static site (generated using [Wintersmith](https://github.com/jnordberg/wintersmith)) and not actually an app of any kind,
this isn't strictly speaking one of Dokku's supported platforms. Which is why I wanted to write this post: to build on top of Nate's gist, and outline how I went
about automating the generation and hosting of my static site on [Dokku](https://github.com/progrium/dokku) with [Wintersmith](https://github.com/jnordberg/wintersmith).

I'm not going to go over what Nate already covered in his [gist](https://gist.github.com/ngoldman/7287753), so go read that to see how to get Dokku running
on a Droplet. Once I had the ability to push to a dokku remote and have it hosted on my droplet, I started with Nate's [node-static-server-template](https://github.com/ngoldman/node-static-server-template)
and added the Wintersmith dependencies to `package.json`:

```javascript
"dependencies": {
  "moment": "~2.1",
  "underscore": "1.4.x",
  "typogr": "0.5.x",
  "wintersmith": "2.x"
  "director": "~1.2.1",
  "ecstatic": "~0.4.13",
  "union": "~0.3.8",
}
```

Next step was to change `index.js` to make it programmatically build the wintersmith site:

```javascript
var wintersmith = require('wintersmith');
var env = wintersmith('./config.json');

env.build(function(error) {
  if (error) throw error;
  require('./server').start({
    name: 'blog.ryanarana.com',
    publicPath: 'build' // This is the default output directory for Wintersmith. Change this if you've configured it differently.
  });
});
```

This sets it up so that whenever I push to my dokku remote it builds the wintersmith site and then serves the static files, so I don't have to bother with
adding the build products to my repo, yay!
