
async function userLogout(req,res){
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite:"None"
          };
        res.clearCookie("token",tokenOption);  // deleting the token from cookies        
        res.json({
         message:"Logged Out Successfully",
         error:false,
         success:true,
         data:[]
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            status:400,
            error: true,
            success: false,
        });
    }
}

export default userLogout;