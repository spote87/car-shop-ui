# Frank's Car Shop App

**How to run it:**

###### Prerequisite:
 This application uses node package manager and also it runs on Node server so node should be installed before running this application.

###### **Technical Stack:**
1. AngularJS 1.x
2. Node
3. HTML/CSS/Bootstrap

###### **Run locally:**

    _npm install_
    
    _bower install_
    
    _grunt build_

    _grunt_
    
 Last command will launch application locally. 
 
 **Note**: If you see _connection refused_ error, please refresh the page as sometimes browser is opened before server is fully started.

###### **Functionality** 
On home page, application shows available cars in Frank's Garage. User can click on any car which has valid licence.
New dialog will open where user can see more details about selected car. Also he/she can _add that car to the cart_. However, they cannot buy cars with invalid licence.

Once user is done with shopping, he/she can go to cart by clicking on _**Go To Cart**_ on top right corner.
User can click on **Checkout** button where he needs to fill username in order to place an order. Once username is provided and **Submit** button is clicked, user will see success message along with order id.

If there are no items in shopping cart, user will see proper message on *S*hopping Cart page. 

