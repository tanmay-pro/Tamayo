# Tamayo

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

If getting reference errors (example: BigInt is not defined), try using an updated version of nodeJS. (using nvm is a quick solution).

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.
