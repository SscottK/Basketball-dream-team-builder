const express = require('express')
const router = express.Router()
const managerCtrl = require('../controllers/managers')

//INDEX
router.get('/', managerCtrl.index)
//NEW
router.get('/new', managerCtrl.addNewManager)
//DESTROY
router.delete('/:id', managerCtrl.destroy)
//UPDATE
router.put('/:id', managerCtrl.update)
//CREATE
router.post('/', managerCtrl.createManager)
//EDIT
router.get('/:id/edit', managerCtrl.edit)
//SHOW
router.get('/:id', managerCtrl.show)


module.exports = router