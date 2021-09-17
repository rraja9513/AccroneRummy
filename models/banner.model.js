const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bannerSchema=new Schema(
    {
        title:{
            type:String
        },
        image:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Banner=mongoose.model('Banner',bannerSchema);
module.exports=Banner;