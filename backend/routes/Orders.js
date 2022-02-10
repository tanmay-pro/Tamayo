var express = require("express");
var router = express.Router();

const Order = require("../models/Order");

router.get("/", function(req, res) {
    Order.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/order_detail", (req, res) => {
    Order.findOne({ _id: req.body._id }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "Order does not exist" });
        }
    });
});

router.post("/add_order", (req, res) => {
    const newOrder = new Order({
        vendor_email: req.body.vendor_email,
        buyer_email: req.body.buyer_email,
        food_item: req.body.food_item,
        quantity: req.body.quantity,
        placed_time: req.body.placed_time,
        net_cost: req.body.net_cost,
        addOnNames: req.body.addOnNames,
        batch: req.body.batch,
        age: req.body.age
    });
    newOrder.save()
        .then(newOrder => { res.json(newOrder) })
        .catch(err => { console.log(err) });
});

router.post("/next_stage", (req, res) => {
    Order.findOne({ _id: req.body._id }).then(order => {
        if (order) {
            if (order.status === "pending") {
                order.status = "accepted";
            } else if (order.status === "accepted") {
                order.status = "cooking";
            } else if (order.status === "cooking") {
                order.status = "ready_for_pickup";
            } else if (order.status === "ready_for_pickup") {
                order.status = "completed";
            } else {
                res.status(400).json({ error: "Order is already completed" });
            }
            order.save()
                .then(order => { res.json(order) })
                .catch(err => { console.log(err) });
        } else {
            res.status(400).json({ error: "Order does not exist" });
        }
    });
});

router.post("/reject_order", (req, res) => {
    Order.findOne({ _id: req.body._id }).then(user => {
        if (user) {
            user.status = "rejected";
            res.json(user);
            user.save()
        } else {
            res.status(400).json({ error: "Order does not exist" });
        }
    });
});

router.post("/rate", (req, res) => {
    Order.findOne({ _id: req.body._id }).then(user => {
        if (user) {
            user.rating = req.body.rating;
            res.json(user);
            user.save()
        } else {
            res.status(400).json({ error: "Order does not exist" });
        }
    });
});


router.post("/vorders", (req, res) => {
    Order.find({ vendor_email: req.body.vendor_email }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "Vendor does not exist" });
        }
    });
});

router.post("/borders", (req, res) => {
    Order.find({ buyer_email: req.body.buyer_email }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ error: "Buyer does not exist" });
        }
    });
});

router.post("/get_top", function(req, res) {
    Order.find({ vendor_email: req.body.email, status: "completed" }, function(error, Orders) {
        if (error) {
            console.log(error);
        } else {
            var dict = {};
            Orders.map((item) => {
                if (dict[item.food_item]) { dict[item.food_item] = dict[item.food_item] + 1; } else { dict[item.food_item] = 1; }
            })
            var items = Object.keys(dict).map(function(key) {
                return [key, dict[key]];
            });
            items.sort(function(f, s) {
                return s[1] - f[1];
            });
            res.json(items);
        }
    });
});

router.post("/get_counts", function(req, res) {

    Order.count({ vendor_email: req.body.email, status: "pending" }, function(error, first) {
        if (error) { console.log(error) } else {
            Order.count({ vendor_email: req.body.email, status: "completed" }, function(error, second) {
                if (error) { console.log(error) } else {
                    Order.count({ vendor_email: req.body.email }, function(error, third) {
                        if (error) { console.log(error) } else {
                            res.json({ pending: first, completed: second, total: third });
                        }
                    });
                }
            });
        }
    });

})

router.post("/check_pend", (req, res) => {
    Order.find({}).then(users => {
        if (users) {
            var check = 0;
            for (var i = 0; i < users.length; i++) {
                if (users[i].status === "accepted" || users[i].status === "cooking") {
                    check++;
                }
            }
            res.json(check);
        } else {
            res.status(400).json({ error: "No orders by Vendor" });
        }
    });
});

router.post("/make_pending", (req, res) => {
    Order.findOne({ _id: req.body._id }).then(order => {
        if (order) {
            order.status = "pending";
            order.save();
            res.json(order);
        } else {
            res.status(400).json({ error: "No orders by Vendor" });
        }
    });
});

router.post("/make_chart", (req, res) => {
    Order.find({}).then(order => {
        const freq1 = new Map();
        const freq2 = new Map();
        var data1 = []
        var data2 = []
        if (order) {
            for (var i = 0; i < order.length; i++) {
                user = order[i];
                if (user.status == "completed") {
                    var a = freq1.get(user.batch);
                    var b = freq2.get(user.age);
                    if (a === undefined) { a = 0; }
                    freq1.set(user.batch, a + 1);
                    if (b === undefined) { b = 0; }
                    freq2.set(user.age, b + 1);
                    data1.push({
                        argument: user.batch,
                        value: freq1.get(user.batch)
                    })
                    data2.push({
                        argument: user.age,
                        value: freq2.get(user.age),
                    })
                }
            }
            res.json({ data1: data1, data2: data2 });
        } else {
            res.status(400).json({ error: "No orders by Vendor" });
        }
    });
});



module.exports = router;