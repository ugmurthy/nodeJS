// TEST CARD PAYMENT 

var helpers = require('./lib/helpers');



helpers.chargeTheCard('9990099900', "NodePayment-Final",3333, function(err){
	console.log("ERROR: ",err);
	if (!err) {
		console.log(helpers.green,"PAYMENT Successful")
	} else {
		console.log(helpers.red,"PAYMENT unsuccessful statusCode: "+err);
	}
});



