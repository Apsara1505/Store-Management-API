const mongoose = require("mongoose");
const Order = require("../models/order.js");
const Product = require("../models/product.js");


exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .populate('product')
        .exec()
        .then((docs) => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map((doc) => {
                    return {
                        _id: doc.id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id,
                        },
                    };
                }),
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
}


exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: "Product NOT FOUND!"
                });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity,
            });
            return order.save()
        })
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Order Confirmed",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id,
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

exports.orders_get_order_by_Id = (req, res, next) => {
    Order.findById(req.params.orderId)
         .populate('product')
         .exec()
         .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order NOT FOUND!'
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http:/localhost:3000/orders/'
                }
            });
         })
         .catch(err => {
            res.status(500).json({
                error: err
            })
         });
}

exports.orders_delete_order = (req, res, next) => {
    Order.deleteOne({_id: req.params.orderId})
         .exec()
         .then(result => {
            res.status(200).json({
                message: 'Order Deleted!',
                result: result,
                request: {
                    type: 'POST',
                    url: 'http:/localhost:3000/orders/',
                    body: { productId: "ID", quantity: "Number" }
                }
            });
         })
         .catch(err => {
            res.status(500).json({
                error: err
            })
         });
}