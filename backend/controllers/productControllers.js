const Product = require("../model/productModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleWare/catchAsyncError")
//Creating Product--Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{

    const product = await Product.create(req.body)
    console.log("Inside Create")
    res.status(201).json({
        success:true,
        product
    });

});

//Update Product --Admin

exports.updateProduct =catchAsyncError( async (req,res) => {
    let product = Product.find(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }   

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});


    res.status(200).json({
        success:true,
        product
    })
});

//Delete Product--Admin

exports.deleteProduct = catchAsyncError( async(req,res,next) =>{

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Product Deleted"
    })
});


//GET ALL Products
exports.getAllProducts = catchAsyncError( async (req,res) => {
    
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products 
    })
})


//Get Single Product

exports.getSingleProduct = catchAsyncError( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }

    await Product.findById(req.params.id);

    res.status(200).json({
        success:true,
        product
    })
})




