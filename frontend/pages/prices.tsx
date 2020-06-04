import React from 'react'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import axios, { AxiosResponse } from 'axios'
import styles from '../components/prices.module.scss'

const Prices = () => {
  return (
    <SWRConfig value={{ fetcher: axios }}>
      <PriceFetcher />
    </SWRConfig>
  )
}

const PriceFetcher = () => {
  const { query } = useRouter()
  const url = `http://localhost:5001/api/price?ids=${query.coins}&curr=USD`
  const { data, error } = useSWR(url, axios, { refreshInterval: 1000, onErrorRetry: () => console.log('Error') })

  if (error) {
    return <div>Ups! Something went wrong</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return <DisplayPrices coinData={data} />
}

const DisplayPrices = ({ coinData }: { coinData: AxiosResponse<any> | undefined }) => {
  //{JSON.stringify(coinData!.data, null, 2)}
  const { query } = useRouter()
  const coins = new Set<string>(query.coins.split(','))

  coins.forEach((id) => {
    let found = false
    if (id === '') found = true
    coinData!.data.forEach((val) => {
      if (val.id === id) found = true
    })
    if (!found) coinData!.data.push({ id: id, name: id })
  })

  return (
    <div className={styles.coinsWrapper}>
      {coinData!.data.map((value: any) => {
        return (
          <div key={value.id}>
            <h3>
              {value.name} ({value.id})
            </h3>
            {value['1d'] ? (
              <>
                <span style={{ color: +value['1d'].price_change_pct >= 0 ? '#2fbd71' : '#c0392b' }}>
                  <b>${(+value.price).toFixed(4)}</b>
                </span>
                <span style={{ color: +value['1d'].price_change_pct >= 0 ? '#2fbd71' : '#c0392b' }}>
                  <b>
                    {+value['1d'].price_change_pct >= 0 ? '+' : ''}
                    {(+value['1d'].price_change_pct * 100).toFixed(2)}%
                  </b>
                </span>{' '}
              </>
            ) : (
              <>
                <span>{value.price ? <b>${(+value.price).toFixed(4)}</b> : <b>No recent price information</b>}</span>
                <span>
                  <b>No recent change information :(</b>
                </span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )

  // return (
  //   <div className={styles.coinsWrapper}>
  //     {coinData!.data.map((value: any) => {
  //       return (
  //         <div key={value.id}>
  //           <h3>
  //             {value.name} ({value.id})
  //           </h3>
  //           {value['1d'] ? (
  //             <>
  //               <span style={{ color: +value['1d'].price_change_pct >= 0 ? '#2fbd71' : '#c0392b' }}>
  //                 <b>${(+value.price).toFixed(4)}</b>
  //               </span>
  //               <span style={{ color: +value['1d'].price_change_pct >= 0 ? '#2fbd71' : '#c0392b' }}>
  //                 <b>
  //                   {+value['1d'].price_change_pct >= 0 ? '+' : ''}
  //                   {(+value['1d'].price_change_pct * 100).toFixed(2)}%
  //                 </b>
  //               </span>{' '}
  //             </>
  //           ) : (
  //             <>
  //               <span>
  //                 <b>${(+value.price).toFixed(4)}</b>
  //               </span>
  //               <span>
  //                 <b>No recent change information :(</b>
  //               </span>
  //             </>
  //           )}
  //         </div>
  //       )
  //     })}
  //   </div>
  // )
}

export default Prices
