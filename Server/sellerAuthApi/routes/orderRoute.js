require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var authController = require("../controllers/authControllers");
const orderModel = require("../models/orderModel");


exports.addItem = async (req,res,next)=>{
    try {
        const newOrderItem = new orderModel({
          productId:req.body.productId,
          productQuantity:req.body.productQuantity,
          expectedDelivery:req.body.expectedDelivery,
          shippingAddress:{
            addressLine1:req.body.shippingAddress.address_line1,
            addressLine2:req.body.shippingAddress.address_line2,
            city:req.body.shippingAddress.city,
            country:req.body.shippingAddress.country,
            postalCode:req.body.shippingAddress.postal_code,
            mobileNumber:req.body.shippingAddress.mobile_number,
            fullName:req.body.shippingAddress.full_name
          }
        });
    
        await newOrderItem.save();
    
        res.status(201).json({ message: 'Product data stored in orderdata successfully' });
      } catch (error) {
        console.error('Error storing product data in order data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};