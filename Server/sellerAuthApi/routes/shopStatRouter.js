const express = require("express");
const Router = express.Router();
const shopStatController = require("../controllers/shopStatController");
const authController = require("../controllers/authControllers");

const protect = authController.protectRoutes;

Router.post("/addStat", shopStatController.addStat);
Router.get("/addVisit/:shopId", shopStatController.addVisit);
Router.get("/addSale/:shopId", shopStatController.addSale);
Router.get("/getStats/:shopId", shopStatController.getStat);
module.exports = Router;
