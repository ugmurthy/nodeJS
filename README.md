##  nodeJS MasterClass

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
### Requirements:
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
2. `tokens`, 
3. `menu`, 
4. `cart`and
5. `orders`
##### menu.json

menu.json was generated using www.json-generator.com with the following template

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



---

##### Cart

the following CART structure contains reference to USER by phone, it has complete info on menuitems to place and order and calculate total amount. 
Assumption: 
- One user has only one CART and is indicated by reference to cartID in the USER record.
```
{
    "cartId": "5be10cff6278f1eebbf1587f",
    "phone": "9425903782",
    "lineItems": [
      {
        "id": "0",
        "menuIndex": 0,
        "name": "Pizza est laborum",
        "size": "12 inch",
        "price": 105.79,
        "Quantity": 1
      },
      {
        "id": "1",
        "menuIndex": 1,
        "name": "Pizza dolor aute",
        "size": "8 inch",
        "price": 134.91,
        "Quantity": 3
      }
    ]
  }
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2MDg2MzY1MDRdfQ==
-->