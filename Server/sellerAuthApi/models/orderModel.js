const mongoose = require("mongoose");
const schema = mongoose.Schema({
  shopId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    default: null,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Delivered", "Pending", "Cancel"],
    default: "Pending",
  },
});

const orderModel = mongoose.model("orderTable", schema);
module.exports = orderModel;
