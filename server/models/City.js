const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    updatedAt: Date,
    temperature: Number,
    condition: String,
    conditionPic: String,
    isSaved: Boolean,
    newFormatDate: String
})

const City = mongoose.model("City", citySchema)
module.exports = City