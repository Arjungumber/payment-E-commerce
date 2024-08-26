import productModel from "../../models/productModel.js";

const searchProduct = async(req,res) =>{
 try {
    
    const query = req.query.q;
    const regex = new RegExp(query,'i','g');
    const product = await productModel.find({
        "$or" : [
            {
                productName:regex
            },{
                category:regex
            }
        ]
    })

    res.json({
        data:product,
        success:true,
        error:false,
        message:"Search product list"
    })
 } catch (error) {
    res.json({
        error:true,
        success:false,
        message:error.message|| error
    })
 }
}

export default searchProduct;