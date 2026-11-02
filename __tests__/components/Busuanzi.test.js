import React from 'react'
import { act, render } from '@testing-library/react'
import Busuanzi from '@/components/Busuanzi'
import busuanzi from '@/lib/plugins/busuanzi'

jest.mock('@/lib/plugins/busuanzi', () => ({ fetch: jest.fn() }))
jest.mock('@/lib/global', () => ({ useGlobal: () => ({ theme: 'simple' }) }))

test('keeps one route listener across renders and removes it on unmount', () => {
  const events = { on: jest.fn(), off: jest.fn() }
  jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
    asPath: '/', events
  })
  const { rerender, unmount } = render(<Busuanzi />)
  rerender(<Busuanzi />)
  expect(events.on).toHaveBeenCalledTimes(1)
  const handler = events.on.mock.calls[0][1]
  expect(busuanzi.fetch).toHaveBeenCalledTimes(1)
  act(() => handler('/archive'))
  act(() => handler('/archive'))
  expect(busuanzi.fetch).toHaveBeenCalledTimes(2)
  unmount()
  expect(events.off).toHaveBeenCalledWith('routeChangeComplete', handler)
})
