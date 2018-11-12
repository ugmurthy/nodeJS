
**1. Create new user**
~~~
Create `users` record given :  fullName, password
email ,streetAddress ,phone and tosAgreement  
returns Statuscode and Response as below:
 ~~~
|Method|URL  |
|--|--|
|POST  |/users/  |
---

| Type |Mandatory params|Value  |
|--|--|--|
| JSON Payload | fullName |String  |
| JSON Payload | streeAddress |String  |
| JSON Payload | email |String  |
| JSON Payload | password |String  |
| JSON Payload | phone |String(10)  |
| JSON Payload | tosAgreement |Boolean  |
---
Returns:
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
|Method|URL  |
|--|--|
|GET  |/users/?phone=9999999999  |
---

| Type |Mandatory params|Value  |
|--|--|--|
| HEADER | token |String(20)  |
| QUERYSTRING | phone |String(10)  |
---
Returns:
|StatusCode  |Response  |
|--|--|
|200  |{<br>"fullName": “xxxxx”,<br>"email": "yyy@xx.co.in",<br>"streetAddress": “ string with address”<br>"phone":   “9999999999”<br>}|
|400|{"error":"Missing or invalid field/s"}|
|403|{"error":"unauthorised request - rejected"}|
|404|{}|
|500|{"error":"Something went wrong. Please try again later."}|

**3. Update user**
~~~
Update `users` record given :  token and list of user fields to update (minimum one field need to be given)
returns Statuscode and Response as below:
 ~~~
|Method|URL  |
|--|--|
|POST  |/users/  |
---
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
---
Returns:
|StatusCode  |Response  |
|--|--|
|200  |{<br>"fullName": “xxxxx”,<br>"email": "yyy@xx.co.in",<br>"streetAddress": “ string with address”<br>"phone":   “9999999999”<br>}|
|400|{"error":"Missing or invalid field"}|
|400|{"error":"Nothing to update"}|
|400|{"error":"User not found"}|
|403|{"error":"unauthorised request - rejected"}|
|500|{"error":"Could not update user"}|
---

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzU1MjIyODUyLDExNTczNzM2ODEsMjY2NT
MwMTU5LC0xMDYyMDI1MDUsLTE2MDgxMTMxNDgsMTkzMTcyNDc4
Nyw5NDc0NTYwODEsMjYwNTA1NTE1XX0=
-->