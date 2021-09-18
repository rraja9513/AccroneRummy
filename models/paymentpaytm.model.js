const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const paymentpaytmSchema=new Schema(
    {
        merchantid:{
            type:String
        },
        merchantkey:{
            type:String
        },
        mode:{
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
const Paymentpaytm=mongoose.model('Paymentpaytm',paymentpaytmSchema);
module.exports=Paymentpaytm;