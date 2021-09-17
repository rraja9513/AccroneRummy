const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const baseurlSchema=new Schema(
    {
        url:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Baseurl=mongoose.model('Baseurl',baseurlSchema);
module.exports=Baseurl;