const Rating = require('./rating')
const Team = require('./team')

const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    password: { type: String, required: true},
    teamName: {type: String, required: true, unique: true},
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
})

const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager