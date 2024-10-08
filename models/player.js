const Team = require('./team')
const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // position: {type: String, required: true},
    // isStarter: {type: Boolean, required: true},
    // playsFor: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player