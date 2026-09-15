import { getMockSiteData } from '@/lib/site/mockData'

describe('mock site menu', () => {
  it('does not expose the hidden cocktail entry', () => {
    const menuNames = getMockSiteData().customMenu.map(item => item.name)

    expect(menuNames).not.toContain('调酒')
  })
})
