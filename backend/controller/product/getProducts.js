import productModel from "../../models/productModel.js";

const getProductController = async(req,res) =>{
   try {
    const allProducts = await productModel.find().sort({createdAt:-1})
    // sorting in increasing order based on their created date.
    res.json({
        message:"All Products",
        success:true,
        error:false,
        data:allProducts
    })
   } catch (error) {
    res.json({
        message: error.message || error,
        status:400,
        error: true,
        success: false,
      });
   }
}

export default getProductController;