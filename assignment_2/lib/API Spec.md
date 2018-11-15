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

**7. Extend token**

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

