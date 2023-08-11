const express = require("express");
const authController = require("../controllers/authControllers");
const orderController = require("../controllers/orederController");
const Router = express.Router();
const protect = authController.protectRoutes;

//Routes
Router.post("/addOrder", protect, orderController.addOrder);
Router.patch("/udateStatus", orderController.updateStatus);
Router.patch("updateDeliveryDate", protect, orderController.updateDeliveryDate);
Router.get("/getOrderDetails/:shopId", orderController.getOrderDetails);

module.exports = Router;
