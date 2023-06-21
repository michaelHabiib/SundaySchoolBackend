import mongoose from "mongoose";
const schema = mongoose.Schema

const userSchema = new schema(
  {
    code: {
      type: Number,
      required: [true, " User Code is Required"],
    },
    name: {
      type: String,
      required: [true, "User Name is Required"],
    },
    email: {
      type: String,
      required: [true, "User Email Is required"],
    },
    password: {
      type: String,
      required: [true, "Your Password is Required"],
    },
    phone: {
      type: String,
      required: [true, "Your phone Number is Required"],
    },
    year : {
      type: String,
      enum: ['baby Class', 'kg1', 'kg2','prim1'],
      required: [true, "Your study Year is Required"],

    }
  },
  { timestamps: true }
);
export default mongoose.model('User', userSchema)