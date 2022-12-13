const express = require("express");
const router = express.Router();

const { addOrderToUserHistory, userById} = require("../controller/UserController");
const { decreaseQuantity } = require("../controller/ProductController");
const OrderController = require('../controller/orderController')

router.post(
    "/order/create/:userId",
    addOrderToUserHistory,
    decreaseQuantity,
    OrderController.create
);

router.get("/order/list/:userId",  OrderController.listOrders);
router.get(
    "/order/status-values/:userId",
    OrderController.getStatusValues
);

router.put(
    "/order/:orderId/status/:userId",
    OrderController.updateOrderStatus
);


router.param("orderId", OrderController.orderById);


module.exports = router;