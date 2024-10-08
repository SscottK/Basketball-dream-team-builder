require('dotenv').config()
const express =  require('express')
const app = express()
const methodOverrride = require('method-override')
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const session = require('express-session')
const managerRouter = require('./routes/managers')
const teamsRouter = require('./routes/teams')


mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', () => {
    console.log('Connection lost, you have an error')
})

app.use(express.urlencoded({ extended: true}))
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(methodOverrride('_method'))
app.use(
    session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: true
    })
)
app.use('/assets', express.static('public'))

app.get('/', (req, res) => {    
    res.render('index.ejs')
})

app.use('/managers', managerRouter)
app.use('/teams', teamsRouter)


app.listen(3000, () => {
    console.log('app listning on port 3000')
})