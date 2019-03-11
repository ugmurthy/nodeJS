/*
** CLI related tasks
*/

// Dependencies

var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');

class _events extends events{};
var e = new _events();

var os = require('os');
var v8 = require('v8');
var _data = require('./data');
var fs = require('fs');

// to ensure we get a stack trace 
process.on('warning', e => console.warn(e.stack));

// Instantiates CLI module objects


// HANDLERS
var cli = {};

// input handlers
e.on('man',function(str){
	cli.responders.help();
});
e.on('help',function(str){
	cli.responders.help();
});

e.on('exit',function(str){
	cli.responders.exit();
});

e.on('list users',function(str){
	cli.responders.listUsers();
});

e.on('more user info',function(str){
	cli.responders.moreUserInfo(str);
});

e.on('list orders',function(str){
	cli.responders.listOrders();
});

e.on('more order info',function(str){
	cli.responders.moreOrderInfo(str);
});

e.on('list menu',function(str){
	cli.responders.listMenu();
});



// RESPONDERS
cli.responders = {}

// LIST USERS
cli.responders.listUsers = function(){
	_data.list('users', function(err,userIds){
		if (!err && userIds && userIds.length>0) {
			cli.verticalSpace()
			userIds.forEach(function(userId){
				_data.read('users',userId, function(err,userData){
					if (!err && userData) {
						var line = 	'Name: '+userData.fullName+' <'+userData.email+'>\t'+
									'Phone: '+userData.phone
						console.log(line);
						cli.verticalSpace(1);
					}
				});
			
			});
		}
	});
};

cli.lessThan24Hours = function(userId) {
	var age = false;
	_data.stats('users',userId, function(err,stats){
		if (!err && stats) {
			// check if age is less than 24 hours
			var ageInHours = (Date.now() - stats.birthtimeMs)/1000/60/60;
			console.log(Date.now(),stats.birthtimeMs)
			console.log(ageInHours)
			if (ageInHours < 24.0) {
				age = true;
			} else {
				age = false;
			}	
		} else {
			age = false;
		}
	});
	return age;
}

cli.responders.moreUserInfo = function(str) {
	// Get the id from the string str
	var arr = str.split('--');
	var userEmail = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
	
	_data.list('users', function(err,userIds){
		if (!err && userIds && userIds.length>0) {
			cli.verticalSpace()
			userIds.forEach(function(userId){
				_data.read('users',userId, function(err,userData){
					if (!err && userData) {
						if (userData.email == userEmail) {
							// we have the required user
							// check age

							_data.stats('users',userId, function(err,stats){
								if (!err && stats) {
									// we have stats
									var ageInHours = (Date.now() - stats.birthtimeMs)/1000/60/60;
									if (ageInHours < 24.0) {
										var line = 	'Name :\t\t'+userData.fullName+' <'+userData.email+'>\n'+
												'Phone :\t\t'+userData.phone + '\n' +
												'Address :\t'+userData.streetAddress +'\n'+
												'Total orders :\t'+userData.orders.length
										console.log(line);
									} else {
										console.log("old users")
									}
								} else {
									// no stats
									console.log("Error: No file stats available for : ", userId);
								}
							});
							
						}
						
					}
				});
			
			});
		}
	});

};


// HELP / man
cli.responders.help = function(){
	var commands = {
			'exit': 'Kill the CLI (and the rest of the application',
			'man' : 'Show this help page',
			'help': 'Alias for man command',
			'list users':'show a list of all user registered in last 24 hrs',
			'more user info --{emailID}': 'Show details of a user given emailID',
			'list menu': 'Show a list of all active check in the system --up, --down are optional',
			'list orders':'Show all order placed in the past 24 hours',
			'more order info --{orderID}':'Show order details given orderID'
		}
	// Show a header for the help page that is as wide as the screen
	cli.horizontalLine();
	cli.centered('CLI MANUAL');
	cli.horizontalLine();
	cli.verticalSpace(2);

	//show each command followed by its explanation in white and yellow respectively 
	for (var key in commands) {
		if (commands.hasOwnProperty(key)) {
			var value = commands[key];
			var line = '\x1b[33m'+key+'\x1b[0m'
			var padding = 60-line.length
			for (var i = 0; i < padding; i++) {
				line+=' ';
			}
				line += value;
				console.log(line);
				cli.verticalSpace(1);			
		}
	}
	cli.verticalSpace(1);

	cli.horizontalLine();

};

// Vertical space
cli.verticalSpace = function(lines) {
	lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
	for (var i = 0; i<lines; i++) {
		console.log('\n');
	}
}

// horizontal line
cli.horizontalLine = function(){
	// get console.widht
	var width = process.stdout.columns;

	var line = '';
	for (var i = 0; i < width; i++) {
		line += '-';
	}
	console.log(line);
}

// Create centered text
cli.centered = function(str) {
	str = typeof(str) == 'string' && str.length > 0 ? str : '';

	var width = process.stdout.columns;

	// calculate left padding 
	var leftPadding = Math.floor((width - str.length) / 2);
	var line = '';
	for (var i = 0; i < leftPadding; i++) {
		line += ' ';
	}
	line = line + str;
	console.log(line);
}
// EXIT
cli.responders.exit = function(){
	process.exit(0);
}


// PROCESS INPUT
// input processor
cli.processInput = function(str) {
	str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;

	if (str) {
		// codify unique input strings
		var uniqueInputs =[
			'man',
			'help',
			'exit',
			'list users',
			'more user info',
			'list menu',
			'list orders',
			'more order info'
		];

		// go through possible inputs, emit an event when a match is found
		var matchFound = false;
		var counter =0
		uniqueInputs.some(function(input){
			if (str.toLowerCase().indexOf(input) > -1) {
				matchFound = true;
				// emit an event matching the uniqu input and include full string
				e.emit(input,str);
				return true;
			}
		});

		// if no match found, let the user know
		if (!matchFound) {
			console.log("Sorry, try again");
		}
	}
}




cli.init = function() {
	// Start message to console in dark blue
	console.log('\x1b[34m%s\x1b[0m','The CLI is running');

	// start the interface
	var _interface = readline.createInterface({
	 	input: process.stdin,
	 	output: process.stdout,
	 	prompt: '\x1b[34m'+'>> '+'\x1b[0m'

	});

	// create the prompt
	_interface.prompt();

	// handle each line of input separately
	_interface.on('line',function(str){
		// send to the str to input processor
		cli.processInput(str);

		// re-initialise prompt
		_interface.prompt();

		// if the user stops the CLI, kill the associated process
		_interface.on('close', function() {
			process.exit(0);
		});
	});
};


// EXPORT THE MODULE
module.exports = cli;
