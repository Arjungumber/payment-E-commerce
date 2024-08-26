import cartProductModel from "../../models/cartProduct.js";

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body
    const currentUser = req.userId
    // again coming from middleware authToken

    // checking if the product is available already
    const isProductAvailable = await cartProductModel.findOne({ productId, userId:currentUser })

    if (isProductAvailable) {
      return res.json({
        message: "Already exists in the cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    }

    const newAddToCart = new cartProductModel(payload);
   
    const saveProduct = await newAddToCart.save();

    res.json({
        data:saveProduct,
        message:"Product added in the cart",
        success:true,
        error:false
    })

  } catch (error) {
    res.json({
      message: error.message || error,
      status: 400,
      error: true,
      success: false,
    });
  }
};

export default addToCartController;