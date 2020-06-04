import React from 'react'
import styles from './CurrencySelector.module.scss'
import axios from 'axios'
import Link from 'next/link'

type ResponseData = {
  id: string
}

export const CurrencySelector: React.FC = () => {
  const [state, setState] = React.useState(false)
  const [data, setData] = React.useState([])
  const [clickedCoins, setCoins] = React.useState(new Map<string, string>())
  const [query, setQuery] = React.useState('')

  const showBox = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setState(!state)
  }

  const checkBoxClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent> | any) => {
    if (!clickedCoins.get(e.target.id)) clickedCoins.set(e.target.id, e.target.id)
    else clickedCoins.delete(e.target.id)
    let s: string = ''
    clickedCoins.forEach((v, k) => {
      s = s + v + ','
    })
    setQuery(s)
  }

  const renderCoins = () => {
    return data.length > 0 ? (
      <>
        {data.map((element: string) => (
          <label key={element} htmlFor={element}>
            <input onClick={checkBoxClick} type="checkbox" id={element} />
            {element}
          </label>
        ))}
      </>
    ) : (
      <div>Loading...</div>
    )
  }

  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:5001/api/currencies')
      setData(res.data.map((val: ResponseData) => val.id).filter((val: string) => val.length === 3))
    }
    if (data.length === 0) {
      fetchData()
    }
  })

  return (
    <>
      <form>
        <div className={styles.multiselect}>
          <div className={styles.selectBox}>
            <div className={styles.buttonWrapper}>
              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={showBox}>
                Show cryptos
              </button>
            </div>
            <div className={styles.buttonWrapper}>
              <Link href={`/prices?coins=${query}`}>
                <a className="btn btn-primary btn-lg btn-block multiselect">Check prices</a>
              </Link>
            </div>
          </div>

          <div className={styles.checkboxes} style={{ display: state ? 'block' : 'none' }}>
            {renderCoins()}
          </div>
        </div>
      </form>
    </>
  )
}
