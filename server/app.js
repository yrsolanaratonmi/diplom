require('dotenv').config({path:'.env'});
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const apiRoutes = require('./src/modules/routes/routes')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/', apiRoutes)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


mongoose.createConnection(process.env.URI_TODO, {useNewURLParser: true, useUnifiedTopology: true})
mongoose.connect(process.env.URI_AUTH, {useNewURLParser: true, useUnifiedTopology: true})


app.listen(process.env.PORT, () => {
  console.log('app started')
})
