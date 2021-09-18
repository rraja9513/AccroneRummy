const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const referalcommissionSchema=new Schema(
    {
        selectuser:{
            type:String
        },
        onlostamountcommission:{
            type:String
        },
        onwonamountcommission:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Referalcommission=mongoose.model('Referalcommission',referalcommissionSchema);
module.exports=Referalcommission;