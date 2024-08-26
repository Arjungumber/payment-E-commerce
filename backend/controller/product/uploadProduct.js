import uploadProductPermission from "../../helper/permission.js";

import productModel from "../../models/productModel.js";

async function uploadProductController(req, res) {
  try {
    // this userId will be getting from middleware authToken
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      // if it is true means the user is admin otherwise will not proceed
      throw new Error("Permission denied");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(200).json({
      message: "Product Uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      status: 400,
      error: true,
      success: false,
    });
  }
}

export default uploadProductController;
