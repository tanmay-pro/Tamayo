const bcrypt = require("bcryptjs/dist/bcrypt");
var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Buyer");
const Vendor = require("../models/Vendor");
// Login
const validateLogin = require("../validator/Login");

router.post("/", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    Vendor.findOne({ email: email }).then(user => {
        // Check if user email exists
        if (user) {
            // if (user.password === req.body.password) {
            //     res.send("Email Found");
            //     return user;
            // } else {
            //     res.send("Password not Found");
            // }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    res.json(user);
                } else {
                    return res.status(400).send("Password not found")
                }
            });
        } else {
            Buyer.findOne({ email: email }).then(user => {
                if (user) {
                    // if (user.password === req.body.password) {
                    //     res.send("Email Found");
                    //     return user;
                    // } else {
                    //     res.send("Password not Found");
                    // }
                    bcrypt.compare(password, user.password).then(isMatch => {
                        if (isMatch) {
                            res.json(user);
                            // return user;
                        } else {
                            return res.status(400).send("Password not found")
                        }
                    });
                } else {
                    return res.status(400).send("Email not found")
                }
            })
        }
    });
});

module.exports = router;