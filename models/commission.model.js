const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const commissionSchema=new Schema(
    {
        commission:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Commission=mongoose.model('Commission',commissionSchema);
module.exports=Commission;