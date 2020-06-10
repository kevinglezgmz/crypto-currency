import React from 'react'
import CurrencySelector from './CurrencySelector'
import axios from 'axios'
import styles from './Layout.module.scss'

export const Layout: React.FC = ({ children }) => {
  const [coinsData, setCoinsData] = React.useState<{ coin: string; checked: boolean }[]>([])

  React.useEffect(() => {
    async function fetchData() {
      console.log('fetching...')
      const res = await axios.get('http://localhost:5001/api/currencies')
      console.log('fetched')
      setCoinsData(
        res.data.map((val: { id: string }) => {
          return { coin: val.id, checked: false }
        }),
      )
    }
    if (coinsData.length === 0) fetchData()
  })

  return (
    <div className={styles.container}>
      <a id={'top'}></a>
      <header id="header" className={styles.header}>
        <h1>Easy crypto currency price checker</h1>
      </header>
      <main>{children}</main>
      <div className={styles.selectWrapper}>
        <CurrencySelector props={{ coinsData, setCoinsData }} />
      </div>
      <a href="#top">
        <div className={styles.backToTop}>
          <div className={styles.backTopTriangle}></div>
          <div className={styles.backTopRectangle}></div>
        </div>
      </a>
    </div>
  )
}
