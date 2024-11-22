const express = require('express')

const router = express.Router()

const userSignupController = require('../controller/user/userSignup')
const userSigninController = require('../controller/user/userSignin')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProductController')
const updateProductController = require('../controller/product/updateProduct')

const getCategoryWiseProduct = require('../controller/product/getCatogeryWiseProduct')
const getCategoryProduct = require('../controller/product/getCatogeryProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const  addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')
const orderController = require('../controller/order/orderController')



router.post("/signup",userSignupController)
router.post("/signin",userSigninController)
router.get("/user-details",authToken,userDetailsController)
router.get("/user-logout",userLogout)
router.post("/update-user",authToken,updateUser)


router.get("/all-users",authToken,allUsers)

router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


router.post('/checkout',authToken,paymentController)
router.post("/webhook",webhooks)
router.get("/order-list",authToken,orderController)



module.exports = router