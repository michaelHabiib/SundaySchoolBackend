import mongoose from "mongoose";
const schema = mongoose.Schema

const MAX_SELECTIONS_PER_COLOR = 10;
const NadySchema = new schema({
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
        required : [true, 'isPaid is Required'],
        default : false
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    duration : {
        type: String,
        enum: ['june', 'july', 'august','full'],
        required: [true, "Your Daurtion is Required"],
    }
},{ timestamps: true })


const Nady = mongoose.model('Nady', NadySchema)

export default Nady;