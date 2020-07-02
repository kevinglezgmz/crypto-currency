//import React from 'react'
import axios from 'axios'
import { fetchData, Layout } from './Layout'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { act } from 'react-dom/test-utils'

Enzyme.configure({ adapter: new Adapter() })
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('#Layout', () => {
  beforeAll(() => {
    // Data response example received from the api endpoint
    const coinInfo = [
      { cryptocontrol_coin_id: 'bitcoin', id: 'BTC' },
      { cryptocontrol_coin_id: 'ethereum', id: 'ETH' },
    ]
    const resp = { data: coinInfo }
    mockedAxios.get.mockResolvedValue(resp)
  })

  it('fetches coins from api and assigns false checked value to every coin', async () => {
    // Data formatting expected to be returned from fetchData()
    const coins = [
      { coin: 'BTC', checked: false },
      { coin: 'ETH', checked: false },
    ]
    expect(await fetchData()).toEqual(coins)
    expect(mockedAxios.get).toHaveBeenCalled()
  })

  it('renders the index layout correctly', async () => {
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, any>
    await act(async () => {
      wrapper = mount(<Layout />)
    })
    expect(wrapper!).toBeDefined()
  })

  it('shows the apps title text', async () => {
    let wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, any>
    await act(async () => {
      wrapper = mount(<Layout />)
    })
    expect(wrapper!.find('h1').text()).toEqual('Easy crypto currency price checker')
  })
})
