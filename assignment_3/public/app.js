/*
 * Frontend Logic for application
 *
 */

// Container for frontend application
var app = {};

// Config
app.config = {
  'sessionToken' : false
};

// AJAX Client (for RESTful API)
app.client = {}

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){
  //debugger;
  // Set defaults
  // default to {}
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  // defaults to '/''
  path = typeof(path) == 'string' ? path : '/';
  //defaults to GET
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  // default to {}
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  // default to false or no call back
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  // assemble query string
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.tokenid);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode,parsedResponse);
          } catch(e){
            callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){

    var allForms = document.querySelectorAll("form");
    // for each form - Capture id,action,method, Prepare payload for app.client call
    // headers and querystring are preparded in app.client
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#"+formId+" .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }


        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            // Determine class of element and set value accordingly
            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' 
                && classOfElement.indexOf('multiselect') == -1 
                ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;
            // Override the method of the form if the input's name is _method
            var nameOfElement = elements[i].name;


            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {
              // Create an payload field named "method" if the elements name is actually httpmethod
              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }
              // Create an payload field named "id" if the elements name is actually uid
              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                payload[nameOfElement] = valueOfElement;
                console.log("payload: ",payload);
              }

            }
          }
        } // for all elements in the that form


        // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        console.log(path,method,payload);
        debugger;
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              //debugger;
              var error = typeof(responsePayload.error) == 'string' ? responsePayload.error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    } // for each form
  }
};

// FORM RESPONSE PROCESSOR
// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the phone and password, and use it to log the user in
    var newPayload = {
      'phone' : requestPayload.phone,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        // TODO - change the location to appropriate path
        window.location = '';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user

  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    // TODO - change the location to appropriate path
    window.location = '';
  }


  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/account/deleted';
  }

  // If the user just to cart successfully, show cart, with button to menu
  if(formId == 'addToCart'){
      window.location = '/cart/list'
  }

  if(formId == 'makePayment') {
    window.location = '/order/paid';
  }


};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.tokenid) == 'string' ? app.config.sessionToken.tokenid : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'token' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);
    app.setCartData(false)

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/session/deleted';
    }

  });
};
// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  // LOGIN
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};
// cart is json {'amount': 999, 'items':999}
app.setCartData = function(cart){
  app.config.cartData = cart;
  app.config.sessionToken.cartExists = true;
  var cartString = JSON.stringify(cart);
  localStorage.setItem('cart',cartString);
};

app.getCartData = function(){
  var cartString = localStorage.getItem('cart');
  if (typeof(cartString)=='string') {
    try {
      app.config.cartData = JSON.parse(cartString)
    } catch (e) {
      app.config.cartData = false;
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Load data on the page
app.loadDataOnPage = function(){
    // Get the current page from the body class
    var bodyClasses = document.querySelector("body").classList;
    var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;
    var fullName = typeof(app.config.sessionToken.fullName) == 'string' && app.config.sessionToken.fullName.length > 0 
                    ? app.config.sessionToken.fullName : false;

    var name = document.getElementById('titleName');
    // update fullname in document.
    name.innerHTML =  (fullName) ? fullName : "";
    
    // Logic for account settings page
    if(primaryClass == 'accountEdit'){
      app.loadAccountEditPage();
    }

    // Logic for dashboard page
    if(primaryClass == 'menuList'){
      page.tableInit();
    }

    if(primaryClass == 'menuItem'){
        app.loadMenuItem();
    }

    if(primaryClass == 'cartList' && app.config.sessionToken.cartExists) {
      app.loadCartList()
    }

    if(primaryClass == 'orderCart' ) {
      app.loadOrder()
    }
   
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phone' : phone
    };
    //debugger;
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .fullNameInput").value = responsePayload.fullName;
        document.querySelector("#accountEdit1 .streetAddressInput").value = responsePayload.streetAddress;
        document.querySelector("#accountEdit1 .displayPhoneInput").value = responsePayload.phone;
        document.querySelector("#accountEdit1 .emailInput").value = responsePayload.email;

        // Put the hidden phone field into both forms
        var hiddenPhoneInputs = document.querySelectorAll("input.hiddenPhoneNumberInput");
        for(var i = 0; i < hiddenPhoneInputs.length; i++){
            hiddenPhoneInputs[i].value = responsePayload.phone;
        }

      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

app.loadCartList = function(responseData) {
  var phone = typeof(app.config.sessionToken.phone) == 'string' 
      ? app.config.sessionToken.phone 
      : false;

  if (phone) {
      // setup quertstringobject to point to user
      var queryStringObject = {'phone': phone};


      // call the api with phone/token to get all cart items
       app.client.request(undefined,'api/cart/','GET',queryStringObject,undefined,function(statusCode,responsePayload) {
          if (statusCode == 200) {
            /*
            ========================================================
            {"cartId":"0kw1noupgog753ztbw0f","phone":"9999999990","lineItems":
              [
              {"menuIndex":"0","name":"Pizza elit ea","price":144.91,"quantity":"5"},
              {"menuIndex":"6","name":"Pizza eiusmod Lorem","price":119.79,"quantity":"5"},
              {"menuIndex":"7","name":"Pizza aliqua proident","price":134.53,"quantity":"5"}
              ]
            }
            ========================================================
            */
            // populate the table with cart items
            // and get totals to update local storage
            var lineItems = responsePayload.lineItems;
            var items = responsePayload.lineItems.length;
            var totAmt = 0;
            var lineAmt = 0;
            var rate = 0;
            var qty = 0;
            var cartTable = document.getElementById('cartList');
            // iterate for items+1 times - the +1 is for the total line.
            for (var i = 0;i<items+1;i++) {
            
              var row = cartTable.insertRow(-1);
              var nameCell = row.insertCell(0);
              var rateCell = row.insertCell(1);
              var qtyCell = row.insertCell(2);
              var amtCell = row.insertCell(3);

              if (i<items) {
                rate = Number(lineItems[i].price);
                qty = Number(lineItems[i].quantity);
                lineAmt = rate*qty;
                totAmt += lineAmt;
                qtyCell.innerHTML = qty;
                nameCell.innerHTML = lineItems[i].name;
                rateCell.innerHTML = rate;
                amtCell.innerHTML =lineAmt.toFixed(2)
              } else { // total line
                qtyCell.innerHTML = '<BOLD>TOTAL</BOLD>';
                nameCell.innerHTML = '';
                rateCell.innerHTML =  '';
                amtCell.innerHTML =totAmt.toFixed(2)
              }
            }

            //
            var cart = {'items':items,'totalAmt':totAmt}
            setCartData(cart)

          } else {
            // error
            console.log("Cannot find cart for this user :",phone);
          }
       });
  } else {
    console.log("Invalid request - user not logged in");
  } 

  // use document.queryselec to seek element of interest and then update values for each item/field in a loop

};

// show order
app.loadOrder = function(responseData) {
  var phone = typeof(app.config.sessionToken.phone) == 'string' 
      ? app.config.sessionToken.phone 
      : false;
  debugger;

  if (phone) {
      // setup quertstringobject to point to user
      var queryStringObject = {'phone': phone};

      
      // call the api with phone/token to get all cart items
       app.client.request(undefined,'api/orders/','GET',undefined,undefined,function(statusCode,responsePayload) {
          if (statusCode == 200) {
            /*
            ========================================================
            {"orderId":"ORD:rl335sw0fr62mw1s",
              "cart":{"cartId":"er8xpit5qsl2y04mq8x9",
                  "phone":"9999999993",
                  "lineItems":
                    [   {"menuIndex":"0","name":"Pizza elit ea","price":144.91,"quantity":"20"},
                      {"menuIndex":"17","name":"Pizza elit ad","price":178.75,"quantity":"4"},
                      {"menuIndex":"13","name":"Pizza non officia","price":137.49,"quantity":"4"},
                      {"menuIndex":"10","name":"Pizza laboris ut","price":146.68,"quantity":"6"}
                    ]
                  },
              "orderAmount":5043.24,
              "orderQuantity":34,
              "payment":{"method":"Visa Express","status":false},
              "delivery":{"status":false,"by":"ToBeDecided","etd":1545656930293}
            }
            ========================================================
            */
            // populate the table with cart items
            // and get totals to update local storage

            var lineItems = responsePayload.cart.lineItems;
            var items = responsePayload.cart.lineItems.length;
            var totAmt = 0;
            var lineAmt = 0;
            var rate = 0;
            var qty = 0;
            var ordNo = document.getElementById('ordNo');
            ordNo.innerHTML = responsePayload.orderId;
            var hiddenOrderId = document.getElementById('hiddenOrderId')
            hiddenOrderId.value = responsePayload.orderId;

            var cartTable = document.getElementById('orderCartTable');
            // iterate for items+1 times - the +1 is for the total line.
            for (var i = 0;i<items+1;i++) {
            
              var row = cartTable.insertRow(-1);
              var nameCell = row.insertCell(0);
              var rateCell = row.insertCell(1);
              var qtyCell = row.insertCell(2);
              var amtCell = row.insertCell(3);

              if (i<items) {
                rate = Number(lineItems[i].price);
                qty = Number(lineItems[i].quantity);
                lineAmt = rate*qty;
                totAmt += lineAmt;
                qtyCell.innerHTML = qty;
                nameCell.innerHTML = lineItems[i].name;
                rateCell.innerHTML = rate;
                amtCell.innerHTML =lineAmt.toFixed(2)
              } else { // total line
                qtyCell.innerHTML = '<BOLD>TOTAL</BOLD>';
                nameCell.innerHTML = '';
                rateCell.innerHTML =  '';
                amtCell.innerHTML =totAmt.toFixed(2)
              }
            }
            var payBtn = document.getElementById('payBtn');
            if (responsePayload.payment.status) { // if we paid for this disable pay btn
              payBtn.href = '/menu/list';
            } else {
              payBtn.href = 'javascript:app.makePayment()';
            }
            //
            var cart = false; // cart no longer exists
            setCartData(cart)

          } else {
            // error
            console.log("Cannot find ORDER for this user :",phone);
          }
       });
  } else {
    console.log("Invalid request - user not logged in");
  } 

  // use document.queryselec to seek element of interest and then update values for each item/field in a loop

};


app.loadMenuItem = function() {
  // check variable name for id
  var menuIndex = typeof(window.location.href.split('=')[1]) == 'string' && window.location.href.split('=')[1].length > 0 
      ? window.location.href.split('=')[1] 
      : false;
  
  var phone = typeof(app.config.sessionToken.phone) == 'string' 
      ? app.config.sessionToken.phone 
      : false;

  if(menuIndex && phone){
    var queryStringObject = {
      'menuIndex' : menuIndex,
      'phone':phone
    };

    console.log(queryStringObject);
    
    app.client.request(undefined,'api/menu','GET',queryStringObject,undefined,function(statusCode,responsePayload) {
      if (statusCode == 200) {

        var itemTable = document.getElementById("menuItemTable");
        var r=responsePayload;

        itemTable.rows[0].cells[0].innerHTML = '<h2>' + r.size+'<br><br>'+r.crust+' crust <br></h2>'+r.description +'<h2><br><br>'+r.category+'</h2>'
        itemTable.rows[0].cells[1].innerHTML = '<img src=https://dummyimage.com/200x200/000/fcfcfc.png&text='+r.category+' />'
        itemTable.rows[1].cells[0].innerHTML ='<h2>Rate: Rs '+'<span id="rate">'+r.price+'</span>' + '</h2>'
        itemTable.rows[1].cells[1].innerHTML ='<h2>Amount Rs '+'<span id="amt"></span></h2>';


        var itemForm = document.getElementById("addToCart");
        var input = document.createElement('input');

        // append a child node - hidden input to pass menuIndex
        input.setAttribute('type','hidden');
        input.setAttribute('name','menuIndex');
        input.setAttribute('value',queryStringObject.menuIndex);
        itemForm.appendChild(input);

      } else {
        console.log("error trying to load menuIndex", menuIndex);
        window.location = '/menu/list'
      }
    });  
  
  }
};

app.makePayment = function() {
  console.log("Making Payment....");
};



// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      } else {
        // redirect to home page
        window.location ='';
      }
    });
  },1000 * 60);
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.tokenid,
      'extend' : true,
    };
    
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.tokenid};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};



// Init (bootstrapping)
app.init = function(){

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads 
window.onload = function(){
  app.init();
};

