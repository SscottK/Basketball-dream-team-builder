const express = require('express')
const router = express.Router()
const managerCtrl = require('../controllers/managers')

//INDEX
router.get('/', managerCtrl.index)
//NEW
router.get('/new', managerCtrl.addNewManager)
//sign in
router.get('/sign-in', managerCtrl.showSignIn)
//DESTROY
router.delete('/:id', managerCtrl.destroy)
//UPDATE
router.put('/:id', managerCtrl.update)
//CREATE
router.post('/', managerCtrl.signUp)
//Sign In Functionality
router.post('/sign-in-manager', managerCtrl.signIn)
//EDIT
router.get('/:id/edit', managerCtrl.edit)
//SHOW
router.get('/:id', managerCtrl.show)


module.exports = router