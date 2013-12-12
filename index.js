var wintersmith = require('wintersmith');
var env = wintersmith('./config.json');

env.build(function(error) {
  if (error) throw error;
  require('./server').start({
    name: 'blog.ryanarana.com',
    publicPath: 'build'
  });
});
