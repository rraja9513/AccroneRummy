const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const promotionSchema=new Schema(
    {
        title:{
            type:String
        },
        shortdescription:{
            type:String
        },
        description:{
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
const Promotion=mongoose.model('Promotion',promotionSchema);
module.exports=Promotion;