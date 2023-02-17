var mongoose =  require('mongoose');

mongoose.Schema({
    prodctName:{
        type: String,
        required : true
    },
    productImage:{
        type:String
    },
    prodctDescription:{
        type:String
    },
    productAmount:{
        weight:{
            type:Number //in grams

        },
        amount:{
            type:Number, //or in piece
            default:-1
        }
    }
    

})