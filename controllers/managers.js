const Manager = require('../models/manager')


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

const addNewManager = async (req, res) => {
    res.render('managers/new.ejs')
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
        const updatedManager = await Manager.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
        res.redirect(`/managers/${updatedManager._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createManager = async (req, res) => {
    try {
        const createdManager = await Manager.create(req.body)
        await createdManager.save()
        res.redirect(`/managers/${createdManager._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const edit = async (req, res) => {
    try {
        const foundManager = await Manager.findOne({ _id: req.params.id })
        res.render('managers/edit.ejs')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const show = async (req, res) => {
    try {
        const foundManager = await Manager.findOne({ _id: req.params.id })
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
    createManager,
    edit,
    show,
}