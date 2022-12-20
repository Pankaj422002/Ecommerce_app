import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        index: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required:true,
        default: false
    }
});

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

const User = mongoose.model("User",userSchema);
export default User;
