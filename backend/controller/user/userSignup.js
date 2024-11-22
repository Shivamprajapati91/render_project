const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')


async function userSignupController(req,res) {
    try{
      const{email,password,name}=req.body
      
      const user= await userModel.findOne({email})
      if(user){
        throw new Error("User already exist")
      }

      if(!email){
        throw new Error("Please provide email")
      }
      if(!password){
        throw new Error("Please provide password")
      } if(!name){
        throw new Error("Please provide name")
      }
       
      const salt = bcrypt.genSaltSync(10)
      const  hashPassword = await bcrypt.hashSync(password,salt)
      

     const payload={
      ...req.body,
      role: "GENERAL",
      password: hashPassword
     }
     if(!hashPassword){
      throw new Error("Something went wrong")
     }
   

      const userData = new userModel(payload)
      const saveUser = await userData.save()
      res.status(201).json({
        data: saveUser,
        success: true,
        error: false,
        message: "User cerated successfully"
      })


    }catch(err){
      
          res.json({
            message: err.message || err ,
            error: true,
            success: false,
          })
    }
    
}
module.exports= userSignupController