var express = require("express");
var router = express.Router();
const validateVendor = require("../validator/Vendor");
// Load User model
const bcrypt = require("bcryptjs");
const Vendor = require("../models/Vendor");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Vendor.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const { errors, isValid } = validateVendor(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Vendor.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        } else {
            const newVendor = new Vendor({
                mangFirstName: req.body.mangFirstName,
                mangLastName: req.body.mangLastName,
                shopName: req.body.shopName,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password,
                canteenOpen: req.body.canteenOpen,
                canteenClose: req.body.canteenClose,
                // userType: req.body.userType
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newVendor.password, salt, (err, hash) => {
                    if (err) throw err;
                    newVendor.password = hash;
                    newVendor.save()
                        .then(user => {
                            res.status(200).json(user);
                        })
                        .catch(err => {
                            res.status(400).send(err);
                        });
                });
            });
        }
    });
});

router.post('/user_detail', (req, res) => {
    Vendor.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    });
});

router.post('/edit', (req, res) => {
    Vendor.findOne({ email: req.body.email }).then(user => {
        if (user) {
            user.mangFirstName = req.body.mangFirstName;
            user.mangLastName = req.body.mangLastName;
            user.shopName = req.body.shopName;
            user.contact = req.body.contact;
            user.email = req.body.email;
            user.canteenOpen = req.body.canteenOpen;
            user.canteenClose = req.body.canteenClose;
            user.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    });
});
module.exports = router;