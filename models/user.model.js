const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema(
    {
        email:{
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true
        },
        name:{
            type:String
        },
        place:{
            type:String
        },
        phonenumber:{
            type:String
        },
        adharnumber:{
            type:String
        },
        pannumber:{
            type:String
        },
        drivinglicence:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
userSchema.plugin(passportLocalMongoose,{usernameField: 'email'});
const User=mongoose.model('User',userSchema);
module.exports=User;