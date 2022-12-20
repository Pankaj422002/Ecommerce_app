JSAMAZONA

1. Create Folder Structure

   1. Create Root folder as jsamazona
   2. add frontend and backend folder
   3. create src folder in frontend
   4. create index.html with heading jsamazona in src
   5. run npm init in frontend folder
   6. npm install live-server
   7. add start command as live-server src --verbose
   8. run npm start

2.
3. Render Dynamic Home Screen

   1. Create data.js
   2. export an array of 6 products
   3. create screens/HomeScreen.js
   4. export Homescreen as an object with render() method
   5. implement render()
   6. import data.js
   7. return products mapped to lis inside an ul
   8. create app.js
   9. liink it to index.html as module
   10. set main d to main-container
   11. create router() function
   12. set main_container innerHTML to homeScreen.render()
   13. set load event of window to router() function

4. Build Url Router

   1. create routes as route : screen object for home screen
   2. create utils.js
   3. export parseRequestURL()
   4. set url as hash address split by slash
   5. return resource, id and verb of url
   6. update router()
   7. set request as parseRequestURL()
   8. build parsedUrl adn compare with routes
   9. if routes exists render it, else render Error404
   10. create screens/Error404.js and render error message

5. Create Node.JS server

   1. run npm init in root jsamazona folder
   2. npm install express
   3. create server.js
   4. add start command as node backend/server.js
   5. require express
   6. move data.js from frontend to backend
   7. create route for /api/products
   8. return products in data.js
   9. run npm start

6. Load Products from backend:

   1. edit homescreen.js
   2. make render async
   3. fetch products from '/api/products' in render();
   4. make router() async and call await homescreen.render()

7. Add Webpack:

   1. cd frontend
   2. npm install -D webpack webpack-cli webpack-dev-server
   3. npm uninstall live-server
   4. "start": "webpack-dev-server --watch-content-base --open"
   5. move index.html,style.css and images to frontend folder
   6. rename app.js to index.js
   7. update index.html
   8. add <script src="main.js"></script> before </body>
   9. npm start
   10. npm install axios
   11. changes fetch

8. Install Babel For ES6 Syntax

   1. npm install -D babel core, cli, node, preset-env
   2. create .babelrc and set presets to @babel/present-env
   3. npm install -D nodemon
   4. set start: nodemon --watch backend --exec babel-node backend/server.js
   5. convert require to import in server.js
   6. npm start

9. install Eslint

   1. npm install -D eslint
   2. npm install -D eslint-config-airbnb-base eslint-plugin-import
   3.

10. Install vscode extension

    1. javascript (es6) code snippets ==> imp + tab
    2. es7 react/redux/graphQL/React-Native snippets ==> fof....
    3. Prettier - Code formatter ==> cnt+s
    4. html&less grammer injections

11. Create Rating Components:

    1. create components/rating.js
    2. create div.rating
    3. link to fontawesome.css in index.html
    4. define rating object with render()
    5. if !props.value return empty div
    6. else use fa fa-star, fa-star-half-o and fa-star-o
    7. last span for props.text || ''
    8. style div.rating, span and last span
    9. edit homescreen
    10. add div.product-rating and use rating component

12. Product screen

    1. get product id from request
    2. implement /api/product/:id api
    3. send ajax requrest to product api
    4. create back to result link
    5. create div.details with 3 columns
    6. col 1 for product image
    7. col 2 for product info
    8. col 3 form product action
    9. style .details and all columns
    10. create add to cart button with add-button id
    11. after_render() to add event to the button
    12. redirect user to cart/:product_id

13. Add to Cart Action:

    1. create CartScreen.js
    2. parseRequestUrl
    3. getProduct(request.id)
    4. addToCart
    5. getCartItems
    6. CartItems.find
    7. if existItem update qty
    8. else add item
    9. seetcartItems

14. Cart Screen UI
    1. cartItems = getCartItems()
    2. create 2 columns for cart itmes and cart action
    3. cartItems.length === 0 ? cart is empty
    4. show items image, name, qty and price
    5. cart action
    6. subtotal
    7. proceed to checkout button
    8. add css style
15. Upadate and Delete cart items
    1. add Qty select next to each item
    2. after_render()
    3. add change event to qty select
    4. getCartItems() and pass to addToCart()
    5. set forceUpdate to true to addToCart()
    6. Create Rerender() as (component, areaName = 'content')
    7. Component.render and component.after_render
    8. if forceUpdate is true then rerender()
    9. add delete button next to each item
    10. add click event to qty button
    11. call removeFromCart(deleteButton.id)
    12. implement removeFromCart(id)
    13. setCartItems(getCartItems().filter)
    14. if id === parseRequestUrl().id? redirect to '/cart'
    15. else rerender(cartscreen);

19. Connect to MongoDB and create admin user
    1. npm install mongoose
    2. connect to mongodb
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URL
    6. create models/usermodel.js
    6. create userSchema and userModel
    7. create userRoute
    8. create createadmin route

20. sign-in Screen UI
   1. create SigninScreen
   2. render email and password fields
   3. style signin form.

21. sign-in screen Backend: 

21. sign-in Screen Action
   1. after_render handle form submit
   2. create signin request in frontend
   3. show alert if email or password is incorrecct
   4. add getUserInfo and setUserInfo to localStorage
   5. create Header Component
   6. if userInfo.email exist show user name otherwise show signin

22. Create Progress Indicator and alert component: 
   1. create overlay loading div in index.html
   2. style overlay loading
   3. create showLoading() function
   4. set loading-overlay classList add active 
   5. create hideLoading() function
   6. create overlay msg div in index.html
   7. add style overlay msg
   8. create showMessage(message, callback)
   

23. Register screen action


//multer is used for uploading the image in website.


24. Build project : ==> 

=====================
IMPORTANT: 

   we uses " "build":"webpack --mode=production --output ./main.js", "
   so that we can build the project..... and it goes to production ...


   we use: 

   "build": "rm -rf && babel backend -d dist", ==> to use the ES5 version so that node can run easily ...

    "serve": "node dist/server.js", ==> now run the server.js from dist folder...

    +++ and also you need to make all files of frontend to static ... in server.js so that 
    they can also be used in just running one command....

=============================


root: 
   "heroku-prebuild":"cd frontend && npm install --dev",
   "heroku-postbuild": "npm run build && cd frontend && npm install && npm build"

  # very end of package.json: 
   "engines":{
      "node":"12.4.0",
      "npm":"6.9.0"
   }

   # now create "Procfile": 
   web: node dist/server.js 

   # convert the port to dynamic: 

   # use mongodb
   mongodb: 
   step: 01 : add new database user:
   {username and password of mongodb ==> save...} 

   step: 02: Network Access => add ip address..=> 0.0.0.0/0

   step: 03: create new database as: 
               i) Clusters > sandbox... collections > create database
                  > database-name and collection-name >  
               ii) save the name of "database-name" in the same folder
                  of username and password..
               iii) create the connection string as: 
                     a) clusters > connect > connect-your-application > copy

               iv) now replace the connection string with the username, password and dbname saved..
               v) heroku config:set MONGODB_URL = "<strig>"
   
   # now commit change and push to github: 

   git push heroku

   now add the root url in place of 'http://localhost:9000' in config.js as: 
   config.js > command: 

   export const apiUrl = document.location.href.startsWith('http://localhost')
   ? 'http://localhost:9000'
   : '';


   again commit and push to heroku

   change:2: 
   heroku config:set PAYPAL_CLIENT_ID = "<clientid>";

========================
# this is removed form package.json: 

    "start": "nodemon --watch backend --exec babel-node backend/server.js",
