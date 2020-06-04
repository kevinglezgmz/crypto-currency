import React from 'react'

const rawData = ['Hola', 'Amigos', 'como', 'están', 'todos', 'ustedes', 'tontos']

export const SearchBar: React.FC = () => {
  const [state, setState] = React.useState('')
  const [clicked, setClick] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
    setClick(false)
  }

  let suggestions: string[] = []

  const handleSuggestionClick = (val: string) => {
    setState(val)
    setClick(true)
    suggestions = []
  }

  const renderSuggestions = () => {
    if (state.length === 0 || clicked) {
      suggestions = []
    } else {
      const regex = new RegExp(`^${state}`, 'i')
      suggestions = rawData.sort().filter((val) => {
        return regex.test(val)
      })
    }
    return suggestions.length > 0 ? (
      <ul>
        {suggestions.map((element) => (
          <li onClick={() => handleSuggestionClick(element)} key={element}>
            {element}
          </li>
        ))}
      </ul>
    ) : null
  }
  const renderSuggestions2 = () => {
    return rawData.length > 0 ? (
      <>
        {rawData.map((element) => (
          <option value={element} onClick={() => handleSuggestionClick(element)} key={element}>
            {element}
          </option>
        ))}
      </>
    ) : null
  }

  return (
    <>
      <select name="sad" id="sdas" className="form-control" multiple={true}>
        {renderSuggestions2()}
      </select>
      <input
        onChange={handleChange}
        className="form-control"
        autoComplete="off"
        placeholder="Cryptocurrency"
        value={state}
        type="text"
        name="search-bar"
      />

      <button>hello</button>
    </>
  )
}
