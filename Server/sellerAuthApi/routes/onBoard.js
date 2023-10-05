require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var authController = require("../controllers/authControllers");
const fs = require('fs');
const productModel = require("../models/product");
const variantModel = require("../models/variantModel");
const inventoryModel = require("../models/inventoryModel");
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
const variantUpload = multer({
  storage: Storage,
}).single('variantImage');

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
        expectedDelivery: req.body.expectedDelivery,
        brand: req.body.brand,
        gender: req.body.gender,
        mainImage: mainImageData,
        productImage: productImages,
        productPrice:req.body.productPrice,
        variantType:req.body.variantType,
        variantName: req.body.variantName,
        size:req.body.size
      });
      try {
          newProduct.save().then(async(savedProduct)=>{
          console.log("saved");
          const inventoryItem = new inventoryModel({
            productId: savedProduct._id,
            shopId: savedProduct.shopId,
            quantity: req.body.productAmount, // Set the initial quantity to 0 or an appropriate value
          });
          await inventoryItem.save();
          res.status(201).send({productId:savedProduct._id,msg:"successfully saved"});
        });
      } catch (error) {
        res.status(500).send({error:error.message});
      }
      
    }
  })
  
})

router.post('/storeProductVariant',(req,res)=>{
  //store data in the database
  variantUpload(req,res,(err)=>{
    if(err){
      res.send(err);
    }
    else{
      console.log(req.body) 
      console.log(req.file)
      const variantImage = req.file;
        const variantImageData = {
          data: variantImage.filename,
          contentType: variantImage.mimetype,
        };



      const newProduct =  new variantModel({
        shopId : req.body.shopId,
        shopName: req.body.shopName,
        variantName: req.body.variantName,
        variantType: req.body.variantType,
        productId: req.body.productId,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        expectedDelivery: req.body.expectedDelivery,
        brand: req.body.brand,
        gender: req.body.gender,
        productPrice:req.body.productPrice,
        variantImage: variantImageData,
        size: req.body.size
      });
      try {
        newProduct.save().then(async()=>{
          console.log("saved");
          const inventoryItem = new inventoryModel({
            productId: savedProduct._id,
            shopId: savedProduct.shopId,
            quantity: req.body.productAmount, // Set the initial quantity to 0 or an appropriate value
          });
          await inventoryItem.save();
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
      const productImages = element.productImage.map((image) => ({
        imagePath: path.join('..', 'assets', `${shopId}`, image.data.toString())
      }));
      const items = {
        shopId : element.shopId,
        shopName : element.shopName,
        productId: element._id,
        productName: element.productName,
        productDescription: element.productDescription,
        productPrice: element.productPrice,
        productDescription: element.productDescription,
        expectedDelivery: element.expectedDelivery,
        brand: element.brand,
        size : element.size,
        gender: element.gender,
        productImage: productImages,
        isAvailable: element.isAvailable,
        mainImagePath : path.join('..','assets',`${shopId}`,element.mainImage.data.toString()),
      };
      productArray.push(items);
    });

    res.status(201).send(productArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/getProductInfo/:productId",async(req,res) =>{
  try{
    const productId = req.params.productId;
    const result = await productModel.findOne({_id:productId});
    console.log(result);
    const productImages = result.productImage.map((image) => ({
      imagePath: path.join('..', 'assets', `${result.shopId}`, image.data.toString())
    }));
    const item = {
      shopId : result.shopId,
      shopName : result.shopName,
      productId: result._id,
      productName: result.productName,
      productDescription: result.productDescription,
      productPrice: result.productPrice,
      productDescription: result.productDescription,
      expectedDelivery: result.expectedDelivery,
      brand: result.brand,
      variantName: result.variantName,
      variantType : result.variantType,
      size : result.size,
      gender: result.gender,
      productImage: productImages,
      isAvailable: result.isAvailable,
      mainImagePath : path.join('..','assets',`${result.shopId}`,result.mainImage.data.toString()),
  }
  console.log(item);
  res.status(200).json({item})
}
  catch(err){
    res.status(500).json({err:err.message})
  }
})

router.get("/getProductVariantInfo/:productId",async(req,res) =>{
  try{
    const productId = req.params.productId;
    const result = await variantModel.findOne({_id:productId});
    console.log(result);
    const item = {
      shopId : element.shopId,
        shopName : element.shopName,
        productId: element._id,
        productName: element.productName,
        variantType:element.variantType,
        variantName:element.variantName,
        productDescription: element.productDescription,
        productPrice: element.productPrice,
        expectedDelivery: element.expectedDelivery,
        brand: element.brand,
        color: element.color,
        size: element.size,
        gender: element.gender,
        isAvailable: element.isAvailable,
        variantImagePath : path.join('..','assets',`${element.shopId}`,element.variantImage.data.toString()),
  }
  console.log(item);
  res.status(200).json({item})
}
  catch(err){
    res.status(500).json({err:err.message})
  }
})

router.get("/showProduct/:productId",async(req,res)=>{
  try{
    const productId = req.params.productId;
    const productInfo = await productModel.findOne({_id:productId});
    console.log(productInfo);
    const productImages = productInfo.productImage.map((image) => ({
      imagePath: path.join('..', 'assets', `${productInfo.shopId}`, image.data.toString())
    }));
    const item = {
      shopId : productInfo.shopId,
      shopName : productInfo.shopName,
      productId: productInfo._id,
      productName: productInfo.productName,
      variantType : productInfo.variantType,
      variantName : productInfo.variantName,
      productDescription: productInfo.productDescription,
      productPrice: productInfo.productPrice,
      productDescription: productInfo.productDescription,
      expectedDelivery: productInfo.expectedDelivery,
      brand: productInfo.brand,
      size: productInfo.size,
      gender: productInfo.gender,
      productImage: productImages,
      isAvailable: productInfo.isAvailable,
      mainImagePath : path.join('..','assets',`${productInfo.shopId}`,productInfo.mainImage.data.toString()),
  }
    console.log(item);
    const variants = await variantModel.find({productId:productId});
    const variantMap = new Map();
    variants.forEach((element) => {
      const variant = {
        shopId : element.shopId,
        shopName : element.shopName,
        productId: element._id,
        productName: element.productName,
        variantType:element.variantType,
        variantName:element.variantName,
        productDescription: element.productDescription,
        productPrice: element.productPrice,
        expectedDelivery: element.expectedDelivery,
        brand: element.brand,
        color: element.color,
        size: element.size,
        gender: element.gender,
        isAvailable: element.isAvailable,
        mainImagePath : path.join('..','assets',`${element.shopId}`,element.variantImage.data.toString()),
      };
      if(!variantMap.has(element.variantType)){
        variantMap.set(element.variantType,[]);
      }
      const variantArray = variantMap.get(element.variantType);
      const index = variantArray.findIndex((item) => item.variantName === element.variantName);

      if (index === -1) {
        variantArray.push({
          variantName: element.variantName,
          variantArray: [variant],
        });
      } else {
        variantArray[index].variantArray.push(variant);
      }
    });
    const variantObject = Object.fromEntries(variantMap);
    res.status(200).json({item,variantObject});
  }
  catch(err){
    console.log(err);
  }
})

router.get("/", (req, res) => {
  res.send("API is working");
});
module.exports = router;
