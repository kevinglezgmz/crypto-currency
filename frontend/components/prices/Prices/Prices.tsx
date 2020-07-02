import React from 'react'
import { SWRConfig } from 'swr'
import axios from 'axios'
import PriceFetcher from '../PriceFetcher/PriceFetcher'

export default function Prices() {
  return (
    <SWRConfig value={{ fetcher: axios }}>
      <PriceFetcher />
    </SWRConfig>
  )
}
