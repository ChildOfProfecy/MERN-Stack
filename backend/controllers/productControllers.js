const Product = require("../model/productModels")

//Creating Product--Admin

exports.createProduct = async (req,res,next)=>{

    const product = await Product.create(req.body)
    console.log("Inside Create")
    res.status(201).json({
        success:true,
        product
    })

}


//GET ALL Products
exports.getAllProducts = async (req,res) => {
    
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products 
    })
}



