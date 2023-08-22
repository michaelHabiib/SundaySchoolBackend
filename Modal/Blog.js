import mongoose from "mongoose";
const schema = mongoose.Schema


const BlogSchema = new schema({
    title: {
        type: String,
        required: [true, " Your Blog Title is Required"],
      },
      sub_Title : {
        type : String,
      },
      Discrption : {
        type : String,
        required: [true, "your Blog Discrption is Required"],
      },
      category : {
        type : String,
        required : [true, 'Blog Category is Required']
      }
})
export default mongoose.model('Blog', BlogSchema)