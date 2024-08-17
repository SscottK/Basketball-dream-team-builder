const express = require('express')
const router = express.Router()
const playerCtrl = require('../controllers/players')


//NEW
router.get('/new', playerCtrl.addNewPlayer)
//DESTROY
router.delete('/:teamid/players/:id', playerCtrl.destroy)
//CREATE
router.post('/', playerCtrl.createPlayer)



module.exports = router