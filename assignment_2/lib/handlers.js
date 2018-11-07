// REQUEST HANDLERS

//dependencies
var _data = require('./data'); 
var helpers = require('./helpers');
var config = require('./config');
var util = require('util');
var debug = util.debuglog('handlers');
// Define all the handlers
var handlers = {};


// CART handler
handlers.cart = function(data, callback) {
	var acceptableMethods = ['post','get','put','delete'];
	if (acceptableMethods.indexOf(data.method) > -1){
		handlers._cart[data.method](data,callback);
	} else {
		// 405 is method not acceptable
		callback(405);
	}
};


// container for cart sub method
handlers._cart = {};

// cart - POST
handlers._cart.post = function(data, callback) {
	// check menuIndex is a number
	var menuIndex = typeof(data.payload.menuIndex) == 'string' 
		&& parseInt(data.payload.menuIndex) > -1
			? data.payload.menuIndex
			: false ;

	// How many?
	var quantity = typeof(data.payload.quantity) == 'string' 
		&& parseInt(data.payload.quantity) > 0 
			? data.payload.quantity.trim()
			: false ;

	debug("menuIndex", menuIndex);
	debug("quantity",quantity);

	if (menuIndex && quantity) {
		// we know what is needed and how many
		// check who is asking by checking token in headers
		var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
		// look up token to get user
		_data.read('tokens',token,function(err,tokenData){

			if (!err && tokenData) {
				debug("token found",tokenData);
				var userPhone = tokenData.phone;
				// look up user to see if we have a cart
				_data.read('users',userPhone,function(err,userData){
					if (!err && userData) {
						debug("user found",userData.phone);
						// check if we have a cart if not set it to empty (false)
						var userCartId =  typeof(userData.userCartId) == 'string' 
							&& userData.userCartId.trim().length == 20
								? userData.userCartId.trim()
								: false;
						// ASSUMPTION: user can have atmost only one cart at anytime
						if (!userCartId) {
							// create cart
							userCartId = helpers.createRandomString(20);
							// update user record with userCartId
							userData.userCartId = userCartId;
							// store it to file
							_data.update('users',userPhone,userData,function(err){
								if (err) {
									callback(500,{"error":"Could not update users"});
								}
							});
						} 

						// lookup cart
						_data.read('cart',userCartId,function(err,cartData){
							if (err) {
								// populate cart object as have an empty cart
								var cartData = {};
								cartData.cartId = userCartId;
								cartData.phone = userPhone;
								cartData.lineItems = [] 
								// create an empty card for user
								_data.create('cart',cartData.cartId,cartData,function(err){
									if (err) {
										callback(500,{"error":"Could not create Cart"});
									}
								});
							} 
							debug("Cart ",cartData);
							// lookup menuitem to add
							_data.read('menu',menuIndex,function(err,menuItem){
								if (!err && menuItem) {
									debug("menuIndex",menuItem.menuIndex)
									// add menu item to lineItems of cart

									var item = {};
									item.menuIndex = menuItem.menuIndex
									item.name = menuItem.name;
									item.price = menuItem.price;
									item.quantity = quantity
									// update cart object: update quantity if we already have this item
									// get menuIndices from lineItems in cartData as an array 
									var menuIndexInLineItems = [];
									cartData.lineItems.forEach(function(lineItem) {
										menuIndexInLineItems.push(lineItem.menuIndex)
									});
									// check if item.menIndex is in cart
									var positionOfNewItem = menuIndexInLineItems.indexOf(item.menuIndex)
									if (positionOfNewItem != -1 ) {
										// we have this item in cart - update quantity
										var tmp = parseInt(cartData.lineItems[positionOfNewItem].quantity) 
										+ parseInt(item.quantity);
										cartData.lineItems[positionOfNewItem].quantity = String(tmp);
										debug("Quantity Updated");
									} else {
										// add the item to lineItems
										cartData.lineItems.push(item);
										debug("Pushed new lineItem");
									}
									if (cartData.lineItems.length <= config.maxLineItems) {
										// store cart object to file
										_data.update('cart',cartData.cartId,cartData,function(err){
											if (!err) {
												callback(200,cartData);
											} else {
												callback(500,{"error":"Could not update Cart"});
											}
										});
									} else {
										callback(400,{"error":"Exceeds max lineItems in Cart"});
									}
								} else {
									callback(404);
								}
							});	
						});
					} else {
						// not authorised - token / user mismatch
						callback(403,{"error":"unauthorised request - rejected"});
					}
				}); 
			} else {
				// not authorised
				callback(403,{"error":"unauthorised request - rejected"});
			}
		});
	} else {
		callback(400,{"error":"Missing or invalid field/s"});
	}

};

// cart - GET
handlers._cart.get = function(data, callback) {
	// who is asking?
	var phone = typeof(data.queryStringObject.phone) == 'string' &&
			data.queryStringObject.phone.trim().length == 10 
			? data.queryStringObject.phone.trim()
			: false ;
	

	if (phone) {
		// ensure the token corresponds to the user requesting cart
		var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
		handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
			if (tokenIsValid) {
				// fetch cartId from user
				_data.read('users',phone,function(err,userData){
					if (!err && userData) {
						// check cartId in userData
						var userCartId = typeof(userData.userCartId) == 'string' 
							&& userData.userCartId.trim().length == 20
							? userData.userCartId.trim()
							: false;
						if (userCartId) {
							// get cart using userCartId
							_data.read('cart',userCartId,function(err,cartData){
								if (!err && cartData) {
									callback(200,cartData);
								} else {
									callback(500,{'error':'userCartId exists but no cart with that id'});
								}
							})

						} else {
							callback(400,{'error':'user does not have a cart'})
						}

					} else {
						callback(404);
					}
				});
			} else {
				callback(403,{"error":"unauthorised request - rejected"})
			}
		});
	} else {
		callback(400,{"error":"Missing or invalid field"})
	}

};

// cart - PUT
handlers._cart.put = function(data, callback) {
	// who is asking?
	debug("payload", data.payload)
	var phone = typeof(data.payload.phone) == 'string' &&
			data.payload.phone.trim().length == 10 
			? data.payload.phone.trim()
			: false ;
	// check menuIndex is a number
	var menuIndex = typeof(data.payload.menuIndex) == 'string' 
		&& parseInt(data.payload.menuIndex) > -1
			? data.payload.menuIndex
			: false ;

	// How many?
	var quantity = typeof(data.payload.quantity) == 'string' 
		&& parseInt(data.payload.quantity) > 0 
			? data.payload.quantity.trim()
			: false ;

	debug("phone",phone);
	debug("menuItem",menuIndex);
	debug("quantity",quantity);

	if (phone) {
		// check token
		var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
		handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
			if (tokenIsValid) {
				// get cart for this user
				debug("Got Valid Token");
				_data.read('users',phone,function(err,userData){
					if (!err && userData) {
						debug("Got user")
						// fetch userCartId
						// but check if we have a cart if not set it to empty (false)
						var userCartId =  typeof(userData.userCartId) == 'string' 
							&& userData.userCartId.trim().length == 20
								? userData.userCartId.trim()
								: false;
						if (userCartId) {
							// get cartData
							debug("Got carId");
							_data.read('cart',userCartId,function(err,cartData){
								if (!err && cartData) {
									// get info on lineItems for further processing - an array of menuIndex in lineItems
									var menuIndexInLineItems = [];
									cartData.lineItems.forEach(function(lineItem) {
										menuIndexInLineItems.push(lineItem.menuIndex)
									});
									///////////////////////////////////////////
									if (menuIndex) {
									    // both present so modify quantity
									    // but first get the position of menuItem whose quantity is to be changed
									    var positionOfItem = menuIndexInLineItems.indexOf(menuIndex);
									    if (positionOfItem == -1) {
									        // we dont have the item to update
									        // this should not happen
									        callback(400,{"error":"Item does not exist in cart"});
									    }
									    
									    debug("Array of menuIndex",menuIndexInLineItems);
									    debug("position to delete",positionOfItem);

									    if (quantity) {
									        // update quantity
									        var tmp = parseInt(quantity);
									        cartData.lineItems[positionOfItem].quantity = String(tmp);
									    } else {
									        // quantity is false implies delete the line items for this menuIndex
									        cartData.lineItems.splice(positionOfItem,1);
									    }

									} else {    // menuIndex not specified
									    if (!quantity) {
									        // lineItems=[] ; delete all lineitems
									        cartData.lineItems=[];
									    } else {
									        callback(400,{"error":"Insufficient info for update"});
									    }
									}
									////////////////////////////////////////////
									// carData is ready for storage
									_data.update('cart',userCartId,cartData,function(err){
										if (!err) {
											callback(200,cartData);
										} else {
											callback(500,{"error":"Cart not found"})
										}
									});

								} else {
									callback(500,{"error":"userCartId exists but no associated cart"});	
								}
							});
						} else {
							callback(400,{"error":"User cart does not exist- nothing to update"});
						}
					} else {
						callback(500,{"error":"user not found"});
					}
				});

			} else {
				callback(403,{"error":"unauthorised request - rejected"})
			}
		})
	} else {
		callback(400,{"error":"Missing or invalid field"})
	} 

};


// cart - DELETE
handlers._cart.delete = function(data, callback) {

};

// end of CART Handler

// MENU : for now one can only get items from the menu
handlers.menu = function(data, callback) {
	var acceptableMethods = ['get'];
	if (acceptableMethods.indexOf(data.method) > -1){
		handlers._menu[data.method](data,callback);
	} else {
		// 405 is method not acceptable
		callback(405);
	}
};


// container for menu sub method
handlers._menu = {};

// handlers GET
// required field : menuIndex
handlers._menu.get = function(data,callback) {
	// check menuIndex is a number
	var menuIndex = typeof(data.queryStringObject.menuIndex) == 'string' 
		&& parseInt(data.queryStringObject.menuIndex) > -1
			? data.queryStringObject.menuIndex
			: false ;

	// who is asking?
	var phone = typeof(data.queryStringObject.phone) == 'string' &&
			data.queryStringObject.phone.trim().length == 10 
			? data.queryStringObject.phone.trim()
			: false ;

	if (phone) {
	    // check if there is a valid 'token' (i.e. belongs to a user and not expired)
	    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
	    // verfify that the give token is valid for the phone number (user)
	    handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
	        if (tokenIsValid) {
	            // user has valid token - read the menu item/s and return menuData
	            if (menuIndex) {
	                // get one item from menu indicated by menuIndex
	                _data.read('menu',menuIndex, function(err,menuData) {
	                    if (!err && menuData) {
	                        // we have a menu item
	                        callback(200,menuData)
	                    } else {
	                        // no items
	                        callback(404);
	                    }
	                });
	            } else {
	                // return all items
	                _data.list('menu',function(err,menuList){
	                    if (!err && menuList) {
	                        var allItems = [];
	                        var readError = false;
	                        var readErrorCount = 0;
	                        var menuData = false;

	                        for (i=0; i < menuList.length; i++) {
	                            menuListItem=menuList[i].trim();	                          
	                            menuData = _data.readSync('menu',menuListItem)	                            
                                if (menuData) {
                                    allItems.push(menuData);
                                } else {
                                    readError=true;
                                    readErrorCount=readErrorCount+1
                                }     
	                        }
	                        if (!readError) {
	                            callback(200,{"allMenuItems":allItems});	                         
	                        } else {
	                            callback(400,{'error':'reading menu '+readErrorCount+' time/s'});
	                        }
	                        
	                    } else {
	                        callback(400,{"error":"No menu items in menu"});
	                    }
	                });
	            } // menuIndes
	        } else {
	            callback(403,{"error":"unauthorised request - rejected"});
	        } // token is valid   
	    });
	} else {
	    callback(400,{'error':'Missing or invalid required field/s'});
	}
};

// GENERATE MENU files
handlers._menu.generate = function(menuItems,callback) {
	
	var idx=0
	menuItems.forEach(function(menuItem){
		
		menuItem.menuIndex=String(idx);
		_data.create('menu',menuItem.menuIndex,menuItem, function(err){
			if (!err) {
				console.log(helpers.green,"Success writing to "+menuItem.menuIndex+".json");
				callback(false);
			} else {
				console.log(helpers.red,"Error: Writing menuItem no", menuItem.menuIndex);
				callback(true);
			}
		});
		idx++
	});
};


// Users
handlers.users = function(data, callback) {
	var acceptableMethods = ['post', 'get', 'put','delete'];
	if (acceptableMethods.indexOf(data.method) > -1){
		handlers._users[data.method](data,callback);
	} else {
		// 405 is method not acceptable
		callback(405);
	}
};

// container for users sub methods
handlers._users = {};

// Users - POST
// required fields fullName, email, password, phone, tosAgreement
// optional data = None
handlers._users.post = function(data,callback) {
	// check all required field are filled out
	var fullName 
		= typeof(data.payload.fullName) == 'string' && data.payload.fullName.trim().length > 0 
		   		? data.payload.fullName.trim() 
		   		: false;

	var streetAddress 
		= typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 
		   		? data.payload.streetAddress.trim() 
		   		: false;

	// validate email address format	   		
	var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	result = data.payload.email.match(regex);
	var email = typeof(result) == 'object' 
		&& result != null 
			? result[0] 
			: false 
		   		
	var phone 
		= typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 
		   		? data.payload.phone.trim() 
		   		: false

	var password 
		= typeof(data.payload.password) == 'string' && data.payload.password.trim().length >= 8 
		   		? data.payload.password.trim() 
		   		: false

	var tosAgreement 
		= typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement  == true
		   		? true
		   		: false

	// make sure mandatory fields exisit
	if (fullName &&  email && phone && password && streetAddress && tosAgreement) {
		// make sure user does not exist 
		_data.read('users',phone, function(err,data){
			if (err) {
				// new user - proceed with creation process
				// hash the password
				var hashedPassword = helpers.hash(password);

				if (hashedPassword) {
					//create user object
					var userObject = {
						'fullName' : fullName,
						'email' : email,
						'phone' : phone,
						'streetAddress': streetAddress,
						'hashedPassword' : hashedPassword,
						'tosAgreement' : true
					};

					// store the user
					_data.create('users',phone, userObject, function(err){
						if (!err) {
							debug(helpers.green,"NEW USER: "+userObject.fullName+" CREATED");
							callback(200);
						} else {
							debug(helpers.red,"CANNOT CREATE NEW USER : STATUS CODE 500");
							callback(500,{'Error':'Could not create new user'});
						}

					});
				} else {
					debug(helpers.red,"CANNOT CREATE NEW USER NULL HASH : STATUS CODE 500");
					callback(500,{'error':'Could not create new user- NULL Hash'});
				}


			} else {
				// user alread exists
				callback(400,{"error":"Invalid fullName or it already exists"});
			}
		});
	}	else {
		if (password.length < 8) {
			callback(400,{"error":"Invalid password - should be atleast 8 chars"})
		} else {
			debug(helpers.red,"MISSING OR INVALID FIELD");
			debug(helpers.red,fullName);
			debug(helpers.red,email);
			debug(helpers.red,password);
			debug(helpers.red,streetAddress);
			debug(helpers.red,phone);
			debug(helpers.red,String(tosAgreement));
			callback(400,{"error":"Missing required fields or invalid"})
		}
	}  

};

// Users - GET
// require data : phone
// optional data : none
// @TODO Only let authenticated user access their data and none other
handlers._users.get = function(data,callback) {
	// check that the phone number is valid
	// GEt request will have keys,values in query string object
	var phone = typeof(data.queryStringObject.phone) == 'string' &&
			data.queryStringObject.phone.trim().length == 10 
			? data.queryStringObject.phone.trim()
			: false ;
	//console.log("GET: phone", phone);
	if (phone) {
		// since this is an authenticated request therefore the token would have been sent in the headers
		var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
		// verfify that the give token is valid for the phone number (user)
		handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
			
			if (tokenIsValid) {
				// look up user
				_data.read('users',phone, function(err,data){
					if (!err && data) {
						// remove the hashed password  before returning data to request
						delete data.hashedPassword;
						callback(200,data);
					} else {
						callback(404);
					}
				});
			} else {
				callback(403,{"error":"unauthorised request - rejected"});
			}
		});
		
	} else {
		callback(400, {"error":"Missing or invalid field"});
	}
};

// Users - PUT
// required data is : phone
// optional data is : firstName, lastName, password (atleast one of this must be present)
// @TODO only let an authenticate user let them update their data and none other
handlers._users.put = function(data,callback) {
	// check for required field
	var fullName 
		= typeof(data.payload.fullName) == 'string' && data.payload.fullName.trim().length > 0 
		   		? data.payload.fullName.trim() 
		   		: false;

	var streetAddress 
		= typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 
		   		? data.payload.streetAddress.trim() 
		   		: false;


	// validate email address format	   		
	var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	result = data.payload.email.match(regex);
	var email = typeof(result) == 'object' 
		&& result != null 
			? result[0] 
			: false 

	var phone 
		= typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 
		   		? data.payload.phone.trim() 
		   		: false;

	var password 
		= typeof(data.payload.password) == 'string' && data.payload.password.trim().length >= 8
		   		? data.payload.password.trim() 
		   		: false

	if (phone) {
		if (fullName || email || password || streetAddress) {
			// since this is an authenticated request therefore the token would have been sent in the headers
			var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
			// verfify that the give token is valid for the phone number (user)
			handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
			
			if (tokenIsValid) {
				_data.read('users', phone, function(err, userData){
					if (!err && userData) {
						// update necessary fields
						if (fullName) {
							userData.fullName = fullName;
						};
						if (email) {
							userData.email = email;
						};
						if (streetAddress) {
							userData.streetAddress = streetAddress;
						};
						if (password) {
							userData.hashedPassword = helpers.hash(password);
						};
						// store updated data
						_data.update('users', phone, userData, function(err){
							if (!err) {
								callback(200);
							} else {
								debug(handlers.red,"ERROR: COULD NOT UPDATE USER: STATUS CODE 500");
								callback(500, {'Error':'Could not update user'});
							}
						});

					} else {
						callback(400, {"error":"User not found"})
					}
				});
			} else {
				callback(403,{"error":"unauthorised request - rejected"});
			}
		});
			// lookup users
			
		} else {
			callback(400, {"error":"Nothing to update"});
		}
	} else {
		callback(400, {'Error':'Missing required field'})
	}
};

// Users - DELETE
// required field : phone
// @TODO only let an aithenticate user delete his/her object and no other
// @TODO clanup (delete) anyother data files associated with this user (for future)
handlers._users.delete = function(data,callback) {
	// check that the phone number is valid
	var phone = typeof(data.queryStringObject.phone) == 'string' &&
			data.queryStringObject.phone.trim().length == 10 
			? data.queryStringObject.phone.trim()
			: false ;
	//console.log("GET: phone", phone);
	if (phone) {

		// since this is an authenticated request therefore the token would have been sent in the headers
		var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
		// verfify that the give token is valid for the phone number (user)
		handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
			if (tokenIsValid) {
				// look up user
				_data.read('users',phone, function(err,data){
					if (!err && data) {
						_data.delete('users', phone, function(err){
							if (!err) {
								//var userChecks = typeof(data.checks) == 'object' 
								//	&& data.checks instanceof Array
								//		? data.checks
								//		: [];
								//var checksToDelete = userChecks.length;
								/*
								//---
								if (checksToDelete > 0) {
									var checksDeleted = 0;
									var deletionErrors = false;
									// loop through checks
									userChecks.forEach(function(checkId){
										// delete check
										_data.delete('checks',checkId,function(err){
											if (err) {
												deletionErrors = true;
											} 
											checksDeleted++;
											if (checksDeleted == checksToDelete) {
												if (!deletionErrors) {
													callback(200);
												} else {
													callback(500,{'Error':'Errors encoutered while attempting to delete users checks'});
												}
											}
										})
									});
								} else {
									// nothing to do
									callback(200);
								}
								// ---
								*/
								// delete each of the checks associated with the user
								callback(200);
							} else {
								callback(500,{'Error':'Could not delete the specified user'})
							}
						});
					} else {
						callback(400,{'Error':'Could not find user'});
					}
				});
			} else {
				callback(403,{'Error':'Missing required token or token is invalid'});
			}
		});
	} else {
		callback(400, {'Error':'Missing or invalid field'});
	}
};


// tokens
handlers.tokens = function(data, callback) {
	var acceptableMethods = ['post', 'get', 'put','delete'];
	if (acceptableMethods.indexOf(data.method) > -1){
		handlers._tokens[data.method](data,callback);
	} else {
		// 405 is method not acceptable
		callback(405);
	}
};

// container for all tokens sub-methods
handlers._tokens = {};

// tokens POST
// required data : phone, password
// optional data : none
handlers._tokens.post = function(data, callback){
	// phone and password check
	var phone 
		= typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 
		   		? data.payload.phone.trim() 
		   		: false

	var password 
		= typeof(data.payload.password) == 'string' && data.payload.password.trim().length >= 8 
		   		? data.payload.password.trim() 
		   		: false

	if (phone && password) {
		_data.read('users',phone, function(err,userData){
			if (!err && userData) {
				// we have the user , now check password
				var hashedPassword = helpers.hash(password);
				if (hashedPassword == userData.hashedPassword) {
					// create token for subsequent requests
					// set expiration to 1 hour in the future
					var tokenid = helpers.createRandomString(20);
					var expires = Date.now() + 1000 * 60 * 60 // 1 hour
					var tokenObject = {
						'phone': phone,
						'tokenid' : tokenid,
						'expires' : expires
					};
					_data.create('tokens',tokenid,tokenObject, function(err){
						if (!err) {
							callback(200, tokenObject)
						} else {
							callback(500, {'error': 'Could not create new token'});
						}
					})
				} else {
					callback(400, {'error':'Incorect Password'});
				}
			} else {
				callback(400,{'error':'User not found'});
			}
		});
	} else {
		callback(400,{'error':'Missing or invalid required field'});
	}

};

// tokens GET
// required data is : tokenID
// optional data is : None
handlers._tokens.get = function(data, callback){
	// check for valid id

	var id = typeof(data.queryStringObject.id) == 'string' &&
			data.queryStringObject.id.trim().length == 20 
			? data.queryStringObject.id.trim()
			: false ;
	//console.log("GET: phone", phone);
	if (id) {
		// look up user
		_data.read('tokens',id, function(err,tokenData){
			if (!err && tokenData) {
				callback(200,tokenData);
			} else {
				callback(404);
			}
		});
	} else {
		callback(400, {'Error':'Missing or invalid field'});
	}

};

// tokens PUT
// required fields : id, extend(boolean) extend extend token expiry by 60 more min
// optional data : none
handlers._tokens.put = function(data, callback){
	// check id and extend in payload
	var id = typeof(data.payload.id) == 'string' &&
			data.payload.id.trim().length == 20 
			? data.payload.id.trim()
			: false ;
	var extend = typeof(data.payload.extend) == 'boolean' &&
			data.payload.extend == true ? true : false;

	if (id && extend) {
		_data.read('tokens', id, function(err,tokenData){
			if (!err && tokenData) {
				// check to make sure token isn't already expired
				if (tokenData.expires > Date.now()) {
					// set expiration to an hour from now
					tokenData.expires = Date.now() + 1000 * 60 * 60;
					//store the new updated token
					_data.update('tokens', id, tokenData, function(err){
						if (!err) {
							callback(200);
						} else {
							callback(500,{'error':'Could not update token'});
						}
					});
				} else {
					callback(400,{'error':'Token Expired! Cannot extend'});
				}
			} else {
				callback(400, {'error':'Token does not exist'});
			}
		});
	} else {
		callback(400,{'error':'Missing or invalid field/s'});
	}
			
};

// tokens DELETE
// required : id
// optional : none
handlers._tokens.delete = function(data, callback){
	var id = typeof(data.queryStringObject.id) == 'string' &&
			data.queryStringObject.id.trim().length == 20 
			? data.queryStringObject.id.trim()
			: false ;
	if (id) {
		// look up id
		_data.read('tokens',id, function(err,tokenData){
			if (!err && tokenData) {
				_data.delete('tokens', id, function(err){
					if (!err) {
						callback(200);
					} else {
						callback(500,{'Error':'Could not delete token'})
					}
				});
			} else {
				callback(400,{'Error':'Token not found'});
			}
		});
	} else {
		callback(400, {'error':'Missing or invalid field'});
	}
};

// verify if the given tokenid is valid for a given user(phone)
handlers._tokens.verifyToken = function(id, phone, callback) {
	_data.read('tokens', id, function(err, tokenData){
		if (!err && tokenData) {
			// check if token has not expired
			if (tokenData.phone == phone && tokenData.expires > Date.now()) {
				callback(true);
			} else {
				callback(false);
			}
		} else {
			callback(false);
		}
		
	})
}



// Not-Found handler
handlers.notFound = function(data,callback){
  callback(404);
};

// export handlers
module.exports = handlers
