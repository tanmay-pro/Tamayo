var express = require("express");
var router = express.Router();
const validateBuyer = require("../validator/Buyer");
// Load User model
const bcrypt = require("bcryptjs");
const Buyer = require("../models/Buyer");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Buyer.find(function(err, users) {
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
    const { errors, isValid } = validateBuyer(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Buyer.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        } else {
            const newBuyer = new Buyer({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age,
                batchType: req.body.batchType,
                userType: req.body.userType
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newBuyer.password, salt, (err, hash) => {
                    if (err) throw err;
                    newBuyer.password = hash;
                    newBuyer.save()
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
    Buyer.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    });
});

router.post('/edit', (req, res) => {
    Buyer.findOne({ email: req.body.email }).then(user => {
        if (user) {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.contact = req.body.contact;
            user.email = req.body.email;
            user.age = req.body.age;
            user.batchType = req.body.batchType;
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