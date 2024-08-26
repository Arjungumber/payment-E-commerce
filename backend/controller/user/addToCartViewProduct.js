import cartProductModel from "../../models/cartProduct.js";
const addToCartViewProduct = async(req,res)=>{
    try {
    const currentUser = req.userId; // from middleware
   const allProduct = await cartProductModel.find({
    userId : currentUser
   }).populate("productId");
   // populating it through productId to get images in the frontend

   res.json({
    data:allProduct,
    success:true,
    error:false
   })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export default addToCartViewProduct;