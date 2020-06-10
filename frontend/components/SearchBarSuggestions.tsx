import React from 'react'

type PropsType = {
  props: {
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
}

export default function SearchBar({ props }: PropsType) {
  const [inputVal, setInputVal] = React.useState('')
  const { coinsData, state, coinSuggestions, setSuggestions } = props

  const getSuggestions = () => {
    let suggestions: { coin: string; checked: boolean }[] = []
    const regex = new RegExp(`^${inputVal}`, 'i')
    suggestions = coinsData.sort().filter((val) => {
      return regex.test(val.coin)
    })
    if (JSON.stringify(coinSuggestions) !== JSON.stringify(suggestions)) setSuggestions(suggestions)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  React.useEffect(() => {
    getSuggestions()
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
