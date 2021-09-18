const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const smsconfigurationSchema=new Schema(
    {
        senderid:{
            type:String
        },
        authenticationkey:{
            type:String
        },
        mobilenumber:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Smsconfiguration=mongoose.model('Smsconfiguration',smsconfigurationSchema);
module.exports=Smsconfiguration;