const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products.js');
const orderRoutes = require('./api/routes/orders.js');


mongoose.connect("mongodb+srv://saara:" + process.env.MONGO_ATLAS_PW + "@cluster0.kdvfuyt.mongodb.net/");


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // to make the upload folder publicly available
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
               'Origin, X-Requested-With, Content-Type, Accept, Authorization'
              );
              if (req.method === 'OPTIONS') {
                  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
                  return res.status(200).json({});
              }
              next();
})
/**
 * routes which should handle requests
 */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error .status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;