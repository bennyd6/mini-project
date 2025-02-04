const express = require('express')
const cors=require("cors")
const connectToMongo=require('./db')

const app = express()
const port = 3000
app.use(express.json()) 
app.use(cors()) 

connectToMongo();

app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})