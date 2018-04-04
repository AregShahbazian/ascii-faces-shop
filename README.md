Products Grid
====

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes.

### Installation

- $ npm install

### Running the app

- $ npm start

This will start the app using `webpack-dev-server`, by default on `http://localhost:8080`.It will also start the REST-API server using `json-server`, by default on `http://localhost:3000` 

### Features

The homepage displays an initial load of products. Instead of a aligned grid, a flex-layout is used. This 
accentuates more the differences between the sizes of the ascii faces.

Scrolling down will load more products, 30 at a time. After displaying every 20 products, and ad is inserted, making 
sure that the same ad is never displayed twice in a row.

It's also possible to choose the ordering of the products (in ascending order).

### Stack

The app uses the ReactJS framework, and is written in JSX and ES6 syntax. Babel is used to transpile the ES6 code, and Webpack 
bundles the code together and prepares it for the browser.

The React state is handled using Redux. Asynchronous processes are implemented with `redux-saga`, using some convenience 
libraries as `redux-saga-routines` and `redux-actions`. Handling API calls is done using the `axios` library, and to 
ensure state-immutability, the `immutability-helper` library is used by the reducers to change the state.

