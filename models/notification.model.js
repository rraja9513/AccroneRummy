const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const notificationSchema=new Schema(
    {
        playertype:{
            type:String
        },
        title:{
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
const Notification=mongoose.model('Notification',notificationSchema);
module.exports=Notification;