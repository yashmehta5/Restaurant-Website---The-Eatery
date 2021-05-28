const mongoose = require("mongoose");
const signInSchema = new mongoose.Schema(
    {
        pSignEmail: {type:String, required:false},
        pSignPassword: {type:String, required:false}
    }
)
const SignIn1 =  new mongoose.model("SignInDetails", signInSchema);
module.exports = SignIn1;