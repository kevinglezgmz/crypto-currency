import React from 'react'
import styles from './CurrencySelector.module.scss'
import Link from 'next/link'
import CoinHolder from '../CoinHolder/CoinHolder'
import FilterSearchBar from '../FilterSearchBar/FilterSearchBar'

type PropsType = {
  props: {
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
}

export default function CurrencySelector({ props }: PropsType) {
  const [state, setState] = React.useState(false)
  const [query, setQuery] = React.useState({ query: '' })
  const { coinsData, setCoinsData } = props
  const [coinSuggestions, setSuggestions] = React.useState<{ coin: string; checked: boolean }[]>([])

  const showBox = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setState(!state)
  }

  return (
    <div>
      <div className={styles.multiselect}>
        <div className={styles.selectBox}>
          <div className={styles.buttonWrapper}>
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={showBox}>
              {!state ? 'Show coins' : 'Hide coins'}
            </button>
          </div>
          <div className={styles.buttonWrapper}>
            <Link href={`/prices?coins=${query.query}`}>
              <a className="btn btn-primary btn-lg btn-block multiselect">Check prices</a>
            </Link>
          </div>
        </div>
        <div className={styles.coinsAndFilter}>
          <CoinHolder
            query={query}
            setQuery={setQuery}
            state={state}
            coinSuggestions={coinSuggestions}
            coinsData={coinsData}
            setCoinsData={setCoinsData}
          />
          <FilterSearchBar coinsData={coinsData} state={state} coinSuggestions={coinSuggestions} setSuggestions={setSuggestions} />
        </div>
      </div>
    </div>
  )
}
