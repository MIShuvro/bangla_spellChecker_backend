const Router = require('express').Router()

const {
    spellCheck,
    addToDictonary
} = require('../controllers/spellCheckController')

Router.post('/bangla', spellCheck)
Router.post('/bangla/add', addToDictonary)

module.exports = Router