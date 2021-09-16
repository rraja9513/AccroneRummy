const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const tournamentSchema=new Schema(
    {
        title:{
            type:String
        },
        price:{
            type:String
        },
        startdate:{
            type: String
        },
        starttime:{
            type:String
        },
        registrationstartdate:{
            type:String
        },
        registrationstarttime:{
            type:String
        },
        registrationenddate:{
            type:String
        },
        registrationendtime:{
            type:String
        },
        entryfee:{
            type:String
        },
        numberofplayers:{
            type:String
        },
        description:{
            type:String
        },
        pricedistribution:[
            {
                position:{
                    type:String
                },
                price:{
                    type:String
                },
                pnumberofplayers:{
                    type:String
                }
            }
        ]
    },
    {
        timestamps:true,
    }
);
const Tournament=mongoose.model('Tournament',tournamentSchema);
module.exports=Tournament;