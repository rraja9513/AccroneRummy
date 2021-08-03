const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const adminSchema=new Schema(
    {
        email:{
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true
        },
        profilepicture:{
            type:String
        },
        role:{
            type:String
        },
        username:{
            type:String
        },
        address:{
            type:String
        },
        dateofbirth:{
            type:String
        },
        phonenumber:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
adminSchema.plugin(passportLocalMongoose,{usernameField: 'email'});
const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;