# Tamayo

## About the Application

* This is a Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js. It is basically a webapp where users can buy, sell products and place orders.
* The app has an option for vendors to add products they want to sell.
* The buyers can buy products, place orders and give reviews to the products sold by vendors.
* The app supports the authentication and authorisation of two user types, and is designed to be responsive and user-friendly.
* Users have the option to search and order various food items. At the same time, various vendors have the ability to list food items.

## Requirements

* NodeJS
* ReactJS
* ExpressJS
* MongoDB

## Running the Application

* Run Mongo daemon:

```sh
sudo service mongod start
```

Mongo will be running on port 27017.
In case of errors in starting mongoDB on Debian, refer: https://mongoing.com/docs/tutorial/install-mongodb-on-debian.html

* Run Express Backend:

```sh
cd backend/
npm install
npm start
```

* Run React Frontend:

```sh
cd frontend
npm install/
npm start
```
Use Version 16 of nodeJS. 
If getting reference errors (example: BigInt is not defined), try using an updated version of nodeJS (using nvm is a quick solution).

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.
