const orderModel = require("../models/orderModel");
const AppError = require("../utils/appError");

//middlewares
exports.addOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    const newOrder = await orderModel.create(orderData);
    res.send({
      status: "success",
      OrderDetails: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.updateDeliveryDate = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const shopID = req.params.shopId;
    const orders = await orderModel.find({ shopId: shopID });
    if (orders) {
      res.send({
        status: "success",
        Orders: orders,
      });
    } else throw new AppError("shopId has no orders", 401);
  } catch (error) {
    next(error);
  }
};
