import productModel from "../../models/productModel.js";
import uploadProductPermission from "../../helper/permission.js";

const updateProductController = async (req, res) => {
  try {
    // this userId will be getting from middleware authToken
    if (!uploadProductPermission(req.userId)) {
      // if it is true means the user is admin otherwise will not proceed
      throw new Error("Permission denied");
    }

    const {_id,...resBody} = req.body;
  
    const updateProduct = await productModel.findByIdAndUpdate(_id,resBody);
    res.json({
        message:"Product Updated Successfully",
        data:updateProduct,
        success:true,
        error:false
    });


  } catch (error) {
    res.json({
      message: error.message || error,
      status: 400,
      error: true,
      success: false,
    });
  }
};
export default updateProductController;