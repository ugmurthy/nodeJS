// SERVER Related tasks

// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path = require('path');
var util = require('util');
var debug = util.debuglog('server');



// instantiate server module object
var server = {};

 // Instantiate the HTTP server
server.httpServer = http.createServer(function(req,res){
  server.unifiedServer(req,res);
});


// Instantiate the HTTPS server
server.httpsServerOptions = {
  'key': fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname,'/../https/server.crt'))
};
server.httpsServer = https.createServer(server.httpsServerOptions,function(req,res){
  server.unifiedServer(req,res);
});



// All the server logic for both the http and https server
server.unifiedServer = function(req,res){

  // Parse the url
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLowerCase();

  //Get the headers as an object
  var headers = req.headers;

  // Get the payload,if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
      buffer += decoder.write(data);
  });
  req.on('end', function() {
      buffer += decoder.end();

      // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
      var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

      // if the request is within the public directory, use the public handler instead
      chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;
      //console.log("path :",trimmedPath);
      // Construct the data object to send to the handler
      var data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headers,
        'payload' : helpers.parseJsonToObject(buffer)
      };

      // Route the request to the handler specified in the router
      chosenHandler(data,function(statusCode,payload,contentType){

        // determine the type of response (fallback to json)
        contentType = typeof(contentType) == 'string' ? contentType : 'json';

        // Use the status code returned from the handler, or set the default status code to 200
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;


        // Return the response parts that are content-specific
        var payloadString = '';
        if (contentType == 'json') {
            // Use the payload returned from the handler, or set the default payload to an empty object
            payload = typeof(payload) == 'object'? payload : {};
            payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
        
        };

        if (contentType == 'html') {
            // console.log("SERVER : ",payload);
            payloadString = typeof(payload) == 'string'? payload : '';
            res.setHeader('Content-Type', 'text/html');
        };

        if (contentType == 'favicon') {
            // console.log("SERVER : ",payload);
            payloadString = typeof(payload) != undefined ? payload : '';
            res.setHeader('Content-Type', 'image/x-icon');
        };

        if (contentType == 'css') {
            // console.log("SERVER : ",payload);
            payloadString = typeof(payload) != undefined ? payload : '';
            res.setHeader('Content-Type', 'text/css');
        };


        if (contentType == 'jpg') {
            // console.log("SERVER : ",payload);
            payloadString = typeof(payload) != undefined ? payload : '';
            res.setHeader('Content-Type', 'image/jpeg');
        };

        if (contentType == 'png') {
            // console.log("SERVER : ",payload);
            payloadString = typeof(payload) != undefined ? payload : '';
            res.setHeader('Content-Type', 'image/png');
        };

        if (contentType == 'plain') {
            // console.log("SERVER : ",payload);
            payloadString = typeof(payload) != undefined ? payload : '';
            res.setHeader('Content-Type', 'text/plain');
        };

     
        // return the response parts that are common to all content-types
        res.writeHead(statusCode);
        res.end(payloadString);


        
          
        if (statusCode == 200) {
          // in GREEN text
          debug('\x1b[32m%s\x1b[0m', method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
        } else {
          // in RED text
          debug('\x1b[31m%s\x1b[0m', method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
        };
      });

  });
};

// Define the request router
server.router = {
  '' : handlers.index,
  'account/create' : handlers.accountCreate,
  'account/edit': handlers.accountEdit,
  'account/deleted': handlers.accountDeleted,
  'session/create': handlers.sessionCreate,
  'session/deleted': handlers.sessionDeleted,
  'api/users' : handlers.users,
  'api/tokens' : handlers.tokens,
  'api/menu': handlers.menu,
  'api/cart': handlers.cart,
  'api/orders':handlers.orders,
  'api/pay':handlers.pay,
  'api/sendmail':handlers.sendmail,
  'favicon.ico' : handlers.favicon,
  'public': handlers.public
};

// init script
server.init = function(){
    // Start the HTTP server
    server.httpServer.listen(config.httpPort,function(){
        console.log('\x1b[36m%s\x1b[0m','The HTTP  server is running on port '+config.httpPort);
    });

    // Start the HTTPS server
    server.httpsServer.listen(config.httpsPort,function(){
        console.log('\x1b[35m%s\x1b[0m','The HTTPS server is running on port '+config.httpsPort);
    });
};

// Export the module
module.exports = server;
