import cartProductModel from "../../models/cartProduct.js";
const updateAddToCartProduct = async(req,res) =>{
 try {
  const currentUser = req.userId;
  const addToCartProductId = req?.body._id;    
  const qty = req.body.quantity;    

  const updateProduct = await cartProductModel.updateOne({_id:addToCartProductId},{
   ...(qty && { quantity : qty })
  })
  // what these above expression means is if qty is available then only update the quantity field

  res.json({
    message:"Product Updated",
    data:updateProduct,
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
export default updateAddToCartProduct;