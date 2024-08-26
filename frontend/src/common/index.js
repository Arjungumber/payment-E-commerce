const backendDomain = process.env.REACT_APP_BACKEND_URL
const SummaryApi = {
  signUP: {
    url: `${backendDomain}/api/signup`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "POST",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "GET",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "GET",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "GET",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "POST",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "POST",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "GET",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "POST",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "GET",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "POST",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "POST",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "POST",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "GET",
  },
  addToCartProductView: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "GET",
  },
  updateCartProduct:{
    url: `${backendDomain}/api/update-cart-product`,
    method: "POST",
  },
  deleteCartProduct:{
    url: `${backendDomain}/api/delete-cart-product`,
    method: "POST",
  },
  searchProduct:{
    url: `${backendDomain}/api/search`,
    method: "GET",
  },
  filterProduct:{
  url:`${backendDomain}/api/filter-product`,
  method:"POST"
  },
  payment:{
    url:`${backendDomain}/api/checkout`,
    method:"POST"
  },
  getOrder:{
    url:`${backendDomain}/api/orders`,
    method:"GET"
  },
  allOrder:{
    url:`${backendDomain}/api/all-orders`,
    method:"GET"
  },

};

export default SummaryApi;
