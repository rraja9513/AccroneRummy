const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const paymentcashfreeSchema=new Schema(
    {
        clientid:{
            type:String
        },
        clientsecretkey:{
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
const Paymentcashfree=mongoose.model('Paymentcashfree',paymentcashfreeSchema);
module.exports=Paymentcashfree;