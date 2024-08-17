const Team = require('../models/team')
const Player = require('../models/player')




const addNewPlayer = async (req, res) => {
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
        const updatedTeam = await Team.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.redirect(`/teams/${updatedTeam._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createPlayer = async (req, res) => {
    try {
        
        req.body.manager = req.session.user._id
        const foundManager = await Manager.findOne({ _id: req.session.user._id})
        
        const createdTeam = await Team.create(req.body)
        foundManager.teamId = createdTeam._id
        await foundManager.save()
        res.redirect(`/teams/${createdTeam._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const edit = async (req, res) => {
    try {
        const foundTeam = await Team.findOne({ _id: req.params.id })
        res.render('teams/edit.ejs', {
            team: foundTeam
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const show = async (req, res) => {
    try {
        const foundTeam = await Team.findOne({ _id: req.params.id }).populate('players')
        res.render('teams/show.ejs', {
            team: foundTeam
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