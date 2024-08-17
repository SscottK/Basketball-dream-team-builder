const Team = require('../models/team')
const Player = require('../models/player')
const Manager = require('../models/manager')




const addNewPlayer = (req, res) => {
    res.render('players/new.ejs')
}

const destroy = async (req, res) => {
    try {
         
        await Player.findByIdAndDelete(req.params.id).then((player) => {
            res.redirect('/managers')   
        })
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const update = async (req, res) => {
    try {
        const updatedPlayer = await Player.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.redirect(`/Players/${updatedPlayer._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createPlayer = async (req, res) => {
    try {
        
        
        const foundManager = await Manager.findOne({ _id: req.session.user._id})
        
        const createdPlayer = await Player.create(req.body)
        createdPlayer.playsFor = foundManager.teamId
        await foundManager.save()
        res.redirect(`/teams/${createdPlayer.playsFor}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const edit = async (req, res) => {
    try {
        const foundPlayer = await Player.findOne({ _id: req.params.id })
        res.render('teams/edit.ejs', {
            player: foundPlayer
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const show = async (req, res) => {
    try {
        const foundPlayer = await Player.findOne({ _id: req.params.id })
        res.render('teams/show.ejs', {
            player: foundPlayer
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {    
    addNewPlayer,
    destroy,
    update,
    createPlayer,
    edit,
    show,
}