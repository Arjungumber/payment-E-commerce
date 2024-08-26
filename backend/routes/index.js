import express from "express";
const router = express.Router();
import userSignUpController from "../controller/user/userSignUp.js";
import userSignInController from "../controller/user/userSignin.js";
import userDetailsController from "../controller/user/userDetail.js";
import authToken from "../middleware/authToken.js";
import userLogout from "../controller/user/userLogout.js";
import allUsers from "../controller/user/allusers.js";
import updateUser from "../controller/user/updateUser.js";
import uploadProductController from "../controller/product/uploadProduct.js";
import getProductController from "../controller/product/getProducts.js";
import updateProductController from "../controller/product/updateProduct.js";
import getCategoryProduct from "../controller/product/getCategoryProductOne.js";
import getCategoryWiseProduct from "../controller/product/getCategoryWiseProduct.js";
import getProductDetails from "../controller/product/getProductDetails.js";
import addToCartController from "../controller/user/addToCartController.js";
import countCartProduct from "../controller/user/countCartProduct.js";
import addToCartViewProduct from "../controller/user/addToCartViewProduct.js"
import updateAddToCartProduct from "../controller/user/updateAddToCartProduct.js";
import deleteAddToCartProduct from "../controller/user/deleteAddToCartProduct.js";
import searchProduct from "../controller/product/searchProduct.js";
import filterProductController from "../controller/product/filterProduct.js";
import paymentController from "../controller/order/paymentController.js";
import webhooks from "../controller/order/webhook.js";
import orderController from "../controller/order/orderController.js";
import allOrderController from "../controller/order/allOrderController.js";

router.post("/signup", userSignUpController);

router.post("/signin",userSignInController);

router.get("/user-details",authToken,userDetailsController);

router.get("/userLogout",userLogout);

// admin panel
router.get("/all-user",authToken,allUsers);
router.post("/update-user",authToken,updateUser);

// product
router.post("/upload-product",authToken,uploadProductController);
router.get("/get-product",getProductController);
router.post("/update-product",authToken,updateProductController);
router.get("/get-categoryProduct",getCategoryProduct);
router.post("/category-product",getCategoryWiseProduct);
router.post("/product-details",getProductDetails);
router.get("/search",searchProduct);
router.post("/filter-product",filterProductController);

// user 
router.post("/addtocart",authToken,addToCartController);
router.get("/countAddToCartProduct",authToken,countCartProduct);
router.get("/view-cart-product",authToken,addToCartViewProduct);
router.post("/update-cart-product",authToken,updateAddToCartProduct);
router.post("/delete-cart-product",authToken,deleteAddToCartProduct);

// payment and order
router.post('/checkout',authToken,paymentController);
router.post('/webhook',webhooks); // api/webhook
router.get('/orders',authToken,orderController);
router.get('/all-orders',authToken,allOrderController);

export default router;
