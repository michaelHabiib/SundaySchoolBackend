import mongoose from "mongoose";
const schema = mongoose.Schema

const MAX_SELECTIONS_PER_COLOR = 4;
const FundaySchema = new schema({
    code : {
        type : String,
        required : [true, "your Code is Required"]
    },
    color : {
        type : String,
        required : [true, "please Select an option"],
    },
    isPaid : {
        type : Boolean,
        required : [true, 'isPaid is Required']
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{ timestamps: true })


const Funday = mongoose.model('Funday', FundaySchema)

export default Funday;

