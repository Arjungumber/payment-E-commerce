import cartProductModel from "../../models/cartProduct.js";

const deleteAddToCartProduct = async(req,res) =>{
   try {
    const currentUserId = req?.userId;
    const productId = req.body?._id;

    const deleteProduct = await cartProductModel.deleteOne({_id:productId});
  res.json({
    message:"Product deleted from cart",
    data:deleteProduct,
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

export default deleteAddToCartProduct;