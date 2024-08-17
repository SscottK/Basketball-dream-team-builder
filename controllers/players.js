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



const createPlayer = async (req, res) => {
      try {       
        
        const createdPlayer = await Player(req.body)
        console.log(createdPlayer)
        await createdPlayer.save()
        
        res.redirect(`/`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports = {    
    addNewPlayer,
    destroy,    
    createPlayer,

}