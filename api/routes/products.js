const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product.js');

/**
 * get all products
 */
router.get('/', (req, res, next) => {
    Product.find()
           .select('name price _id')
           .exec()
           .then(docs => {
                const response = {
                    count: docs.length,
                    products: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/products/' + doc._id
                            }
                        }
                    })
                };
                //if (docs.length >= 0) {
                    res.status(200).json(response);
                // } else {
                //     res.status(404).json({
                //         message: 'No entries found'
                //     })
                // }
           })
           .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
           });
    // res.status(200).json ({
    //     message: 'Handling GET requests to /products'
    // });
});

/**
 * create new product
 */
router.post('/', (req, res, next) => {
    const product = new Product ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json ({
                message: 'Product Created Successfully!',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

/**
 * get product by ID
 */
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            if (!doc) {
                return res.status(404).json({ message: "Product not found" });
            }
            console.log("From Database", doc);
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_PRODUCTS',
                    url: 'http://localhost:3000/products/'
                }
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err }); 
        });
});

/**
 * update a product by ID
 */
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
           .exec()
           .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Product UPDATED!',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + id
                    }
                })
           })
           .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
           });

    // res.status(200).json ({
    //     message: 'Updated product!'
    // })
});

/**
 * Delete a product by ID
 */
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
           .exec()
           .then(result => {
                res.status(200).json({
                    message: 'Product DELETED!',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/products/',
                        body: {name: 'String', price: 'Number'}
                    }
                });
           })
           .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
           });
    // res.status(200).json ({
    //     message: 'Deleted product!'
    // })
});


module.exports = router;