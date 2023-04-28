const router = require('./routes')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use('/', router)

app.listen(8000, () => {
    console.log("Server Started...")
})