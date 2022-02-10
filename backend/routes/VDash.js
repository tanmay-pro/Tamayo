var express = require("express");
var router = express.Router();

const Vendor = require("../models/Vendor");
const Item = require("../models/Food");
const Order = require("../models/Order");
// const validateFood = require("../validator/Food");

router.get("/", function(req, res) {
    Item.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/get_shops", (req, res) => {
    const array = [];
    Vendor.find({}).then(user => {
        for (var i = 0; i < user.length; i++) {
            array.push(user[i].shopName);
        }
        res.json(array);
    });
});


router.post("/display_items", (req, res) => {
    Item.find({ vendor_email: req.body.vendor_email }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    });
});

router.post("/get_item", (req, res) => {
    Item.findOne({ vendor_email: req.body.vendor_email, name: req.body.name }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    });
});


router.post("/add_item", function(req, res) {
    Item.findOne({ vendor_email: req.body.vendor_email, name: req.body.name }).then(item => {
        if (item) {
            return res.status(404);
        } else {
            const newItem = new Item({
                name: req.body.name,
                price: req.body.price,
                rating: req.body.rating,
                type: req.body.type,
                addOnName: req.body.addOnName,
                addOnPrice: req.body.addOnPrice,
                tags: req.body.tags,
                vendor_email: req.body.vendor_email,
                image: req.body.image,
                description: req.body.description
            });
            newItem.save()
                .then(newItem => { res.json(newItem) })
                .catch(err => { console.log(err) });
        }
    });
});

router.post("/edit_item", (req, res) => {
    Item.findOne({ name: req.body.name, vendor_email: req.body.vendor_email }).then(item => {
        if (item) {
            item.price = req.body.price;
            item.name = req.body.name;
            item.type = req.body.type;
            item.addOnName = req.body.addOnName;
            item.addOnPrice = req.body.addOnPrice;
            item.tags = req.body.tags;
            item.image = req.body.image;
            item.description = req.body.description;
            item.save()
                .then(item => { res.json(item) })
                .catch(err => { console.log(err) });
        } else {
            res.status(400).json({ error: "Item does not exist" });
        }
    });
});

router.post("/delete_item", (req, res) => {
    Item.findOne({ name: req.body.name, vendor_email: req.body.vendor_email }).then(item => {
        if (item) {
            item.remove()
                .then(item => { res.json(item) })
                .catch(err => { console.log(err) });
        } else {
            res.status(400).json({ error: "Item does not exist" });
        }
    });
});

router.post("/get_fav", (req, res) => {
    Item.find({ fav: true, vendor_email: req.body.vendor_email }).then(item => {
        if (item) {
            res.json(item);
        } else {
            res.status(400).json({ error: "Item does not exist" });
        }
    });
});

router.get("/orders", function(req, res) {
    Order.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/display_orders", (req, res) => {
    Order.find({ vendor_email: req.body.vendor_email }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "Vendor does not exist" });
        }
    });
});

router.post("/update_status", function(req, res) {
    Order.findOne({ id: req.body.id, vendor_email: req.body.vendor_email }).then(order => {
        if (order) {
            order.status = req.body.status;
            order.save()
                .then(order => { res.json(order) })
                .catch(err => { console.log(err) });
        } else {
            res.status(400).json({ error: "Order does not exist" });
        }
    });
});

router.post("/get_vendor", (req, res) => {
    Vendor.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    });
});

router.post("/delete_item", (req, res) => {
    Item.findOne({ name: req.body.name, vendor_email: req.body.vendor_email }).then(item => {
        if (item) {
            item.remove()
                .then(item => { res.json(item) })
                .catch(err => { console.log(err) });
        } else {
            res.status(400).json({ error: "Item does not exist" });
        }
    });
});

router.post("/get_item", (req, res) => {
    Item.findOne({ name: req.body.name, vendor_email: req.body.vendor_email }).then(item => {
        if (item) {
            res.json(item);
        } else {
            res.status(400).json({ error: "Item does not exist" });
        }
    });
});


module.exports = router;