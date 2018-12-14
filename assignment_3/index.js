
/*
 * Primary file for API
 *
 */

 // dependencies
 var server = require('./lib/server');

// declare the app
var app = {};
app.init = function() {
  // start servers
  server.init();
};


// Execute
app.init();


// Export the app
module.exports = app
