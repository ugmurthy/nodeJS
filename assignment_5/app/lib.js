//#
//# functions that will be tested by test runner
//#

// container for lib
var lib = {};

// helper func for test runner
lib.getANumber = function() {
	return 1;
}

lib.addNumbers = function(a,b) {
	return a+b;
}

lib.throwsError = function() {
	return a;
}
// export the module
module.exports = lib;

