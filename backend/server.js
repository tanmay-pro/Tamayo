const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "Tamayo"

// routes
var testAPIRouter = require("./routes/testAPI");
var VendorRouter = require("./routes/Vendor");
var BuyerRouter = require("./routes/Buyer");
var LoginRouter = require("./routes/Login");
var VendorDashboardRouter = require("./routes/VDash");
var BuyerDashboardRouter = require("./routes/BDash");
var OrderRouter = require("./routes/Orders");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/v_signup", VendorRouter);
app.use("/b_signup", BuyerRouter);
app.use("/login", LoginRouter);
app.use("/v_dashboard", VendorDashboardRouter);
app.use("/b_dashboard", BuyerDashboardRouter);
app.use("/order", OrderRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});