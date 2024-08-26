import cartProductModel from "../../models/cartProduct.js";

const countCartProduct = async (req, res) => {
  try {
    const userId = req?.userId;

    // it will give the count of documents added for a particular user

    const count = await cartProductModel.countDocuments({
      userId: userId,
    });
    console.log("count",count);
    res.json({
      data : {
        count: count
      },
      message: "Ok,",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default countCartProduct;
