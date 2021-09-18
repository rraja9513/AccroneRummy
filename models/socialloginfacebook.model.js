const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const socialloginfacebookSchema=new Schema(
    {
        socialloginid:{
            type:String
        },
        version:{
            type:String
        },
        status:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Socialloginfacebook=mongoose.model('Socialloginfacebook',socialloginfacebookSchema);
module.exports=Socialloginfacebook;