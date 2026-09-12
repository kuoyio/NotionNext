/**
 * @jest-environment node
 */

import { adjustPageProperties } from '@/lib/db/notion/getPageProperties'

jest.mock('notion-utils', () => ({
  getDateValue: jest.fn(),
  getTextContent: jest.fn()
}))

jest.mock('@/lib/db/notion/getNotionAPI', () => ({
  __esModule: true,
  default: {
    getUsers: jest.fn()
  }
}))

describe('adjustPageProperties', () => {
  it('uses category mapping for pages only when the page category is mapped', () => {
    const NOTION_CONFIG = {
      POST_URL_PREFIX: '%category%/%year%/%month%/%day%',
      POST_URL_PREFIX_MAPPING_CATEGORY: {
        Guide: 'manual'
      },
      PSEUDO_STATIC: false
    }

    const mappedPage = {
      id: 'page-id',
      type: 'Page',
      slug: 'a-manual',
      category: 'Guide'
    }
    const plainPage = {
      id: 'plain-id',
      type: 'Page',
      slug: 'a-book',
      category: 'Book'
    }

    adjustPageProperties(mappedPage, NOTION_CONFIG)
    adjustPageProperties(plainPage, NOTION_CONFIG)

    expect(mappedPage.slug).toBe('manual/a-manual')
    expect(mappedPage.href).toBe('/manual/a-manual')
    expect(plainPage.slug).toBe('a-book')
    expect(plainPage.href).toBe('/a-book')
  })

  it('keeps Link records as external links', () => {
    const link = {
      id: 'link-id',
      type: 'Link',
      slug: 'https://example.com'
    }

    adjustPageProperties(link, { PSEUDO_STATIC: true })

    expect(link.href).toBe('https://example.com')
    expect(link.target).toBe('_blank')
  })

  it('keeps Movie records in the global page collection without a slug', () => {
    const movie = {
      id: 'movie-id',
      type: 'Movie',
      title: '示例电影'
    }

    adjustPageProperties(movie, { PSEUDO_STATIC: false })

    expect(movie.slug).toBe('movie-id')
    expect(movie.href).toBe('/movie-id')
    expect(movie.target).toBe('_self')
  })
})
