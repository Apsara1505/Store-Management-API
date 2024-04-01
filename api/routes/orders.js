const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth.js");

const OrderController = require("../controllers/orders.js");

/**
 * Handle incoming GET requests to /orders
 */
router.get("/", checkAuth, OrderController.orders_get_all);

router.post("/", checkAuth, OrderController.orders_create_order);

router.get("/:orderId", checkAuth, OrderController.orders_get_order_by_Id);

router.delete("/:orderId", checkAuth, OrderController.orders_delete_order);

module.exports = router;
