// TEST SENDEMAIL  

var helpers = require('./lib/helpers');


email = 'artofrunning@gmail.com'
msg = 'Dear '+'fullName',+
		+'\n'
		+'Thank you for your order number : xxxxxxxxxxx for Pizzas.\n'
		+'Pizzas will be delivered in 60 the next 60 minutes.\n'
		+'\n'
		+'Enjoy!\n'
		+'\n'
		+'Look forwards to your feeback\n'
		+'\n'
		+'Regards\n' 
		+'PIRPLE Pizzas\n'

orderData = {'orderId':'aas12332sds33mngbs45','orderAmount':300.00}


helpers.sendEmail(email,msg,orderData,function(err){
	console.log("ERROR: ",err);
	if (!err) {
		console.log(helpers.green,"Email SENT Successflly")
	} else {
		console.log(helpers.red,"SENDMAIL unsuccessful statusCode: "+err);
	}
});

