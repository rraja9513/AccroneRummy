const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const logouploadSchema=new Schema(
    {
        image:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Logoupload=mongoose.model('Logoupload',logouploadSchema);
module.exports=Logoupload;