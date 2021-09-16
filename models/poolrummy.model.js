const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const poolrummySchema=new Schema(
    {
        game:{
            type:String
        },
        gametype:{
            type:String
        },
        tablename:{
            type: String
        },
        tablenumber:{
            type:String
        },
        bet:{
            type:String
        },
        valuepoints:{
            type:String
        },
        sittingcapacity:{
            type:String
        },
        tablestatus:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Poolrummy=mongoose.model('Poolrummy',poolrummySchema);
module.exports=Poolrummy;