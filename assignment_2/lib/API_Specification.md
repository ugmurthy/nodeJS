
**1. Create new user**
~~~
Create `users` record given :  fullName, password
email ,streetAddress ,phone and tosAgreement  
returns Statuscode and Response as below:
 ~~~

 REQUEST:
 
|Method|URL  |
|--|--|
|POST  |/users/  |

| Type |Mandatory params|Value  |
|--|--|--|
| JSON Payload | fullName |String  |
| JSON Payload | streeAddress |String  |
| JSON Payload | email |String  |
| JSON Payload | password |String  |
| JSON Payload | phone |String(10)  |
| JSON Payload | tosAgreement |Boolean  |

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|StatusCode  |Response  |
|--|--|
|200  |{}  |
|200  |{}  |
|400|{"error":"Invalid fullName or it already exists"}|
|400|{"error":"Invalid password - should be atleast 8 chars"}|
|400|{"error":"Missing required fields or invalid"}|
|500|{"error":"Could not create new user"}|
|500|{"error":"Could not create new user- NULL Hash"}|

---

**2. Get user details**
~~~
Get `users` record given :  phone, and token
returns Statuscode and Response as below:
 ~~~

 REQUEST:
 
|Method|URL  |
|--|--|
|GET  |/users/?phone=9999999999  |

| Type |Mandatory params|Value  |
|--|--|--|
| HEADER | token |String(20)  |
| QUERYSTRING | phone |String(10)  |

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|StatusCode  |Response  |
|--|--|
|200  |{"fullName": “xxxxx”,"email": "yyy@xx.co.in","streetAddress": “ string with address”,"phone":   “9999999999”}|
|400|{"error":"Missing or invalid field/s"}|
|403|{"error":"unauthorised request - rejected"}|
|404|{}|
|500|{"error":"Something went wrong. Please try again later."}|

---

**3. Update user**
~~~
Update `users` record given :  token and list of user fields to update (minimum one field need to be given)
returns Statuscode and Response as below:
 ~~~

 REQUEST:

|Method|URL  |
|--|--|
|POST  |/users/  |

| Type |Mandatory params|Value  |
|--|--|--|
| HEADER | token |String(20) |
| JSON Payload | phone |String(10)  |

| Type |Optional params|Value  |
|--|--|--|
| JSON Payload | fullName |String  |
| JSON Payload | streeAddress |String  |
| JSON Payload | email |String  |
| JSON Payload | tosAgreement |Boolean  |

RESPONSE:

|StatusCode  |Response  |
|--|--|
|200|{"fullName": “xxxxx”,"email": "yyy@xx.co.in","streetAddress": “ string with address”,"phone":   “9999999999”}|
|400|{"error":"Missing or invalid field"}|
|400|{"error":"Nothing to update"}|
|400|{"error":"User not found"}|
|403|{"error":"unauthorised request - rejected"}|
|500|{"error":"Could not update user"}|

---

**4. Delete user**
~~~
Delete `users` record given :  phone, and token
returns Statuscode and Response as below:
 ~~~

 REQUEST:

|Method|URL  |
|--|--|
|DELETE  |/users/?phone=9999999999  |

| Type |Mandatory params|Value  |
|--|--|--|
| HEADER | token |String(20)  |
| QUERYSTRING | phone |String(10)  |

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|StatusCode  |Response  |
|--|--|
|Status|Response|
|200|{}|
|400|{"error":"Missing or invalid field/s"}|
|400|{"error":"User not found"}|
|403|{"error":"unauthorised request - rejected"}|
|500|{"error":"Could not delete user"}|

---

**5. Login**
~~~~
 login a user identified by phone and password get a token**
~~~~

REQUEST: 

|Method|URL|
|--|--|
|POST|/tokens/|


|Type|Mandatory Params|Values|
|--|--|--|
| JSON Payload | password |String  |
| JSON Payload | phone |String(10)  |


Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|Status|Response|
|--|--|
|200|{|"phone": "9999999999","tokenid": "kdg4m2rvink1pz2i9wmy","expires": 1541392260326}|
|400|{"error":"Missing or invalid field"}|
|400|{"error":"User not found}|
|400|{"error":"Incorrect Password”}|
|500|{"error":"Could not create new token"}|

**6 Delete token**

~~~
Deletes a token given token id
~~~

REQUEST:

|Method|URL|
|DELETE|/tokens/?id=xxvvxxvvxxzzbbzzbbzz|


|Type|Mandatory Params|Values|
|--|--|--|
| QUERYSTRING | token |String(20)  |

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|Status|Response|
|--|--|
|200|{}|
|400|{"error":"Missing or invalid field"}|
|400|{"error":"Token not found"}|
|500|{"error":"Could not Delete token."}|

---

**7. Get token data**
~~~
Given a token gets related phone and expiration data
~~~

REQUEST:

|Method|URL      REQUEST:
|--|--|
|GET|/tokens/?id=xxvvxxvvxxzzbbzzbbzz|


|Type|Mandatory Params|Values|
|--|--|--|
| QUERYSTRING | token |String(20)  |

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|Response|Status|
|--|--|
|200|{"phone": "9999999999","tokenid": "kdg4m2rvink1pz2i9wmy","expires": 1541392260326}|
|400|{"error":"Missing or invalid field"}|
|404|{}|

---

**8. Extend token**

~~~
Extend token life - expiration set to one hour from now.
~~~

REQUEST:

|Method|URL            |
|--|--|
|PUT|/tokens/|


|Type|Mandatory Params|Values|
|--|--|--|
| JSON Payload | id |String(20)  |
| JSON Payload | extend |Boolean|


Type| Optional Params |Values
|--|--|--|
|  |None|  |


RESPONSE:

|Status|Response|
|--|--|
|200|{}|
|400|{"error":"Missing or invalid field/s"}|
|400|{"error":"Token does not exist"}|
|400|{"error":"Token Expired! Cannot extend"}|
|500|{"error":"Could not update token"}|

---

**9. Get menu item/s**

~~~
Given menuIndex, phone and token get menu item, if menuIndex is not provided then return whole menu 
Returns {“allMenuItemts”: [....] } if menuIndex is not provided
~~~

REQUEST:

|Method|URL            |
|--|--|
|GET|/menu/?menuIndex=nn&phone=9944994499|

|Type|Mandatory Params|Values|
|--|--|--|
| HEADER | token |String(20)  |
| QUERY STRING | phone |String(10)  |

Type| Optional Params |Values
|--|--|--|
| QUERY STRING |menuIndex|string  |

RESPONSE:

|Status|Response|
|--|--|
|200|{}|
|400|{"error":"Missing or invalid field"}|
|403|{"error":"unauthorised request - rejected"}|
|404|{}|
|400|{"error":"No menu items in menu"}|
|400|{'error':'reading menu '+readErrorCount+' time/s'}|

---

**10. Add to existing Cart / create Cart**

~~~
Given menuIndex, token - add menu item to Cart. Create Cart if it does not exist and then add menu item. Update user record with CartId if the cart was just created. Return cartData [to be reviewed if this is necessary]
~~~

REQUEST:
|Method|URL   |         
|--|--|
|POST|/cart/|

|Type|Mandatory Params|Values|
|--|--|--|
|HEADER|token|string(20)|
|PAYLOAD|menuIndex|String|
|PAYLOAD|quantity|String|

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

Status|Response|
|--|--|
200|{cartData} // to be reviewed if this is necessary|
400|{"error":"Missing or invalid field/s"}|
400|{"error":"Exceeds max lineItems in Cart"}|
403|{"error":"unauthorised request - rejected"}|
404|{}|
500|{"error":"Could not update Cart"}|
500|{"error":"Could not update user"}|
500|{"error":"Could not create Cart"}|

---

**11. Get Cart**

~~~
Given user phone, token get cartData
~~~

REQUEST:

|Method|URL   |         
|--|--|
|GET|/cart/?phone=9944994499|

|Type|Mandatory Params|Values|
|--|--|--|
|HEADER|token|string(20)|
|QUERY STRING|phone|String(10)|

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|Status|Response|
|--|--|
|200|{cartData} |
|400|{"error":"Missing or invalid field"}|
|403|{"error":"unauthorised request - rejected"}|
|404|{}|
|500|{"error":"userCartId exists but no cart with that id"}|


**12. Update Cart**

~~~
Given user phone, token, menuIndex, quantity update cartData lineItems returns updated cartData

Three Cases to be handled:
1. If no optional parameters provided then set lineItems to [] and return
2. If only menuIndex given then delete that item from lineItems and return 
3. If both menuIndex and quantity give then set quantity to new quantity for give menuIndex and return
~~~

|Method|URL   |         
|--|--|
|PUT|/cart/|


|Type|Mandatory Params|Values|
|--|--|--|
|HEADER|token|string(20)|
|PAYLOAD|phone|String(10)|

Type| Optional Params |Values
|--|--|--|
| PAYLOAD |menuIndex|String|
| PAYLOAD |quantity|string|


RESPONSE:

|Status|Response|
|--|--|
|200|{cartData} |
|400|{"error":"Item does not exist in cart"}|
|400|{"error":"User cart does not exist- nothing to update"}|
|400|{"error":"Missing or invalid field"}|
|400|{"error":"Insufficient info for update"}|
|403|{"error":"unauthorised request - rejected"}|
|404|{}|
|500|{"error":"user not found"}|
|500|{"error":"userCartId exists but no associated cart"}|
|500|{"error":"Cart not found"}|

---

**13. Delete Cart**

~~~
Given user phone & token delete cart - remove its reference from user record too
~~~

REQUEST:

|Method|URL   |         
|--|--|
|DELETE|/cart/?phone=9944994499|

|Type|Mandatory Params|Values|
|--|--|--|
|HEADER|token|string(20)|
|QUERY STRING|phone|String(10)|

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|Sta|us|Response|
|--|--|
|200|{} |
|400|{"error":"Missing or invalid field"}|
|400|{"error":"No cart with this user"}|
|400|{"error":"cartId with this user has no cart"}|
|403|{"error":"unauthorised request - rejected"}|
|404|{}|
|500|{"error":"user not found"}|

---

**14. Create Order**

~~~
Given a valid token the API will create an order from cart for the user indicated by the token and return orderData. After successful creation of order the cart will be deleted and its reference in users record removed.
~~~

REQUEST:

|Method|URL   |         
|--|--|
|POST|/order/|

|Type|Mandatory Params|Values|
|--|--|--|
|HEADER|token|string(20)|

Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|Status|Response|
|--|--|
|200|{orderDate} |
|400|{"error":"user not found"}|
|400|{"error":"cart not found"}|
|403|{"error":"unauthorised request - rejected"}|
|404|{}|
|500|{"error":"Could not create order"}|
|500|{"error":"Could not update user"}|
|500|{"error":"Could not delete Cart"}|

---

**15. Delete Order, Restore cart**

~~~
Given a valid token and orderId the API will delete  an order and restore related cart if order has not been already paid.

Note:: 
1. orders for a particular user can be got via GET /user/?phone=9999999999. It is assumed that the app will help select orderId before requesting PUT /order/
2. Any updates to an order will request to restore its corresponding cart and then use update cart api
~~~

REQUEST:

|Method|URL   |         
|--|--|
|POST|/order/|

|Type|Mandatory Params|Values|
|--|--|--|
|HEADER|token|string(20)|
|PAYLOAD|orderId|String(20)|


Type| Optional Params |Values
|--|--|--|
|  |None|  |

RESPONSE:

|Status|Response|
|--|--|
|200|{orderData} |
|400|{"error":"user not found"}|
|400|{"error":"order not found"}|
|400|{"error":"cart not found"}|
|403|{"error":"unauthorised request - rejected"}|
|400|{"error":"Payment done cannot update order"}|
|400|{"error":"missing or invalid field"}|
|500|{"error":"Could not delete order"}|
|500|{"error":"Could not update user"}|
|500|{"error":"Could not create Cart"}|

---

**16. Pay for Order**

~~~
Given a valid token and orderId, message and amount the API will make a payment via stripe.com
App will have to craft meaningful message. Amount can be derived from orderId but intentionally kept optional to enable payment other than order amount - the app invoking the API will be responsible for specifying right amount. 

If amount not given the API will user OrderAmount (just providing flexibility to charge a different amount)

If message not given - message will be set to a standard message crafted using orderId
~~~

REQUEST:

|Method|URL   |         
|--|--|
|POST|/pay/|

|Type|Mandatory Params|Values|
|--|--|--|
|HEADER|token|string(20)|
|PAYLOAD|orderId|String(20)|


|Type| Optional Params |Values
|--|--|--|
| PAYLOAD |amount|Number|
| PAYLOAD |message|string|

RESPONSE:

|Status|Response|
|--|--|
|200|{'paid':99.99,'status':'SUCCESS'}|
|400|{'error':'Could not update order payment flag to paid','paid':99.99,'status':'SUCCESS'}|
|400|{"error":"order not found"}|
|400|{"error":”unsuccessful payment"}|
|400|{"error":”This order has been already been paid for"}|
|403|{"error":"unauthorised request - rejected"}|
|400|{"error":"missing or invalid field/s"}|

---

**17. Send an Email**

~~~
Given a valid token and orderId API will send email via MAILGUN or MAILJET depending on the NODE_EMAIL env variable
~~~

REQUEST:

|Method|URL   |         
|--|--|
|POST|/sendmail/|

|Type|Mandatory Params|Values|
|--|--|--|
|HEADER|token|string(20)|
|PAYLOAD|orderId|String(20)|

|Type| Optional Params |Values
|--|--|--|
| PAYLOAD |message|string|

RESPONSE:

|Status|Response|
|--|--|
|200|{}|
|400|{'error':{"error":"Send mail unsuccessful statusCode: "+err}|
|400|{"error":"order not found"} -|
|400|{"error":”user not found"}|
|403|{"error":"unauthorised request - rejected"} -|
|400|{"error":"missing or invalid field/s"} -|



