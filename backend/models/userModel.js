import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:String,
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:String,
  profileImage:String,
  role:String
},{ // this timestamp will be created an updtaed by default every time this collection is updated
    timestamps:true
})

const userModel = mongoose.model("user",userSchema);

export default userModel;