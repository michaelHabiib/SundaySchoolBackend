import mongoose from "mongoose";
const schema = mongoose.Schema


const PriceSchema = new schema({
    planTitle: {
        type: String,
        required: [true, " Your price Title is Required"],
      },
      PlanPrice : {
        type : String,
        required: [true, "your Plan Price is Required"],
      },
      PlanLength : {
        type : String,
        required: [true, "your Plan Length is Required"],
      },
      featuers : {
        type : Array,
        required : [true, 'Your Price Plan Featuers is Required']
      }
})
export default mongoose.model('Price', PriceSchema)