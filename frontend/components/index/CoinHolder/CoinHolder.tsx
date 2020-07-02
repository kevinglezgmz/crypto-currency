import React from 'react'
import styles from './CoinHolder.module.scss'

type SetQueryType = React.Dispatch<
  React.SetStateAction<{
    query: string
  }>
>

type QueryType = { query: string }

type SetCoinsDataType = React.Dispatch<
  React.SetStateAction<
    {
      coin: string
      checked: boolean
    }[]
  >
>

type CoinsDataType = { coin: string; checked: boolean }[]

type PropsType = {
  query: QueryType
  setQuery: SetQueryType
  state: boolean
  coinSuggestions: { coin: string; checked: boolean }[]
  coinsData: CoinsDataType
  setCoinsData: SetCoinsDataType
}

export function updateQuery(id: string, query: QueryType) {
  let clickedCoins: { [key: string]: string } = {}
  query.query.split(',').map((coinId) => {
    if (coinId !== '') clickedCoins[coinId] = coinId
  })
  const newObj: { [key: string]: string } = { [id]: id }
  if (!clickedCoins[id]) clickedCoins = { ...clickedCoins, ...newObj }
  else delete clickedCoins[newObj[id]]
  let s: string = ''
  for (let key in clickedCoins) {
    s = s + key + ','
  }
  return s
}

export function updateCoinsCheckedValue(id: string, coinsData: CoinsDataType) {
  const updatedCoins = coinsData.map((val) => {
    if (val.coin === id) return { coin: val.coin, checked: !val.checked }
    else return val
  })
  return updatedCoins
}

const CoinHolder: React.FC<PropsType> = (props) => {
  const { query, setQuery, state, coinSuggestions, coinsData, setCoinsData } = props

  const checkBoxClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const updatedQuery = updateQuery((e.target as any).id as string, query)
    setQuery({ query: updatedQuery })
    const updatedCoins = updateCoinsCheckedValue((e.target as any).id as string, coinsData)
    setCoinsData(updatedCoins)
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
