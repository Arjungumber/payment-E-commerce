import bcrypt from "bcryptjs";
import userModel from "../../models/userModel.js";
import jwt from "jsonwebtoken";

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found, try a valid email");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      // if the password filled in by the user and that stored in db are same it will giev true, compare funct return true or false
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite:"None"
      };
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check password");
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      status: 400,
      error: true,
      success: false,
    });
  }
}

export default userSignInController;
