// HELPERS for various functions

// dependencies
var crypto = require('crypto');
var config = require('./config');
var querystring = require('querystring');
var https = require('https');
var util = require('util');
var debug = util.debuglog('helpers');
var path = require('path');
var fs = require('fs');


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


helpers.chargeTheCard = function(msg,amount,callback){
  // Validate parameters
  amount = typeof(amount) == 'number' && amount > 100 ? amount : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 100 ? msg.trim() : false;
  var secret =process.env[config.stripe.sk]

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
      'auth': secret,
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



helpers.sendEmail = function(emailData,callback){
  // Validate parameter
  
  var payload = typeof(emailData) == 'object' ? emailData : false; 

  if(payload){

    // Get mail automation details
    var user = process.env[config.emailAutomation.user]
    var secret =process.env[config.emailAutomation.secretKey]
    var emailAutomation = config.emailAutomation.name
    // form basic auth string as base64 encoded
    var auth='Basic '+new Buffer(user+':'+secret).toString('base64')

    if (user && secret && emailAutomation) {
        
        // check which mail automation are we using and prepare request details
        if (emailAutomation == 'mailjet') {
          // for MAILJET
          var stringPayload = JSON.stringify(payload);
          var requestDetails = {
            'protocol':'https:',
            'hostname':'api.mailjet.com',
            'method':'POST',
            'path': '/v3/send',
            'headers': {
              'Content-Type' : 'application/json',
              'Content-Length': Buffer.byteLength(stringPayload),
              'Authorization' : auth
            }
          } 
        }

        if (emailAutomation == 'mailgun') {
          // for MAILGUN
          var stringPayload = querystring.stringify(payload);

          var requestDetails = {
            'protocol':'https:',
            'hostname':'api.mailgun.net',
            'method':'POST',
            'path': '/v3/sandbox0862e159ec674343808d4d883af0bbaf.mailgun.org/messages',
            'headers': {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(stringPayload),
              'Authorization' : auth
            }
          };

        }

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
      console.log(user,secret,emailAutomation);
      // API keys missing or mailautomation not specified
      callback("API keys not available or mail automation missing")
    }
  } else {

    callback('Given parameters were missing or invalid');
  }  
    
};

// Get the string content of a template from templates directory
helpers.getTemplate = function(templateName, data, callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false
  data = typeof(data) == 'object' && data != null ? data : {};

  if (templateName) {
    var templateDir = path.join(__dirname,'/../templates/');
    var filename = templateDir+templateName+'.html';
    
    fs.readFile(filename, 'utf-8', function(err,str){
      if (!err && str) {
        var finalString = helpers.interpolate(str,data);
        callback(false,finalString);
      } else {
        callback("No template could be found")
      }
    });
  } else {
    callback("A valid template was not specified");
  }
};

helpers.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data != null ? data : {};

  // add the templateGlobals to the data object, prepending their keyname with 'globals'
  for (var keyName in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyName)) {
      data['global.'+keyName] = config.templateGlobals[keyName];

    }
  }
  // console.log(JSON.stringify(data));
  // for each key in data object, inserts it value into string at the correspondng location
  for (var key in data) {
    if (data.hasOwnProperty(key) && typeof(data[key]) =='string') {
      var replace = data[key];
      var find = '{'+key+"}";

      str = str.replace(find,replace);
    }
  }
  return str;
};

// Add the universal header and footer to a string
helpers.addUniversalTemplates = function(str,data,callback) {
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data != null ? data : {};
  // get header
  helpers.getTemplate('_header',data,function(err,headerString){
    if (!err && headerString) {
      // get footer
      helpers.getTemplate('_footer',data,function(err,footerString){
        if (!err && footerString) {
          var fullString = headerString+str+footerString;
          callback(false,fullString);
        } else {
          callback("Count not find footer template")
        }
      })
    } else {
      callback("Could not find header template")
    }
  })
};

helpers.getStaticAsset = function(fileName,callback) {
  fileName = typeof(fileName) == 'string' && fileName.length>0 ? fileName : false;
  if (fileName) {
    var publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir+fileName,function(err,data){
      if (!err && data ) {
        callback(false,data);
      } else {
        callback("No file exists");
      }
    });
  } else {
    callback("A valid file name was not specified")
  }
}


// export the module
module.exports = helpers;
