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
helpers.sendTwilioSms = function(phone, msg, callback) {
	// validate params
	phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
	msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length > 0 ? msg.trim() : false;

	if (msg && phone) {
		// config request payload to send to twilio
		var payload = {
			'From':config.twilio.fromPhone,
			'To': '+91'+phone,
			'Body': msg 
		};
		// stingify he payload
		var stringPayload = querystring.stringify(payload);
		// configure request details
		var requestDetails = {
			'protocol':'https:',
			'hostname':'api.twilio.com',
			'methon':'POST',
			'path': '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
			'auth': config.twilio.accountSid+':'+config.twilio.authToken,
			'headers': {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(stringPayload)
			}
		};
		//instantiate request object
		var req = https.request(requestDetails,function(res){
			// grab the status of sent request
			var status = res.statusCode;
			//call back succfully if the request went thru
			if (status = 200 || status == 201) {
				callback(false);
			} else {
				callback('status code returned was'+status);
			}
		});

		// bind to the error event so that it does not get thrown
		req.on('error', function(e){
			callback(e); 
		})

		// add the payload
		req.write(stringPayload);

		// end the request - at this point the request gets send.
		req.end();

	} else {
		callback('Given parameters were missing or invalid')
	}

};















// export the module
module.exports = helpers;
