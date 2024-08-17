const Manager = require('../models/manager')
const bcrypt = require('bcrypt')



const signUp = async (req, res) => {
    try {
        const nameTaken = await Manager.findOne({ name: req.body.name })
        if(nameTaken) return res.send('Manager Name is taken')

        
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword
        await Manager.create(req.body).then(() => res.redirect('/managers/sign-in'))
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const signIn = async (req, res) => {
    try {
        const manager = await Manager.findOne({ name: req.body.name })
        if(!manager) throw new Error('Manager Does Not Exist')

        const validPassword = bcrypt.compareSync(req.body.password, manager.password)
        if(!validPassword) throw new Error('Login Failed')

        req.session.user = {
            name: manager.name,
            _id: manager._id
        }

        res.redirect(`/managers/${req.session.user._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


const index = async (req, res) => {
    try {
        const foundManagers =  await Manager.find({})
        res.render('managers/index.ejs', {
            managers: foundManagers
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const addNewManager = (req, res) => {
    res.render('managers/new.ejs')
}

const showSignIn = (req, res) => {
    res.render('managers/signIn.ejs')
}

const destroy = async (req, res) => {
    try {
        await Manager.findByIdAndDelete(req.params.id).then((manager) => {
            res.redirect('/managers')   
        })
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const update = async (req, res) => {
    try {
        const updatedManager = await Manager.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        
        res.redirect(`/managers/${updatedManager._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}



const edit = async (req, res) => {
    try {
        const foundManager = await Manager.findOne({ _id: req.params.id }).populate('teamName')
        res.render(`managers/edit.ejs`, {
            manager: foundManager
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const show = async (req, res) => {
    try {
        
        const foundManager = await Manager.findOne({ _id: req.params.id }).populate('teamName')
        
        res.render('managers/show.ejs', {
            manager: foundManager
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    index,
    addNewManager,
    destroy,
    update,
    signUp,
    signIn,
    showSignIn,
    edit,
    show,
}