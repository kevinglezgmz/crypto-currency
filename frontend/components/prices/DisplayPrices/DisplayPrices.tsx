import Link from 'next/link'
import { useRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import styles from './DisplayPrices.module.scss'

type coinValue = {
  circulating_supply: string
  currency: string
  high: string
  high_timestamp: string
  id: string
  logo_url: string
  market_cap: string
  name: string
  price: string
  price_date: string
  price_timestamp: string
  rank: string
  symbol: string
  '1d': {
    market_cap_change: string
    market_cap_change_pct: string
    price_change: string
    price_change_pct: string
    volume: string
    volume_change: string
    volume_change_pct: string
  }
}

export default function DisplayPrices({ coinData }: { coinData: AxiosResponse<any> | undefined }) {
  const { query } = useRouter()
  const coins = new Set<string>((query.coins as string).split(','))
  coins.forEach((id) => {
    let found = false
    if (id === '') found = true
    coinData!.data.forEach((val: { id: string }) => {
      if (val.id === id) found = true
    })
    if (!found) coinData!.data.push({ id: id, name: id })
  })

  return (
    <>
      <div className={styles.coinsWrapper}>
        {coinData!.data.map((value: coinValue) => {
          return (
            <div key={value.id}>
              <div>
                <img src={value.logo_url} alt={'No img'} />
                <h3>
                  {value.name} ({value.id})
                </h3>
              </div>
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

      <Link href="/">
        <div className={styles.backBtn}>
          <div className={styles.backBtnTriangle}>
            <a></a>
          </div>
          <div className={styles.backBtnBar}></div>
        </div>
      </Link>
    </>
  )
}
