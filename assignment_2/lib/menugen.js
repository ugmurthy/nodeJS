// GENERATES MENU DATA FILES



// dependencies
_data = require('./data');
handlers = require('./handlers');
helpers = require('./helpers');


var menuItems = [
  {
    "menuId": "5be05593938bb5c6c4afde8b",
    "menuIndex": 0,
    "availableToday": true,
    "price": 144.91,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Non-Vegetarian",
    "name": "Pizza elit ea",
    "size": "12 inch",
    "description": "Pizza made from est do sit nostrud incididunt dolore duis laboris exercitation esse"
  },
  {
    "menuId": "5be055930ac9cf9ff4297094",
    "menuIndex": 1,
    "availableToday": false,
    "price": 186.41,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Vegetarian",
    "name": "Pizza ad eiusmod",
    "size": "8 inch",
    "description": "Pizza made from sunt anim dolore nostrud minim ipsum ipsum enim mollit irure"
  },
  {
    "menuId": "5be05593f286bc1959490d1c",
    "menuIndex": 2,
    "availableToday": false,
    "price": 110.85,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza ex reprehenderit",
    "size": "14 inch",
    "description": "Pizza made from aute nostrud magna cupidatat sint aute ad nostrud amet exercitation"
  },
  {
    "menuId": "5be05593138bfe04c4e92fec",
    "menuIndex": 3,
    "availableToday": true,
    "price": 153,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza nostrud quis",
    "size": "12 inch",
    "description": "Pizza made from sint labore aliqua nostrud voluptate nulla esse sunt irure ex"
  },
  {
    "menuId": "5be05593ceacafd0f7e04380",
    "menuIndex": 4,
    "availableToday": false,
    "price": 114.95,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza in ipsum",
    "size": "8 inch",
    "description": "Pizza made from consectetur laboris in qui sit exercitation et culpa nostrud ad"
  },
  {
    "menuId": "5be055932584307dc10a5d9b",
    "menuIndex": 5,
    "availableToday": false,
    "price": 183.91,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza et consequat",
    "size": "8 inch",
    "description": "Pizza made from labore officia commodo aute duis irure ipsum in eu esse"
  },
  {
    "menuId": "5be05593a80a79ea45c830f9",
    "menuIndex": 6,
    "availableToday": true,
    "price": 119.79,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Non-Vegetarian",
    "name": "Pizza eiusmod Lorem",
    "size": "8 inch",
    "description": "Pizza made from ut exercitation eiusmod ipsum non consequat Lorem amet pariatur et"
  },
  {
    "menuId": "5be0559303a21e12cb932a6d",
    "menuIndex": 7,
    "availableToday": false,
    "price": 134.53,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza aliqua proident",
    "size": "14 inch",
    "description": "Pizza made from do irure sint quis deserunt veniam duis pariatur amet ipsum"
  },
  {
    "menuId": "5be05593e785831815c8afca",
    "menuIndex": 8,
    "availableToday": true,
    "price": 151.3,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Vegetarian",
    "name": "Pizza proident duis",
    "size": "12 inch",
    "description": "Pizza made from commodo excepteur anim occaecat do aliquip reprehenderit dolore id anim"
  },
  {
    "menuId": "5be055934663d2b4aece31d0",
    "menuIndex": 9,
    "availableToday": true,
    "price": 148.09,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Non-Vegetarian",
    "name": "Pizza dolor pariatur",
    "size": "12 inch",
    "description": "Pizza made from enim incididunt ut minim fugiat non minim aliquip ex proident"
  },
  {
    "menuId": "5be055935fdfabf2df078956",
    "menuIndex": 10,
    "availableToday": true,
    "price": 146.68,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza laboris ut",
    "size": "14 inch",
    "description": "Pizza made from ea in sunt sunt non do aliquip exercitation proident in"
  },
  {
    "menuId": "5be05593259db17964bc08d9",
    "menuIndex": 11,
    "availableToday": false,
    "price": 114.86,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Non-Vegetarian",
    "name": "Pizza consectetur veniam",
    "size": "8 inch",
    "description": "Pizza made from aliquip reprehenderit commodo nisi consectetur exercitation laboris in ullamco ullamco"
  },
  {
    "menuId": "5be0559335edb46d31587f4e",
    "menuIndex": 12,
    "availableToday": false,
    "price": 101.35,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza occaecat enim",
    "size": "8 inch",
    "description": "Pizza made from commodo dolore aliquip ea fugiat mollit proident cillum do sint"
  },
  {
    "menuId": "5be05593b945456a196da9b1",
    "menuIndex": 13,
    "availableToday": true,
    "price": 137.49,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Vegetarian",
    "name": "Pizza non officia",
    "size": "8 inch",
    "description": "Pizza made from dolore voluptate culpa reprehenderit ad occaecat et ipsum cillum adipisicing"
  },
  {
    "menuId": "5be055939e6544f8ca73ce6f",
    "menuIndex": 14,
    "availableToday": true,
    "price": 162.79,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza deserunt sunt",
    "size": "14 inch",
    "description": "Pizza made from aliqua aute velit est pariatur commodo dolor dolor anim sunt"
  },
  {
    "menuId": "5be055932478573e0f29e58a",
    "menuIndex": 15,
    "availableToday": false,
    "price": 173.18,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Vegetarian",
    "name": "Pizza cupidatat amet",
    "size": "8 inch",
    "description": "Pizza made from incididunt velit consequat officia officia quis voluptate fugiat ipsum excepteur"
  },
  {
    "menuId": "5be055935cc79235a55e3a0b",
    "menuIndex": 16,
    "availableToday": false,
    "price": 104.79,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Vegetarian",
    "name": "Pizza quis sint",
    "size": "12 inch",
    "description": "Pizza made from culpa dolor qui duis veniam quis minim mollit aliquip laboris"
  },
  {
    "menuId": "5be05593d235102defdd86e3",
    "menuIndex": 17,
    "availableToday": false,
    "price": 178.75,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza elit ad",
    "size": "12 inch",
    "description": "Pizza made from exercitation ut non ipsum cillum duis ad proident irure labore"
  },
  {
    "menuId": "5be055935fc8140f040bd8c2",
    "menuIndex": 18,
    "availableToday": false,
    "price": 174.89,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Vegetarian",
    "name": "Pizza dolore dolore",
    "size": "14 inch",
    "description": "Pizza made from minim aliqua do consequat in amet ut do id reprehenderit"
  },
  {
    "menuId": "5be05593f9750b70a05982ac",
    "menuIndex": 19,
    "availableToday": true,
    "price": 107.26,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Vegetarian",
    "name": "Pizza labore quis",
    "size": "12 inch",
    "description": "Pizza made from deserunt irure consequat nisi nostrud aliqua proident qui cupidatat velit"
  },
  {
    "menuId": "5be05593325273e68d844018",
    "menuIndex": 20,
    "availableToday": false,
    "price": 127.68,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Non-Vegetarian",
    "name": "Pizza eu incididunt",
    "size": "12 inch",
    "description": "Pizza made from veniam duis pariatur culpa nulla deserunt dolore do mollit dolor"
  },
  {
    "menuId": "5be05593bcf4d5c96104bbb0",
    "menuIndex": 21,
    "availableToday": false,
    "price": 100.07,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza voluptate culpa",
    "size": "14 inch",
    "description": "Pizza made from eu nostrud aliqua velit mollit sunt ex fugiat ipsum quis"
  },
  {
    "menuId": "5be055930e17bc081b993516",
    "menuIndex": 22,
    "availableToday": true,
    "price": 148.41,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza mollit id",
    "size": "8 inch",
    "description": "Pizza made from ullamco commodo magna consectetur excepteur eiusmod officia est ut culpa"
  },
  {
    "menuId": "5be0559319b50a69a9b341c9",
    "menuIndex": 23,
    "availableToday": true,
    "price": 184.97,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Vegetarian",
    "name": "Pizza minim labore",
    "size": "8 inch",
    "description": "Pizza made from est adipisicing nostrud et est voluptate labore velit esse laboris"
  },
  {
    "menuId": "5be05593c8e93d73d863561a",
    "menuIndex": 24,
    "availableToday": true,
    "price": 110.16,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Non-Vegetarian",
    "name": "Pizza dolor ea",
    "size": "12 inch",
    "description": "Pizza made from veniam dolore nostrud aliquip reprehenderit Lorem proident ad eu culpa"
  },
  {
    "menuId": "5be0559332c7012eafc3f4f4",
    "menuIndex": 25,
    "availableToday": true,
    "price": 146.14,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Non-Vegetarian",
    "name": "Pizza nisi aute",
    "size": "8 inch",
    "description": "Pizza made from do velit cupidatat fugiat ex voluptate voluptate exercitation in ipsum"
  },
  {
    "menuId": "5be05593854f1fc6ce355ee1",
    "menuIndex": 26,
    "availableToday": true,
    "price": 152.65,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Vegetarian",
    "name": "Pizza ut nostrud",
    "size": "12 inch",
    "description": "Pizza made from deserunt officia non dolore excepteur nulla consequat consectetur aute dolor"
  },
  {
    "menuId": "5be05593ad0c420cd7ee6787",
    "menuIndex": 27,
    "availableToday": true,
    "price": 115.17,
    "picture": "http://placehold.it/32x32",
    "crust": "thick",
    "category": "Non-Vegetarian",
    "name": "Pizza consequat excepteur",
    "size": "8 inch",
    "description": "Pizza made from Lorem velit anim amet eiusmod sit voluptate qui deserunt nisi"
  },
  {
    "menuId": "5be05593943aa9cb90767beb",
    "menuIndex": 28,
    "availableToday": true,
    "price": 160.57,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Non-Vegetarian",
    "name": "Pizza Lorem eiusmod",
    "size": "12 inch",
    "description": "Pizza made from occaecat aute fugiat veniam laboris aliqua eiusmod velit nostrud ipsum"
  },
  {
    "menuId": "5be055935a8aa77237b03828",
    "menuIndex": 29,
    "availableToday": false,
    "price": 162.31,
    "picture": "http://placehold.it/32x32",
    "crust": "thin",
    "category": "Vegetarian",
    "name": "Pizza culpa do",
    "size": "8 inch",
    "description": "Pizza made from tempor commodo voluptate exercitation commodo nostrud labore commodo cupidatat ea"
  }
];


console.log(helpers.green, "Nummber of files to write"+menuItems.length);

handlers._menu.generate(menuItems,function(err){
	if (err) {
		console.log(helpers.red,"Error in generatingfiles");
	}
});

