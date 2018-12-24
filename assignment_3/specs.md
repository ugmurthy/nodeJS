specs.md

BASICS - user CRUD
	1- implement handlers.index
		- load simple index page
	2- interpolate and combine
		- interpolate for data
		- combine header, index, footer

	3.1 - implement dummy handlers.accountCreate 
	3.2 - implement dummy handlers.accountEdit including delete user
	3.3 - implement dummy handlers.accountDelete 
	3.4 - implement login handlers.sessionCreate
	3.5 - implement and logout handlers.sessionDelete

MENU
1. View all the items available to order from the menu
2. List of menu item contains href to item
3. Click line item in list to select a menu item to enable see details and optional add it to the cart or back to list
	GET	/menu/?menuIndex=nn&phone=9944994499
	header = {token: "xxxxxxxxxxxxxxxxx"}

TOKEN
1. Resolve renew token bug (fails to renew(put) token as well as get token)
 
CART
1. Fill up a shopping cart
2. Show Shopping cart
3. on - login - check if shopping cart exists for this user, if yes, update name,items in cart and totals
4. on - login - if order exists and not paid for then show order

4. Place an order (with fake credit card credentials), and receive an email receipt

