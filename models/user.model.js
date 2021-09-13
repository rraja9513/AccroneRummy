const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema(
    {
        fullname:{
            type:String
        },
        phonenumber:{
            type:String
        },
        email:{
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true
        },
        username:{
            type:String
        },
        adharnumber:{
            type:String
        },
        pannumber:{
            type:String
        },
        drivinglicencenumber:{
            type:String
        },
        passportnumber:{
            type:String
        },
        adhardocument:{
            type:String
        },
        pandocument:{
            type:String
        },
        drivinglicencedocument:{
            type:String
        },
        passportdocument:{
            type:String
        },
    },
    {
        timestamps:true,
    }
);
userSchema.plugin(passportLocalMongoose,{usernameField: 'email'});
const User=mongoose.model('User',userSchema);
module.exports=User;