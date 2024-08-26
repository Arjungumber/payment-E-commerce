// we are creating a middleware to take out authtoken from the generated token which will be sent as userDetails to display once the
// user is registered/loggedIn
import jwt from "jsonwebtoken";

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token
    
    // console.log("token",token)
     
    if(!token){
        return res.status(200).json({
            message:"Please Login....",
            error:true,
            success:false
        })
     }

    jwt.verify(token, process.env.SECRET_kEY, function(err, decoded) {
      console.log(err);
      console.log("decoded",decoded);
      if(err){
        console.log("Authentication error",err);
      }
      req.userId = decoded?._id;
      next(); // if the token is valid and verified the control will be passed to userDetilsController for the actual work.
      });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: {},
      error: true,
      success: false,
    });
  }
}

export default authToken;
