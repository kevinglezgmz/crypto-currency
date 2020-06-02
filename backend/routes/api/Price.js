const express = require('express')
const router = express.Router()
const key = require('../../utils/Key')
const axios = require('axios')

// Creating route to get prices for the specified coins
router.get('/', async (req, res) => {
  const coins = req.query.ids
  const curr = req.query.curr
  console.log(req.query)
  const response = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=${coins}&convert=${curr}`)
  res.status(200).json(response.data)
})

module.exports = router
