/*
*
* UNIT TESTS
*/


// dependencies
var lib = require('./../app/lib');
var assert = require('assert');


var unit = {}

// Assert that getANumber should return a 1
unit['001 lib.getANumber should return a 1'] = function(done) {
	var val = lib.getANumber();
	assert.equal(val,1);
	done();
};
// Assert that getANumber should return a 2
unit['002 lib.getANumber should return a 2'] = function(done) {
	var val = lib.getANumber();
	assert.equal(val,2);
	done();
};
unit['003 lib addNumbers returns a number'] = function(done) {
	var val = lib.addNumbers(10,20);
	assert.equal(typeof(val),'number');
	done();
}
// equal as in '=='   where 10 is same as '10'
unit['004 lib addNumbers returns 30'] = function(done) {
	var val = lib.addNumbers(10,20);
	assert.equal(val,30);
	assert.equal(val,'30');

	done();
}
unit['005 lib addNumbers returns 20'] = function(done) {
	var val = lib.addNumbers(10,'10APPLES');
	assert.equal(val,20);
	done();
}
// strictEqual as in '===' where 20 is not same as '20'
unit['006 lib addNumbers returns a number and is 20 but not "20" '] = function(done) {
	var val = lib.addNumbers(10,10);
	assert.equal(typeof(val),'number');
	assert.equal(val,20);
	assert.strictEqual(val,'20');
	done();
}
unit['007 should throw Error'] = function(done) {
	assert.doesNotThrow(function(){
		lib.throwsError()
		done();
	}, ReferenceError,'Aha');
}
// Export
module.exports = unit;
