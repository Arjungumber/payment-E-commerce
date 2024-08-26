
import bcrypt from "bcryptjs";
import userModel from "../../models/userModel.js";


async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await userModel.findOne({ "email":email }); // checking the email field as the email filled by user,if it is already stored
    if (user) {
      // if the user with this email exists in db throwing an error
      throw new Error("User already exists");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error("Something is wrong");
    }
    const payload = {
      ...req.body,
      role:"GENERAL",
      password: hashPassword
    };
    const userData = new userModel(payload);
    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      status:400,
      error: true,
      success: false,
    });
  }
}

export default userSignUpController;
