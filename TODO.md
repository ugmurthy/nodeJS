Assignment_2

1. Create API specification doc indicating request, method, errros, parameters needed etc
2. implement and test handlers for  users and tokens as per document in 1.

3. find a way to generate menu items as json files

4. implement and test  handlers for menu as per doc
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1 to 4 done on 5/Nov/18 - approx 10 hours
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

5. implement and test handlers for menu with authenticate token - 30 mins
5.1 added : List all menu items : 4 hours on 7/Nov/2018
6. create a json structure for Cart - 30 mins
6.1 write assumptions about cart and users relationship, and cart logic 	
6.2 implement and test API doc item 10. "Add to existing Cart, create Cart if it does not exist"
6.21 if menuItem already exists in cart then just update quantity 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
5 to 6.21 done on 6/Nov/18 - approx 5 hours
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

6.3 implement and test API doc item 11. "GET /cart/?phone=9999999999"
	-- 1 hour
6.4 implement and test API doc item 12. "PUT /cart/" Update cart
    Note: PUT /cart/ allows modification of quantity in a lineItem indicated by menuIndex. if optional field          quantity is not specified - it will delete the line item
          if no menuItem is given then it will empty the whole cart
          of lineItems
	--- 3 hours
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
6.3 and 6.4 done on 6/Nov/18 - took 4 hours
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

6.5 implement and test API doc item 13. "DELETE /cart/?phone=9999999999
	Note: this deletes the cart and removes its reference from user
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
6.5 and 5.1 implemented and tested - total 5 hours on 7/Nov/18
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
7. create a structure for order:
	Order structure - will be same as that of cart except that it will have additional items as follows:

	a) orderID
	b) orderAmount 
	c) paymentStatus
	d) paymentMethod
	e) deliveryStatus
	f) deliveryBy
	g) {cart}

(POST /order/ )
	Create order given (token)
	using token fetch user
	using user record get phone 
	   validated token
	   get userCartId
	get cart
	create order object from available info 
	and compute total order amount, and total quantity
	set payment status to False (not paid)
	set delivery status to false (not delivered)
	set delivered by to somename
	store order record and remove user.userCartID and update orderIds Array with this order
	delete cart
	return order object

(GET /order/)
	 fetches a order given a phone and valid token
(PUT /order/)
	 restores it back to a cart given token : user can now update cart at will
	using token fetch user
	using user record get phone
		validate token
		get orderId
	fetch orderData
	get cart
	delete order
	remove order from user record, add userCartId in user record
	update user
	store cart
	return cart
	
(DELETE /order/) - Not implement as one can use PUT /order/ and DELETE /cart/ to accomplish this
	deletes the order - given phone and valid token
	using token and phone - validate
	fetch user record
	delete order
	remove order reference from user record
	update user record
	

7.1 read card payment API - swipe.com : DONE - took about 4 hours 7/Nov - tested works well
7.2 MAILGUN - handler ready and tested for failure case. Awaiting MAILGUN Support to resovle my account verification issue and after that I will be able to test actual sending of email.
						- 2 hours on 8/Nov


8.0 REVIEW if something needs a change:
	- DELETE user - should now look for carts or orders and delete them too
	- quantity in cart is a String - convert to number (low prio)
	- review error message of API doc item 15
	- POST /pay/ need to include token and validate it - done
	- chase MAILGUN

