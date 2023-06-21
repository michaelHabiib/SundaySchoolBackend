import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema

const AdminSchema = new schema({
    name : {
        type : String,
        required : [true, 'admin Name is required']
    },
    email : {
        type : String,
        required : [true, 'admin Name is required']
    },
    password : {
        type : String,
        required : [true, 'admin Name is required']
    },
    isAdmin : {
        type : Boolean,
        default : true,
        required : [true, 'admin Name is required']
    },
    manger : {
        type : Boolean,
        default : false,
        required : [true, 'admin Name is required']
    }
})
export default mongoose.model('Admin', AdminSchema)