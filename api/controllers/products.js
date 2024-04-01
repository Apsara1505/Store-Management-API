const Product = require('../models/product.js');
const mongoose = require('mongoose');


exports.products_get_all = (req, res, next) => {
    Product.find()
           .select('name price _id productImage')
           .exec()
           .then(docs => {
                const response = {
                    count: docs.length,
                    products: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            productImage: doc.productImage,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/products/' + doc._id
                            }
                        }
                    })
                };
                res.status(200).json(response);
           })
           .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
           });
}


exports.products_create_product = (req, res, next) => {
    const product = new Product ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
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
}

exports.products_get_product_by_Id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            if (!doc) {
                return res.status(404).json({ 
                    message: "Product not found" 
                });
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
}

exports.products_update_product = (req, res, next) => {
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
}

exports.products_delete_product = (req, res, next) => {
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
}