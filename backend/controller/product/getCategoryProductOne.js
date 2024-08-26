import productModel from "../../models/productModel.js"

const getCategoryProduct = async(req,res) =>{
   try {
    const productCategory = await productModel.distinct("category");
    // it will carry an array of distinct categories. 


    // array to store one product from each category
    const productByCategory = [];

    // iterating each category
    for(const category of productCategory){
     const product = await productModel.findOne({category});
     if(product){
      productByCategory.push(product);
     }
    } 

    res.json({
        message:"category product",
        data:productByCategory,
        success:true,
        error:false
    })


   } catch (error) {
     res.status(400).json({
    message:"error.message" || error,
    error:true,
    success:false
     })
   }
} 

export default getCategoryProduct; 