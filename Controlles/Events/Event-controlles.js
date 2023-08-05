import Event from "../../Modal/Events/Event";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId

function generateRandomCode() {
    const max = 9999; // maximum number of possible combinations
    const min = 1000; // minimum number to ensure 4 digits
    const random = Math.floor(Math.random() * (max - min + 1) + min); // generate random number between 1000 and 9999
    return random.toString(); // convert number to string
  }
export const addNewEvent = async (req, res, next) => {
    const {eventCode,name,details,price,colors} = req.body
    let {avaliableDates,availableColors} = req.body
    if(avaliableDates && avaliableDates.length > 0){
        avaliableDates = avaliableDates.map(datee => ({
            date : datee.date,
            time : datee.time
        }))
    }else{ 
        avaliableDates = []
    }
    if(availableColors && availableColors.length > 0){
        availableColors = availableColors.map((colorr) =>({
            color : colorr.color,
            dateTime : colorr.dateTime.map((dateee) =>({
                date :dateee.date,
                time:dateee.time
            }))
        }))
    }else{
        availableColors = []
    }

    const newEvent = new Event({
        eventCode : generateRandomCode(),
        name,
        details,
        price,
        colors,
        avaliableDates,
        availableColors
    })
    try {
        await newEvent.save()
        return res.status(201).json({message : 'Added Sucssuflly'})
    } catch (error) {
        return res.status(400).json({message : "bad Request", error})
    }
}


export const DeleteEvent = async (req, res, next) => {
    let eventCode = req.params.eventCode
    try {
        await Event.findOneAndDelete({eventCode})
        return res.status(201).json({message : 'Deleted Sucssuflly'})
    } catch (error) {
        return res.status(400).json({message : "can't Delete this Event", error})
    }
}

export const updateEvent = async (req, res, next) => {
    const eventCode = req.params.eventCode;
    const modal = req.body;
    try {
        const updateFields = {};
        if (modal.name !== undefined) {
            updateFields.name = modal.name;
        }
        if (modal.details !== undefined) {
            updateFields.details =  modal.details;
        }
        if (modal.price !== undefined) {
            updateFields.price = modal.price;
        }
        if (modal.colors !== undefined) {
            updateFields.colors = modal.colors;
        }
        if (modal.avaliableDates !== undefined) {
            const pushedData = await Event.updateOne({eventCode:eventCode},
                {$set : {avaliableDates : modal.avaliableDates}})
        }
        if (modal.availableColors !== undefined) {
            const pushedData1 = await Event.updateOne({eventCode:eventCode},
                {$set : {availableColors : modal.availableColors}})
        }
        const event = await Event.updateOne(
            {eventCode:eventCode},
            updateFields
        );
        // console.log(event);
        if (!event) {
            return res.status(404).json({message : 'Event not found'});
        }
        return res.status(200).json({message : 'Updated Successfully'});
    } catch (error) {
        return res.status(400).json({message : "Bad Request", error});
    }
};
export const GetAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find()
        return res.status(201).json(events)
    } catch (error) {
        return res.status(400).json({message : 'bad request'})
    }
}
export const UpdateDate = async (req, res, next) => {
    const {eventCode, date, time, avaliableDates, id, availableColors, dateTime} = req.body
    try {
        if (avaliableDates !== undefined) {
            await Event.updateOne({eventCode},
                {$pull : {avaliableDates :{date:date, time:time }}})
        return res.status(200).json({message : 'updated Successfully'})
        }
        
        if (availableColors !== undefined) {
             await Event.updateOne({eventCode},
                {$pull : {availableColors : {_id : id}}})
        return res.status(200).json({message : 'updated Successfully'})
        }
        if (dateTime !== undefined) {
            console.log('ss');
            // const ObjectId = new ObjectId(id)
            console.log(ObjectId.isValid(id));
             await Event.findOneAndUpdate({eventCode},
                {$pull : {"availableColors.$[].dateTime" : {_id : id }}})
        return res.status(200).json({message : 'updated Successfully'})
        }
        return res.status(400).json({message : 'nothing provided to delete'})
    } catch (error) {
        return res.status(400).json({message : 'Bad Request', error})
    }
}

