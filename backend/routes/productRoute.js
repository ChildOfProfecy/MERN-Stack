const express = require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct, getSingleProduct} = require("../controllers/productControllers");
const { isAuthenticatedUser,authorizeRoles } = require("../middleWare/auth");
const router = express.Router();




router.route("/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAllProducts);

router.route("/product/new").post(isAuthenticatedUser,createProduct);

router.route("/product/:id").put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct).get(getSingleProduct);



module.exports = router;