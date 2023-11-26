const express = require('express')
var cors = require('cors')

const PORT = 3001;

const app = express()

app.use(cors())

app.use(express.json())

const readingRouter =  require('./routes/reading')

app.use('/reading', readingRouter)

app.listen(PORT)
