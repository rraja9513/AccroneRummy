const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const couponSchema=new Schema(
    {
        coupontitle:{
            type:String
        },
        couponcode:{
            type:String
        },
        validfromdate:{
            type: String
        },
        validtodate:{
            type:String
        },
        bonustype:{
            type:String
        },
        bonusvalue:{
            type:String
        },
        maxprice:{
            type:String
        }
    },
    {
        timestamps:true,
    }
);
const Coupon=mongoose.model('Coupon',couponSchema);
module.exports=Coupon;