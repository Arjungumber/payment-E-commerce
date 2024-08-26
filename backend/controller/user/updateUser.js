import userModel from "../../models/userModel.js";

async function updateUser(req, res) {
  try {
    // this is the id of the person who's is updating any user
    const sessionId = req.userId;
    
    // this is that particular user that's getting updated by the admin.
    const {userId, email, name, role} = req.body;
     
    // what user wants to change can be changed
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    }

    const user = await userModel.findById(sessionId);
    
    // console.log("user role",role);
    // console.log("Payload",payload);
   
    const updatedUser = await userModel.findByIdAndUpdate(userId,payload);
    //  console.log("Updated User", updatedUser);

    if (updatedUser) {
      res.json({
        data:updatedUser,
        message: "User Updated Successfully",
        success: true,
        error: false,
      });
    }
    console.log("Updated User",updatedUser);
  } catch (error) {
    res.json({
      message: error.message || error,
      status:400,
      error: true,
      success: false,
    });
  }
}

export default updateUser;