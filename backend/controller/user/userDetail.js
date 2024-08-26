import userModel from "../../models/userModel.js";
async function userDetailsController(req, res) {
  try {
    // this is coming from authToken middleware, where we've decoded the token
    const user = await userModel.findById(req?.userId);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "Valid User",
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

export default userDetailsController;
