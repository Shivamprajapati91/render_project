const productModel = require("../../models/productModel")

const getCategoryProduct = async(req,res)=>{
    try{
        const productCategory= await productModel.distinct("category")

        console.log("Category",productCategory)
        const productBYCategory = []
        for(const category of productCategory){
            const product = await productModel.findOne({category })

            if(product){
                productBYCategory.push(product)
            }
        }

        res.json({
            message: "category product",
            data: productBYCategory,
            success: true,
            error: false
        })

    }catch(err){
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false
      })
    }
}

module.exports=getCategoryProduct