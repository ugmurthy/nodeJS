////// IGNORE THIS FILE FOR ASSIGNMENT #2
////// This file has been to compare two functions
////// 1, chargeTheCard and
////// 2. cardPayment
////// while both look identical - one of them works (return right status code) while the other
///// always returns false. - nned to look for difference and understand reason




helpers.chargeTheCard = function(phone,msg,amount,callback){
  // Validate parameters
  amount = typeof(amount) == 'number' && amount > 100 ? amount : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 100 ? msg.trim() : false;
  if(phone && msg){

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
      'auth': config.stripe.sk+'a',
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




/////////





///////////// DELETE
helpers.cardPayment = function(phone, msg,amount, callback) {
  // validate params
  amount = typeof(amount) == 'number' && amount > 100 ? amount : false;
  msg = typeof(msg) == 'string' 
    && msg.trim().length > 0 
      ? msg.trim() 
      : false;

  if (msg && amount) {
    // config request payload to send to twilio
    var payload = {
      'amount':amount,
      'currency':'usd',
      'description':msg,
      'source':'tok_visa'
    };
    
    // stingify he payload
    var stringPayload = querystring.stringify(payload);
    // configure request details
    var requestDetails = {
      'protocol':'https:',
      'hostname':'api.stripe.com',
      'method':'POST',
      'path': '/v1/charges',
      'auth': config.stripe.sk+'a',
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
        console.log("STATUSCODE: ",status);
        callback(status);
      }
    });

    // bind to the error event so that it does not get thrown
    req.on('error', function(e){
      callback(e); 
    });

    // add the payload
    req.write(stringPayload);

    // end the request - at this point the request gets send.
    req.end();

  } else {
    callback('Given parameters were missing or invalid '+amount+' ',msg);
  }

};











