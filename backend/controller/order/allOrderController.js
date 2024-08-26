import orderModel from "../../models/orderProductModel.js"
import userModel from "../../models/userModel.js"

const allOrderController = async(req,res) =>{
    const userId = req.userId;

    const user = await userModel.findById(userId);
    if(user.role !== "ADMIN"){
     return res.status(500).json({
      message:"Unauthorized",
     })
    }
    
    const allOrders = await orderModel.find({userId : userId}).sort({createdAt:-1});
    return res.status(200).json({
        data:allOrders,
        success:true,
    })
}

export default allOrderController;