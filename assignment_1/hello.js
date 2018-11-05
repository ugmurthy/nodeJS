/* 
 * ASSIGNMENT #1
 * date : 31/OCT/2018
 * "Hello World" API. Meaning:
 * 1. It should be a RESTful JSON API that listens on a port of your choice. 

 * 2. When someone posts anything to the route /hello, you should return a welcome message, 
      in JSON format. This message can be anything you want. 

* Specification:
* 1. HTTP server listens to port of my choice (specified via NODE_ENV, default is 3000)
* 2. Responds only to route /hello and method = POST
* 3. Ensure route is case independent
* 4. Response is a JSON string ensure this is indicated in response HEADERS
* 5. return status code 200 to indicate OK
* 6. for non /hello routes respond 404, and empty JSON response {}
* 7. for /route but method != POST respond with empty JSON string {}
*/

// Dependencies

var http = require('http');
var url = require ('url');
var StringDecoder = require('string_decoder').StringDecoder;


// the server should respond to POST with a string 

var server = http.createServer(function(req,res){

	// get url and parse it
	var parsedUrl = url.parse(req.url, true);
	// get the path from url
	var path = parsedUrl.pathname
	// and clean it
	var trimmedPath = path.replace(/^\/+|\/+$/g,"");
	// make it independent of case 
	trimmedPath = trimmedPath.toLowerCase();

	// get query string as a json object if any
	var queryStringObject = parsedUrl.query;

	// get HTTP methond
	var method = req.method.toUpperCase();

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

		// set the handler based on route
		var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

		// assemble response object
		var data = {
			'title' : 'Assignment #1',
			'route' : path,
			'query' : queryStringObject,
			'method' : method,
			'headers': headers, 
			'buffer' : buffer
		};
	
		// route it to handler
		chosenHandler(data,function(statusCode,payload){

	  		// Use the status code returned from the handler, or set the default status code to 200
	  		statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

	  		// Use the payload returned from the handler, or set the default payload to an empty object
	  		payload = typeof(payload) == 'object'? payload : {};

	  		// Convert the payload to a string
	  		var payloadString = JSON.stringify(payload);

	  		// Return the JSON response & status code
	  		res.setHeader('Content-Type', 'application/json');
	  		res.writeHead(statusCode);
	  		res.end(payloadString);
	  
	  		console.log("[INFO] payloadString:\n", payloadString);	
		});	
	});
});

// default port (3000) can be overidded by NOCE_ENV=nnnnn
// nnnnn = port number
var port = 3000 ;


var currentPort = typeof(process.env.NODE_ENV) != 'undefined' ? Number(process.env.NODE_ENV) : port ;
// ensure NODE_ENV is not set to a non number
currentPort = isNaN(currentPort) ? port : currentPort;

server.listen(currentPort, function(){
	console.log("The Assignment #1 Server listening on port : ",currentPort);
});

// Define all the handlers
var handlers = {};

// Ping handler
handlers.hello = function(data,callback){
	// RESPOND to POST method only
	payload = (data['method'] == 'POST') ? data : {};
    callback(200,payload);
};

// Not-Found handler
handlers.notFound = function(data,callback){
  callback(404);
};

// Define the request router
var router = {
  'hello' : handlers.hello
};
