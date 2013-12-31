var wintersmith = require('wintersmith');
var env = wintersmith('./config.json');

env.build(function(error) {
  if (error) throw error;
  require('./server').start({
    name: 'ryanarana.com',
    publicPath: 'build'
  });
});
