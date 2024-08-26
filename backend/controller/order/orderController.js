import orderModel from "../../models/orderProductModel.js";

const orderController = async (request, response) => {
  try {
    const currentUser = request.userId;
    // ek particular user ke regarding saare order fetch krenge
    const orderList = await orderModel
      .find({ userId: currentUser })
      .sort({ createdAt: -1 });
    response.json({
      data: orderList,
      message: "Order list of the user",
      success: true,
      error: false,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default orderController;
