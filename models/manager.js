const Rating = require('./rating')
const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    teamName: {type: String, required: true, unique: true},
    ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
})

const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager