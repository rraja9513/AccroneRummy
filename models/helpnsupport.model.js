const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const helpnsupportSchema=new Schema(
    {
        subject:{
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
const Helpnsupport=mongoose.model('Helpnsupport',helpnsupportSchema);
module.exports=Helpnsupport;