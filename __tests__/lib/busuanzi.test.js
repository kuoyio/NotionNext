import busuanzi from '@/lib/plugins/busuanzi'

const scripts = () => Array.from(document.head.querySelectorAll('script[src*="busuanzi"]'))
const callbackFor = script => new URL(script.src).searchParams.get('jsonpCallback')

beforeEach(() => jest.useFakeTimers())
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
  document.body.innerHTML = ''
})

test('cleans up each concurrent JSONP request independently', () => {
  document.body.innerHTML = '<span class="busuanzi_value_site_pv"></span>'
  busuanzi.fetch()
  busuanzi.fetch()
  const [first, second] = scripts()
  const firstCallback = callbackFor(first)
  const secondCallback = callbackFor(second)
  window[firstCallback]({ site_pv: 42 })
  expect(first.isConnected).toBe(false)
  expect(second.isConnected).toBe(true)
  expect(window[firstCallback]).toBeUndefined()
  expect(document.querySelector('.busuanzi_value_site_pv')).toHaveTextContent('42')
  second.dispatchEvent(new Event('error'))
  expect(second.isConnected).toBe(false)
  expect(window[secondCallback]).toBeUndefined()
})

test('cleans up a request that never completes', () => {
  busuanzi.fetch()
  const script = scripts()[0]
  const callback = callbackFor(script)
  jest.advanceTimersByTime(15000)
  expect(script.isConnected).toBe(false)
  expect(window[callback]).toBeUndefined()
})
