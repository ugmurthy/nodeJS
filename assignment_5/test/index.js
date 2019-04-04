/*
* Test runner
*
*/

// dependencies
var assert = require('assert');


// Application logic for the test runner
_app = {};

// container for the tests
_app.tests = {};

// Container for 'unit' tests
_app.tests.unit = require('./unit');

// could add a container for other kinds of test such as 'api'
// _app.test.api = require('./api');

// counts the total number of tests
_app.countTests = function(){
	var counter = 0;
	for (var key in _app.tests) {
		if (_app.tests.hasOwnProperty(key)){
			var subTests = _app.tests[key];
			for (var testName in subTests) {
				if (subTests.hasOwnProperty(testName)){
					counter++;
				}
			}
		}
	}
	return counter;
};

// Run all the test, collecting the errors and successes
_app.runTests = function() {
	var errors = [];
	var successes = 0;
	var limit = _app.countTests();
	var counter = 0;

	for (var key in _app.tests) {
		if (_app.tests.hasOwnProperty(key)){
			subTests = _app.tests[key];
			for (var testName in subTests) {
				if (subTests.hasOwnProperty(testName)) {

					(function(){
						var tmpTestName = testName;
						var testValue = subTests[testName];

						// call the test
						try {
							testValue(function(){
								// if it calls back without throwing then it suceeded, so log it in green
								console.log('\x1b[32m%s\x1b[0m',tmpTestName);
								counter++;
								successes++;
								if (counter == limit) {
									_app.produceTestReport(limit, successes, errors);
								}
							})
						} catch(e) {
							// if its throws, then it failed, so caputure the error and log
							errors.push({
								'name' :  testName,
								'error': e
							});
							console.log('\x1b[31m%s\x1b[0m',tmpTestName);
							counter++;
							if (counter == limit) {
									_app.produceTestReport(limit, successes, errors);
							} 
						}
					})();
				}
			}
		}
	}
}

// produce test reports
_app.produceTestReport = function(limit,successes,errors) {
	console.log("");
	console.log("---------------TEST REPORT----------------");
	console.log("");
	console.log("Total Tests :", limit);
	console.log("---Tests passed : ",successes);
	console.log("---Tests failed : ",errors.length);
	console.log("");

	if (errors.length > 0 ) {
		console.log("---BEGIN ERROR DETAILS");
		console.log("");
		errors.forEach(function(testError){
			console.log('\x1b[31m%s\x1b[0m',testError.name);
			console.log(testError.error);
			console.log("");
		})
		console.log("");
		console.log("---END ERROR DETAILS---");
	}

	console.log("");
	console.log("");
	console.log("Total Tests :", limit);
	console.log("---Tests passed : ",successes);
	console.log("---Tests failed : ",errors.length);
	console.log("");
	console.log("-------------TEST REPORT ENDS -------------");
	process.exit(0);
}

_app.runTests();


