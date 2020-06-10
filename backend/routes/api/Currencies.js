const express = require('express')
const router = express.Router()
const key = require('../../utils/Key')
const axios = require('axios')

// Creating route to get all the coins in the nomics database
router.get('/', async (req, res) => {
  const response = await axios.get(`https://api.nomics.com/v1/currencies?key=${key}&attributes=id,cryptocontrol_coin_id`)
  res.status(200).json(
    response.data.filter((coinData) => {
      return coinData.cryptocontrol_coin_id !== null
    }),
  )
})

module.exports = router
