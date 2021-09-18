const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const sociallogingoogleSchema=new Schema(
    {
        socialloginid:{
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
const Sociallogingoogle=mongoose.model('Sociallogingoogle',sociallogingoogleSchema);
module.exports=Sociallogingoogle;
