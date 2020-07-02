import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import DisplayPrices from '../DisplayPrices/DisplayPrices'

export default function PriceFetcher() {
  const { query } = useRouter()
  const url = `https://sheltered-wave-13195.herokuapp.com/api/price?ids=${query.coins}&curr=USD`
  const { data, error } = useSWR(url, axios, { refreshInterval: 1000, onErrorRetry: () => console.log('Error') })

  if (error) {
    return <div>Ups! Something went wrong</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return <DisplayPrices coinData={data} />
}
