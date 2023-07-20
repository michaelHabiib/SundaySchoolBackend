import express from "express";
import { addNewEvent, DeleteEvent, GetAllEvents, updateEvent, UpdateDate } from "../../Controlles/Events/Event-controlles";
const EventRoutes = express.Router();

EventRoutes.post('/event', addNewEvent) // function to add new event 
EventRoutes.delete(`/:eventCode`,DeleteEvent) // function to delete event 
EventRoutes.post(`/:eventCode`,updateEvent) // function to update event data or datetime or avaliable color
EventRoutes.get(`/`,GetAllEvents) // function to get all events you have 
EventRoutes.post(`/update/date`,UpdateDate)  // function to remove colors, datetime, or avaliable dates
export default EventRoutes;