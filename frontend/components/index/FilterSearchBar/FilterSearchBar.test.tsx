import FilterSearchBar, { getSuggestions } from './FilterSearchBar'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('#FilterSearchBar', () => {
  const coinsData: { coin: string; checked: boolean }[] = [
    { coin: 'BTC', checked: false },
    { coin: 'BTC', checked: false },
    { coin: 'ETH', checked: false },
    { coin: 'XRP', checked: false },
  ]
  const coinSuggestions: { coin: string; checked: boolean }[] = []
  const setSuggestions = jest.fn()
  const state = true

  it('renders the component correctly', () => {
    const wrapper = mount(
      <FilterSearchBar coinsData={coinsData} coinSuggestions={coinSuggestions} setSuggestions={setSuggestions} state={state} />,
    )
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div').prop('style')).toEqual({ display: 'block' })
  })
})
