import React from 'react'

type PropsType = {
  coinsData: { coin: string; checked: boolean }[]
  state: boolean
  coinSuggestions: { coin: string; checked: boolean }[]
  setSuggestions: React.Dispatch<
    React.SetStateAction<
      {
        coin: string
        checked: boolean
      }[]
    >
  >
}

export function getSuggestions(inputVal: string, coinsData: { coin: string; checked: boolean }[]) {
  let suggestions: { coin: string; checked: boolean }[] = []
  const regex = new RegExp(`^${inputVal}`, 'i')
  suggestions = coinsData.sort().filter((val) => {
    return regex.test(val.coin)
  })
  return suggestions
}

const SearchBar: React.FC<PropsType> = (props) => {
  const [inputVal, setInputVal] = React.useState('')
  const { coinsData, state, coinSuggestions, setSuggestions } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  React.useEffect(() => {
    const suggestions = getSuggestions(inputVal, coinsData)
    if (JSON.stringify(coinSuggestions) !== JSON.stringify(suggestions)) setSuggestions(suggestions)
  })

  return (
    <div style={{ display: state ? 'block' : 'none' }}>
      <input
        onChange={handleChange}
        className="form-control"
        autoComplete="off"
        placeholder="Filter coins..."
        value={inputVal}
        type="text"
        name="search-bar"
      />
    </div>
  )
}

export default SearchBar
