import mongoose from 'mongoose';

// we'r giving the refrence of productId from product model we created
const addToCartSchema = new mongoose.Schema({
  productId:{
    ref:"product",
    type:String
  },
  quantity:Number,
  userId:String,
},{
  timestamps:true
})

const cartProductModel = mongoose.model("cartProduct",addToCartSchema);

export default cartProductModel; 