/*
* Create and export configuration variables
*/

// container for all the environments
var environments = {};

// stating (default) environments
environments.staging = {
	'httpPort' : 3000,
	 'httpsPort' : 3001,
	'envName' : 'staging',
	'hashingSecret': 'thisIsASecret',
	'maxChecks': 5,
	'maxLineItems':5,
	'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15095550006'
  	},
  	'stripe' : {
  		'sk': 'sk_test_dgkI90d3LsUKf5IBQ07ZMbYB'
  	},
  	'mailgun' : {
  		'api':'api:Ya9dd35642a3de4f02bc39e18831c7160-4412457b-a89e681e'
  	}
};

environments.production = {
	'httpPort' : 5000,
	'httpsPort' : 5001,
	'envName' : 'production',
	'hashingSecret' : 'thisIsAlsoASecret',
	'maxChecks': 5,
	'maxLineItems':5,
	'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  	},
  'stripe' : {
  		'sk': 'sk_test_dgkI90d3LsUKf5IBQ07ZMbYB'
  	},
  	'mailgun' : {
  		'api':'api:Ya9dd35642a3de4f02bc39e18831c7160-4412457b-a89e681e'
  	}
};

// determine which one environment was passed as command line argument
var currentEnvironment 
	= typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '' ;

// check if that current environment is one of the valid environments, if not, default to statging
var environmentToExport 
	= typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging ;

// export the module
module.exports = environmentToExport;
