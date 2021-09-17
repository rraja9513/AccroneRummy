const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const mobilesliderSchema=new Schema(
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
const Mobileslider=mongoose.model('Mobileslider',mobilesliderSchema);
module.exports=Mobileslider;