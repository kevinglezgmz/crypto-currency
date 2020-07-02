//import React from 'react'
import CurrencySelector from './CurrencySelector'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('#CurrencySelector', () => {
  const coinsData: { coin: string; checked: boolean }[] = [
    { coin: 'BTC', checked: false },
    { coin: 'ETH', checked: false },
  ]
  const setCoinsData = jest.fn()

  it('renders the component correctly', () => {
    const wrapper = mount(<CurrencySelector props={{ coinsData, setCoinsData }} />)
    expect(wrapper).toBeDefined()
  })

  it('shows default text for both buttons', () => {
    const wrapper = mount(<CurrencySelector props={{ coinsData, setCoinsData }} />)
    expect(wrapper!.find('button').text()).toEqual('Show coins')
    expect(wrapper!.find('a').text()).toEqual('Check prices')
  })

  it('correctly updates the text displayed on the first button', () => {
    const wrapper = mount(<CurrencySelector props={{ coinsData, setCoinsData }} />)
    expect(wrapper!.find('button').text()).toEqual('Show coins')
    wrapper!.find('button').simulate('click')
    expect(wrapper!.find('button').text()).toEqual('Hide coins')
  })

  it('correctly updates href value of check prices button', () => {
    const wrapper = mount(<CurrencySelector props={{ coinsData, setCoinsData }} />)
    wrapper.find('button').simulate('click')
    wrapper.find('#BTC').simulate('click')
    expect(wrapper!.find('a').props().href).toEqual('/prices?coins=BTC,')
  })
})
