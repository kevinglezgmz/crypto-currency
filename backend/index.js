const express = require('express')
const path = require('path')
const app = express()

// Currencies api route
app.use('/api/currencies', require('./routes/api/Currencies'))

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
