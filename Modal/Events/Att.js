import mongoose from "mongoose";
const schema = mongoose.Schema


const AttSchema = new schema({
    code: {
        type: Number,
        required: [true, " User Code is Required"],
      },
      user : {
        type : mongoose.Types.ObjectId,
         ref : "User"
      },
      AttDate : {
        type : String,
        required: [true, " Att Day is Required"],
        // default : new Date()
      }
})
export default mongoose.model('Att', AttSchema)