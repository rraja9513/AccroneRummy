const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const smsSchema=new Schema(
    {
        player:{
            type:String
        },
        usetemplate:{
            type:String
        },
        message:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Sms=mongoose.model('Sms',smsSchema);
module.exports=Sms;