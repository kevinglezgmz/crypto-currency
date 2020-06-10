import React from 'react'
import styles from './CurrencySelector.module.scss'

type PropsType = {
  query: { query: string }
  setQuery: React.Dispatch<
    React.SetStateAction<{
      query: string
    }>
  >
  state: boolean
  coinSuggestions: { coin: string; checked: boolean }[]
  coinsData: { coin: string; checked: boolean }[]
  setCoinsData: React.Dispatch<
    React.SetStateAction<
      {
        coin: string
        checked: boolean
      }[]
    >
  >
}

const CoinHolder: React.FC<PropsType> = (props) => {
  const { query, setQuery, state, coinSuggestions, coinsData, setCoinsData } = props

  const checkBoxClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    let clickedCoins: { [key: string]: string } = {}
    query.query.split(',').map((coinId) => {
      if (coinId !== '') clickedCoins[coinId] = coinId
    })
    const id: string = (e.target as any).id
    const newObj: { [key: string]: string } = {}
    newObj[id] = id
    if (!clickedCoins[id]) clickedCoins = { ...clickedCoins, ...newObj }
    else delete clickedCoins[newObj[id]]
    let s: string = ''
    for (let key in clickedCoins) {
      s = s + key + ','
    }
    setCoinsData(
      coinsData.map((val) => {
        if (val.coin === id) return { coin: val.coin, checked: !val.checked }
        else return val
      }),
    )
    setQuery({ query: s })
  }

  const renderCoins = () => {
    return coinSuggestions.length > 0 ? (
      <>
        {coinSuggestions.map((element) => (
          <label key={element.coin} htmlFor={element.coin}>
            <input defaultChecked={element.checked} onClick={checkBoxClick} type="checkbox" id={element.coin} />
            {element.coin}
          </label>
        ))}
      </>
    ) : (
      <div>No coins available</div>
    )
  }

  return (
    <div className={styles.checkboxes} style={{ display: state ? 'block' : 'none' }}>
      {renderCoins()}
    </div>
  )
}

export default CoinHolder
