const mongoose = require("mongoose");

const schema = mongoose.Schema({
  shopId: {
    type: String,
    required: true,
  },
  january: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  february: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  march: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  april: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  may: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  june: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  july: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  august: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  september: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  october: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  november: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  december: {
    visits: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
});

const shopStatModel = mongoose.model("shopStatTable", schema);
module.exports = shopStatModel;
