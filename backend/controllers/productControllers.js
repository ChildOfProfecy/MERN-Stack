const Product = require("../model/productModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleWare/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
//Creating Product--Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{

    const product = await Product.create(req.body)
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


    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products,
        productCount
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





