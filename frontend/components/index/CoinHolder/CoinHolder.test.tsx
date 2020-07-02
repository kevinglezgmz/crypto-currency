//import React from 'react'
import CoinHolder, { updateQuery, updateCoinsCheckedValue } from './CoinHolder'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('#CurrencySelector', () => {
  let coinsData: { coin: string; checked: boolean }[] = [
    { coin: 'BTC', checked: false },
    { coin: 'ETH', checked: false },
    { coin: 'XRP', checked: false },
  ]
  const setCoinsData = jest.fn()
  const query = { query: '' }
  const setQuery = jest.fn()
  const state = true
  const coinSuggestions = [...coinsData]

  it('renders the component correctly', () => {
    const wrapper = mount(
      <CoinHolder
        query={query}
        setQuery={setQuery}
        coinsData={coinsData}
        setCoinsData={setCoinsData}
        state={state}
        coinSuggestions={coinSuggestions}
      />,
    )
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div').prop('style')).toEqual({ display: 'block' })
  })

  it('shows all coins labels from the coinsData prop', () => {
    const wrapper = mount(
      <CoinHolder
        query={query}
        setQuery={setQuery}
        coinsData={coinsData}
        setCoinsData={setCoinsData}
        state={state}
        coinSuggestions={coinSuggestions}
      />,
    )
    expect(wrapper.find('label').at(0).text()).toEqual('BTC')
    expect(wrapper.find('label').at(1).text()).toEqual('ETH')
    expect(wrapper.find('label').at(2).text()).toEqual('XRP')
  })

  it('updates the coins checked state when clicking a coin', () => {
    const expectedCoinsDataResult = [
      { coin: 'BTC', checked: true },
      { coin: 'ETH', checked: false },
      { coin: 'XRP', checked: false },
    ]
    expect(updateCoinsCheckedValue('BTC', coinsData)).toEqual(expectedCoinsDataResult)
  })

  it('adds a coin to the current query', () => {
    const actualQuery = { query: 'XRP,ETH,' }
    // When clicking on 'BTC'
    const expectedQuery = 'XRP,ETH,BTC,'
    expect(updateQuery('BTC', actualQuery)).toEqual(expectedQuery)
  })

  it('removes the indicated coin from the current query', () => {
    const actualQuery = { query: 'XRP,ETH,BTC,' }
    // When clicking on 'ETH'
    const expectedQuery = 'XRP,BTC,'
    expect(updateQuery('ETH', actualQuery)).toEqual(expectedQuery)
  })

  it('updates state for both coinsData and the query', () => {
    const wrapper = mount(
      <CoinHolder
        query={query}
        setQuery={setQuery}
        coinsData={coinsData}
        setCoinsData={setCoinsData}
        state={state}
        coinSuggestions={coinSuggestions}
      />,
    )
    wrapper.find('#BTC').simulate('click')
    expect(setCoinsData).toBeCalled()
    expect(setQuery).toBeCalled()
  })
})
