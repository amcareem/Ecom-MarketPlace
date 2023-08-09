var mongoose =  require('mongoose');

var productSchema = mongoose.Schema({
    shopId: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    mainImage:{
        data:Buffer,
        contentType:String,
        // required:true
    },
    productImage:[{
        data:Buffer,
        contentType:String
    }],
    productDescription:{
        type : String,
        required:true
    },
    productAmount: {
        weight: {
            type: String, // in KG
        },
        amount: {
            type: String, // or in pieces
        }
    },
    productPrice: {
        type: String,
        required:true
    },
    size: {
        type: String 
    },
    expiryDate: {
        type: Date,
    },
    manufactureDate: {
        type: Date 
    },
    expectedDelivery: {
        type: String,
    },
    discount: {
        type: Number 
    },
    brand: {
        type: String 
    },
    category: {
        type: String 
    },
    color: {
        type: String 
    },
    material: {
        type: String 
    },
    isAvailable: {
        type: Boolean, 
        default: true,
        // required: true
    },
    countryOfOrigin: {
        type: String 
    },
    dimensions: {
        length: {
            type: Number
        },
        width: {
            type: Number // Add product width field (e.g., for furniture, appliances, etc.)
        },
        height: {
            type: Number // Add product height field (e.g., for furniture, appliances, etc.)
        }
    },
    rating: {
        type: Number, // Add product rating field (e.g., for reviews)
        default: 0
    },
    gender:{
        type:String
    }
});

var productModel =  mongoose.model('productModel',productSchema);
module.exports = productModel;