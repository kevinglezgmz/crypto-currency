import React from 'react'
import CurrencySelector from '../CurrencySelector/CurrencySelector'
import axios from 'axios'
import styles from './Layout.module.scss'

export const fetchData = async () => {
  const res = await axios.get('https://sheltered-wave-13195.herokuapp.com/api/currencies')
  return res.data.map((val: { id: string }) => {
    return { coin: val.id, checked: false }
  })
}

export const Layout: React.FC = ({ children }) => {
  const [coinsData, setCoinsData] = React.useState<{ coin: string; checked: boolean }[]>([])

  React.useEffect(() => {
    const getData = async () => {
      setCoinsData(await fetchData())
    }
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <header id="header" className={styles.header}>
        <h1>Easy crypto currency price checker</h1>
      </header>
      <main>{children}</main>
      <div className={styles.selectWrapper}>
        <CurrencySelector props={{ coinsData, setCoinsData }} />
      </div>
    </div>
  )
}
