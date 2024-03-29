const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true,"Please Enter Product Name"]

    },

    description:{
        type : String,
        required:[true,"Please Enter Product description"]
    },

    price:{
        type : Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"No price Above 8 digits"]
    },

    ratings:{
        type: Number,
        default:0
    },

    images:[
        {        
            public_id:{
            type:String,
            required:true
        },
        url:{
            type : String,
            required:true
        }
    }
    ],

    category:{
        type : String,
        required:[true,"Please Enter Product Category"]
    },

    stock:{
        type:Number,
        required:[true,"Please Enter Product stock"],
        maxLength:[4,"Only 10000 stocks at a time"]
    },

    numOfReviews:{
        type:Number,
        default:0
    },

    reviews:[{
        name:{
            type : String,
            required:true
        },
        rating:{
            type : String,
            required:true
        },
        comment:{
            type:String
        }
    }],

    createdAt:{
        type:Date,
        default:Date.now
    }




})


module.exports = mongoose.model("Product",productSchema);