import mongoose from "mongoose";
const schema = mongoose.Schema

const MAX_SELECTIONS_PER_COLOR = 10;
const NadySchema = new schema({
    code : {
        type : String,
        required : [true, "your Code is Required"]
    },
    name : {
        type : String,
        required : [true, "your name is Required"]
    },
    eventCode : {
        type : String,
        required : [true, "your Event Code is Required"]
    },
    geroupID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Event'
    },
    isPaid : {
        type : Boolean,
        required : [true, 'isPaid is Required'],
        default : false
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
},{ timestamps: true })


const Nady = mongoose.model('Nady', NadySchema)

export default Nady;