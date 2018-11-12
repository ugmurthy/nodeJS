
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


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE1NzM3MzY4MSwyNjY1MzAxNTksLTEwNj
IwMjUwNSwtMTYwODExMzE0OCwxOTMxNzI0Nzg3LDk0NzQ1NjA4
MSwyNjA1MDU1MTVdfQ==
-->