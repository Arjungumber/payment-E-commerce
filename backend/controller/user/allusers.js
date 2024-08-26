import userModel from "../../models/userModel.js";
async function allUsers(req,res){
    try {
     const allUsers = await userModel.find();
     console.log("All Users", allUsers);
     res.json({
        message:"All user details",
        data:allUsers,
        success:true,
        error:false
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

export default allUsers;