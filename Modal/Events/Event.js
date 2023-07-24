import mongoose from "mongoose";
const schema = mongoose.Schema

const EventSchema = new schema({
    eventCode : {
        type : Number,
        required : [true, 'Event Code is Required'],
        unique : [ true,'Event  Code must be Unique this one is used']
    },
    name : {
        type : String,
        required : [true, 'Event Name is Required']
    },
    details : {
        type : String,
        required : [true,'Event paragraph is Required']
    },
    price : {
        type : Number,
        required : [true, 'Event price is Required']
    },
    color : [],
    avaliableDates : [{
        date : {
            type : String,
        },
        time : {
            type :String
        }
    }],
    availableColors: [{
        color: {
          type: String,
        },
        dateTime: [{
          date: {
            type: String
          },
          time: {
            type: String
          }
        }]
      }],
},{timestamps: true})

const Event = mongoose.model('Event', EventSchema)

export default Event;