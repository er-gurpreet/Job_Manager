const mongoose = require("mongoose");
const db = require("./db")

const patientModel = new mongoose.Schema({
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      jobTitle: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        min: 0
      },
      experience: {
        type: Number,
        min: 0
      },
      status: {
        type: String,
        enum: ['Active', 'Unactive'],
        default: 'Unactive'
      },
      taskHistory: {
        type: String
      } 
});
const patient = mongoose.model("patient", patientModel);
module.exports = patient;