const Manager = require('./manager')
const Player = require('./player')
const Rating = require('./rating')
const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    manager: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager'},
    teamName: {type: String, unique: true, required: true},
    player: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    rating: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}]
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team