require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var authController = require("../controllers/authControllers");
const fs = require('fs');
const productModel = require("../models/product");

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser :  true},mongoose.set('strictQuery',true)).then(()=>{
//     console.log("connected");}).catch((err)=>{console.log(err);})

//Image File Storage
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Retrieve the shopName from the request body
    const shopId = req.body.shopId;

    // Construct the destination path with the shopName
    const destinationPath = `public/assets/${shopId}`;

    // Create the folder if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }
    cb(null, destinationPath);
  },
// productImages file is created
  filename: (req, file, cb) => {
    cb(null, file.originalname); //stored in binary format
  },
});
const upload = multer({
  storage: Storage,
}).fields([
  {name: 'mainImage', maxCount: 1 },
  {name: 'productImages', maxCount:5},
]);

router.post('/storeProduct',(req,res)=>{
  //store data in the database
  upload(req,res,(err)=>{
    if(err){
      res.send(err);
    }
    else{
      console.log(req.body) 
      console.log(req.files)
      const mainImage = req.files.mainImage[0]
        const mainImageData = {
          data: mainImage.filename,
          contentType: mainImage.mimetype,
        };

        const productImages = req.files.productImages.map((file) => ({
            data: file.filename,
            contentType: file.mimetype,
          }));

      const newProduct =  new productModel({
        shopId : req.body.shopId,
        shopName: req.body.shopName,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productAmount:{
          weight: req.body.weight, //in kg
          amount: req.body.amount  // in pieces
        } ,
        mainImage: mainImageData,
        productImage: productImages,
        productPrice:req.body.productPrice
      });
      try {
        newProduct.save().then(()=>{
          console.log("saved");
          res.status(201).send({msg:"successfully saved"});
        });
      } catch (error) {
        res.status(500).send({error:error.message});
      }
      
    }
  })
  
})
router.get("/getProduct/:shopId", async (req, res) => {
  // get data from shopId
  try {
    const shopId = req.params.shopId;
    const result = await productModel.find({ shopId: req.params.shopId });
    var productArray = [];
    result.forEach((element) => {
      const items = {
        productId: element._id,
        productName: element.productName,
        productDescription: element.productDescription,
        productPrice: element.productPrice,
        productDescription: element.productDescription,
        mainImagePath : path.join('..','assets',`${shopId}`,element.mainImage.data.toString()),
      };
      productArray.push(items);
    });

    res.status(201).send(productArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", (req, res) => {
  res.send("API is working");
});
module.exports = router;
