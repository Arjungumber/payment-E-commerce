import stripe from "../../config/stripe.js";
import userModel from "../../models/userModel.js";

const paymentController = async(request, response) => {
  try {
    const { cartItems } = request.body;
   const user = await userModel.findOne({ _id: request.userId });
  
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection:"auto",
      shipping_options: [
        {
          shipping_rate: "shr_1PqrueRpKBKkVTvWFWr24RVB",
        },
      ],
      customer_email: user.email,
      metadata:{
        userId : request.userId
      },
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: {
                productd: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice 
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url : `${process.env.FRONTEND_URL}/success`,
      cancel_url : `${process.env.FRONTEND_URL}/cancel`
    };
    const session = await stripe.checkout.sessions.create(params);
    response.status(303).json(session);
  } catch (error) {
    response.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export default paymentController;
