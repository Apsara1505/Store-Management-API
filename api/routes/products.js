const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const checkAuth = require('../middleware/check-auth.js')
const ProductController = require("../controllers/products.js")


/**
 * store upload files
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        // Generate a unique filename using UUID and original file extension
        const uniqueFilename = uuidv4() + fileExtension; 
        cb(null, uniqueFilename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
    },
    fileFilter: fileFilter
});



/**
 * get all products
 */
router.get('/', ProductController.products_get_all);


/**
 * create new product
 */
router.post("/", checkAuth, upload.single('productImage'), ProductController.products_create_product);

/**
 * get product by ID
 */
router.get('/:productId', ProductController.products_get_product_by_Id);


/**
 * update a product by ID
 */
router.patch('/:productId', checkAuth, ProductController.products_update_product);


/**
 * Delete a product by ID
 */
router.delete('/:productId', checkAuth, ProductController.products_delete_product);


module.exports = router;