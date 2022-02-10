var express = require("express");
var router = express.Router();

const Buyer = require("../models/Buyer");
const Item = require("../models/Food");

router.post("/veg_items", (req, res) => {
    Item.find({ type: "veg" }).then(item => {
        if (item) {
            res.json(item);
        } else {
            res.status(400).json({ error: "No veg items exist" });
        }
    });
});

router.post("/nveg_items", (req, res) => {
    Item.find({ type: "non-veg" }).then(item => {
        if (item) {
            console.log(item)
            res.json(item);
        } else {
            res.status(400).json({ error: "No non-veg items exist" });
        }
    });
});

router.post("/shop_items", (req, res) => {
    Item.find({ vendor_email: req.body.vendor_email }).then(item => {
        if (item) {
            res.json(item);
        } else {
            res.status(400).json({ error: "No items in shop" });
        }
    });
});

router.post("/add_fav", (req, res) => {
    Buyer.find({ email: req.body.email }).then(buyer => {
        if (buyer) {
            Item.find({ vendor_email: req.body.vendor_email, name: req.body.food_name }).then(item => {
                if (item) {
                    buyer[0].favName.push(req.body.food_name);
                    buyer[0].favEmail.push(req.body.vendor_email);
                    buyer[0].save();
                    res.json(buyer);
                }
                else {
                    res.status(400).json({ error: "No such item in shop" });
                }
            });
        }
        else {
            res.status(400).json({ error: "No such user exists" });
        }
    });
});

router.post("/get_fav", (req, res) => {
    Item.find({ vendor_email: req.body.favEmail, name: req.body.favName }).then(item => {
        if (item) {
            res.json(item);
        }
        else {
            res.status(400).json({ error: "No such item in shop" });
        }
    });
});

router.post("/add_money", (req, res) => {
    Buyer.findOne({ email: req.body.email }).then(buyer => {
        if (buyer) {
            buyer.wallet = parseInt(buyer.wallet) + parseInt(req.body.wallet);
            buyer.save();
            res.json(buyer);
        }
        else {
            res.status(400).json({ error: "No such user exists" });
        }
    });
});


router.post("/deduct_money", (req, res) => {
    Buyer.findOne({ email: req.body.email }).then(buyer => {
        if (buyer) {
            buyer.wallet = parseInt(buyer.wallet) - parseInt(req.body.wallet);
            buyer.save();
            res.json(buyer);
        }
        else {
            res.status(400).json({ error: "No such user exists" });
        }
    });
});

module.exports = router;