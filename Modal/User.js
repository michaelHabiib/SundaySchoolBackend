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
      enum: ['bc', 'kg1', 'kg2','prim1'],
      required: [true, "Your study Year is Required"],
    },
    bulidingNumber : {
      type: Number,
      required :[true, 'your Building Number is Required']
    },
    street : {
      type : String,
      required : [true, 'Your Street Name is Required']
    },
    Area :{
      type : String,
      required : [true,' Your Area is Required']
    },
    BirthdayDate : {
      type: String,
      required : [true, 'Your Birthday Date is Required']
    },
    funday : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Funday'
    }],
    Attendance : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Att'
    }],
    nady : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Nady'
    }]
  },
  { timestamps: true }
);
export default mongoose.model('User', userSchema)