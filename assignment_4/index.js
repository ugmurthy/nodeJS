
/*
 * Primary file for API
 *
 */

 // dependencies
 var server = require('./lib/server');
 var cli = require('./lib/cli');

// declare the app
var app = {};
app.init = function() {
  // start servers
  server.init();

  // start cli with a delay to ensure server has inited
  setTimeout(function(){
  	cli.init();
  },50);

};


// Execute
app.init();


// Export the app
module.exports = app
