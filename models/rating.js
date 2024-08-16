const Team = require('./team')
const Manger = require('./manager')
const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    teamName: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    ratedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager'},
    rating: {type: String, required: true},
    ratingReason: {type: String}
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating