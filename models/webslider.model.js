const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const websliderSchema=new Schema(
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
const Webslider=mongoose.model('Webslider',websliderSchema);
module.exports=Webslider;