##  nodeJS MasterClass
---		
### Assignment #1
filename : hello.js

Usage: 
`node hello.js` or
`NODE_ENV=nnnn node hello.js`

Notes:
1. Default http port is 3000
2. nnnn is the http port number on which the server will listen

Sample test using the following command:
```
url --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  http://localhost:3000/hello
```
---
### Assignment #2

### API for a pizza-delivery company: 
### Requirements given:
1. New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address.

2. Users can log in and log out by creating or destroying a token.

3. When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system). 

4. A logged-in user should be able to fill a shopping cart with menu items

5. A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.com to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and click on the "tokens" tab to see the fake tokens you can use server-side to confirm the integration is working: https://stripe.com/docs/testing#cards

6. When an order is placed, you should email the user a receipt. You should integrate with the sandbox of Mailgun.com for this. Note: Every Mailgun account comes with a sandbox email account domain (whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need to setup any DNS for your domain for this task https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account
---

#### Specifications:

##### Database
The API will enable CRUD for the following entities: 
1. `users`  to keep user records, 
2. `tokens`to ensure authenticated users are allowed to act on their own data 
3. `menu` contains what is is available for ordering, 
4. `cart`is an e-cart for populating menu items
5. `orders`contains details of what to order

All of above are json files and the structure are available [here] (https://github.com/ugmurthy/nodejs/blob/master/assignment_2/structures.json). All of these files reside in directories under `.data` directory 

`data.js` implements all basic routines to `create, read, write, update, delete and list` files

###### menugenerator
The menu items were created using `menugen.js` which create all menu items. The menu items were generated using [www.json-generator.com](http://www.json-generator.com/) with the following template 
```
[
  '{{repeat(30)}}',
  {
    menuId: '{{objectId()}}',
    menuIndex: '{{index()}}',
    availableToday: '{{bool()}}',
    price: '{{floating(100, 200, 2, "0.00")}}',
    picture: 'http://placehold.it/32x32',
    crust:'{{random("thin", "thick")}}',
    category: '{{random("Vegetarian", "Non-Vegetarian")}}',
    name: 'Pizza {{lorem(2,"words")}}',
    size: '{{random("8", "12", "14")}} inch',
    description: 'Pizza made from {{lorem(10, "words")}}'
  }
]
```
copy paste the generated array containing JSON element to `menugen.js` and
execute the following command:

`node menugen.js`

one file per menu item will be generated in the `.data/menu` directory

##### API Specification

API Specification available [here] (https://github.com/ugmurthy/nodejs/blob/master/assignment_2/lib/API_Specification.md)

##### USAGE instructions

`node index.js`

Notes:

Mandatory environment varialbles

  If `NODE_EMAIL` not specified then
```
    set MAILGUN_USER=api
    set MAILGUN_KEY=secret_key
```
  if `NODE_EMAIL` is set to 'mailjet'
```
    set MJ_APIKEY_PUBLIC=public_key
    set MJ_APIKEY_PRIVATE=secret_key
```
for DEBUG messages user:

`NODE_ENV=helpers,server,handler node index.js`

