const express = require('express')
var cors = require('cors')

const PORT = 3001;

const app = express()

app.use(cors())

app.use(express.json())

const taskRouter =  require('./routes/task')

app.use('/task', taskRouter)

app.listen(PORT)
