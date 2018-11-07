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
	
7. create a structure for order
7.1 Review changes needed to user in view of Cart and Order


