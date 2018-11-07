// HELPERS for various functions

// dependencies
var crypto = require('crypto');
var config = require('./config');
var querystring = require('querystring');
var https = require('https');

// container or all the helpers
var helpers = {};

helpers.red = '\x1b[31m%s\x1b[0m';
helpers.green = '\x1b[32m%s\x1b[0m';

helpers.hash = function(str) {
	if (typeof(str) == 'string' && str.length > 0) {
		var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
		//var hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
		return hash
	} else {
		return false;
	}
};

// partse a JSON string to an object in all case without throwing
helpers.parseJsonToObject = function(str){
	try {
		var obj = JSON.parse(str);
		return obj;
	} catch(e) {
		return {};
	}
};

// create a string of random alpha-num chars of given length
helpers.createRandomString = function(strLength) {
	strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
	if (strLength) {
		// define all the possible chars that could go into a string
		var possibleCharacters = 'abscedfghijklmnopqrstuvwxyz01234567890'
		// start the final string
		var str = '';
		for (i = 0; i < strLength ; i++) {
			// get random char from possible chars
			var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
			// append char to final str
			//console.log(str, randomCharacter);
			str += randomCharacter;
		}
		return str;
		
	} else {
		return false;
	}
}

// send an SMS message via Twilio
helpers.sendTwilioSms = function(phone,msg,callback){
  // Validate parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
  if(phone && msg){

    // Configure the request payload
    var payload = {
      'From' : config.twilio.fromPhone,
      'To' : '+1'+phone,
      'Body' : msg
    };
    var stringPayload = querystring.stringify(payload);


    // Configure the request details
    var requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.twilio.com',
      'method' : 'POST',
      'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
      'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    var req = https.request(requestDetails,function(res){
        // Grab the status of the sent request
        var status =  res.statusCode;
        // Callback successfully if the request went through
        if(status == 200 || status == 201){
          callback(false);
        } else {
          callback('Status code returned was '+status);
        }
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',function(e){
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();

  } else {
    callback('Given parameters were missing or invalid');
  }
};


helpers.chargeTheCard = function(phone,msg,amount,callback){
  // Validate parameters
  amount = typeof(amount) == 'number' && amount > 100 ? amount : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 100 ? msg.trim() : false;
  if(amount && msg){

    // Configure the request payload
    var payload = {
      'amount':amount,
      'currency':'usd',
      'description':msg,
      'source':'tok_visa'
    };
    
    var stringPayload = querystring.stringify(payload);


    // Configure the request details
    var requestDetails = {
      'protocol':'https:',
      'hostname':'api.stripe.com',
      'method':'POST',
      'path': '/v1/charges',
      'auth': config.stripe.sk,
      'headers': {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    var req = https.request(requestDetails,function(res){
        // Grab the status of the sent request
        var status =  res.statusCode;
        // Callback successfully if the request went through
        if(status == 200 || status == 201){
          callback(false);
        } else {
          callback('Status code returned was '+status);
        }
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',function(e){
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();

  } else {
    callback('Given parameters were missing or invalid');
  }
};










// export the module
module.exports = helpers;
