// TEST CARD PAYMENT 

var helpers = require('./lib/helpers');


message = "ORDER ID : ";
amount = "OrderAmount"


helpers.chargeTheCard("NodePayment-Final",3333, function(err){
	console.log("ERROR: ",err);
	if (!err) {
		console.log(helpers.green,"PAYMENT Successful")
	} else {
		console.log(helpers.red,"PAYMENT unsuccessful statusCode: "+err);
	}
});



