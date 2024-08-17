const express = require('express')
const router = express.Router()
const teamCtrl = require('../controllers/teams')


//NEW
router.get('/new', teamCtrl.addNewTeam)
//DESTROY
router.delete('/:id', teamCtrl.destroy)
//UPDATE
router.put('/:id', teamCtrl.update)
//CREATE
router.post('/', teamCtrl.createTeam)

//SHOW
router.get('/:id', teamCtrl.show)


module.exports = router