const express = require('express')
const router = express.Router()
const playerCtrl = require('../controllers/players')


//NEW
router.get('/new', playerCtrl.addNewPlayer)
//DESTROY
router.delete('/:id', playerCtrl.destroy)
//UPDATE
router.put('/:id', playerCtrl.update)
//CREATE
router.post('/', playerCtrl.createPlayer)
//EDIT
router.get('/:id/edit', playerCtrl.edit)
//SHOW
router.get('/:id', playerCtrl.show)


module.exports = router