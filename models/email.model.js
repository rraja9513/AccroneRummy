const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const emailSchema=new Schema(
    {
        user:{
            type:String
        },
        usetemplate:{
            type:String
        },
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
const Email=mongoose.model('Email',emailSchema);
module.exports=Email;