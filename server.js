const express = require('express')
var cors = require('cors')
const fs = require('fs')
const app = express()
const PORT = 3000
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json({
    type: ['application/json', 'text/plain']
}))
app.use(cors())
const spellcheckRoute = require('./routes/spellCheckRoutes')

app.use('/spellCheck', spellcheckRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port is ${PORT}`)
})