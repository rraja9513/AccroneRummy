const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const emailconfigurationSchema=new Schema(
    {
        senderemail:{
            type:String
        },
        fromname:{
            type:String
        },
        smtphost:{
            type:String
        },
        typeofencryption:{
            type:String
        },
        smtpport:{
            type:String
        },
        smtpauthentication:{
            type:String
        },
        smtpusername:{
            type:String
        },
        smtppassword:{
            type:String
        },
        to:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Emailconfiguration=mongoose.model('Emailconfiguration',emailconfigurationSchema);
module.exports=Emailconfiguration;