const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please Enter Your Name"],
        maxLength:[30,"Name Cannot be more than 30 chars"],
        minLength:[4,"Name Should be atleast 4 letters"]
    },

    email:{
        type:String,
        require:[true,"Please Enter Your Email"],
        unique:true,
        validator:[validator.isEmail,"Please Enter a Valid Email"]
    },

    password:{
        type:String,
        require:[true,"Enter Password"],
        minLength:[8,"Password Should be atleast 8 letters"],
        select:false
    },

    profilepic:{      
            public_id:{
            type:String,
            required:true
        },
        url:{
            type : String,
            required:true
        }
    
    },

    role:{
        type:String,
        default:"user",
    },


    resetPasswordToken:String,
    resetPasswordExpire:Date,



});

userSchema.pre("save", async function(next) {
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcryptjs.hash(this.password,10);

});


//JWT Token 

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};


//Compare Password
userSchema.methods.comparePassword= async function(inputedPassword){

    return await bcryptjs.compare(inputedPassword,this.password);

}

module.exports = mongoose.model("User",userSchema);