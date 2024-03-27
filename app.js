const express = require('express');
const morgan = require('morgan');
const app = express();

const productRoutes = require('./api/routes/product.js')
const orderRoutes = require('./api/routes/orders.js')

app.use(morgan('dev'));
/**
 * routes which should handle requests
 */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;

// app.use((req, res, next) => {
//     res.status(200).json ({
//         message: 'It Works!',
//     })
// })