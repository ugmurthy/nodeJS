/*
* Create and export configuration variables
*/

// container for all the environments
var environments = {};
// environment variables for mail automation
// environment variables for mail automation
var mailgun = {'name':'mailgun','user':'MAILGUN_USER','secretKey':'MAILGUN_KEY'}
var mailjet = {'name':'mailjet','user':'MJ_APIKEY_PUBLIC','secretKey':'MJ_APIKEY_PRIVATE'};

// stating (default) environments
environments.staging = {
	'httpPort' : 3000,
	 'httpsPort' : 3001,
	'envName' : 'staging',
	'hashingSecret': 'thisIsASecret',
	'maxChecks': 5,
	'maxLineItems':5,
	'emailAutomation': {},
	'mailgun':mailgun,
	'mailjet':mailjet
};

environments.production = {
	'httpPort' : 5000,
	'httpsPort' : 5001,
	'envName' : 'production',
	'hashingSecret' : 'thisIsAlsoASecret',
	'maxChecks': 5,
	'maxLineItems':5,
	'emailAutomation':{},
	'mailgun':mailgun,
	'mailjet':mailjet
};


// determine which one environment was passed as command line argument
var currentEnvironment 
	= typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '' ;

// check if that current environment is one of the valid environments, if not, default to statging
var environmentToExport 
	= typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging ;


var whichEmail = typeof(process.env.NODE_EMAIL) == 'string' 
	&& process.env.NODE_EMAIL.length == 7
		? process.env.NODE_EMAIL
		: 'mailgun'

environmentToExport.emailAutomation = environmentToExport[whichEmail];

// export the module
module.exports = environmentToExport;
