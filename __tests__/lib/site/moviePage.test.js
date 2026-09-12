/**
 * @jest-environment node
 */

import {
  getMoviePageProps,
  getMovieTimestamp,
  MOVIES_PER_PAGE,
  sortMovies
} from '@/lib/site/moviePage'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'

jest.mock('@/lib/db/SiteDataApi', () => ({
  fetchGlobalAllData: jest.fn()
}))

describe('movie page data', () => {
  it('sorts movies by the date field before publish date', () => {
    const movies = [
      {
        id: 'older',
        date: { start_date: '2026-01-01' },
        publishDate: 2
      },
      {
        id: 'newer',
        date: { start_date: '2026-02-01' },
        publishDate: 1
      }
    ]

    expect(sortMovies(movies).map(movie => movie.id)).toEqual([
      'newer',
      'older'
    ])
    expect(getMovieTimestamp(movies[0])).toBeGreaterThan(0)
  })

  it('returns at most 12 movies and exposes pagination metadata', async () => {
    fetchGlobalAllData.mockResolvedValue({
      allPages: Array.from({ length: MOVIES_PER_PAGE + 1 }, (_, index) => ({
        id: 'movie-' + index,
        type: 'Movie',
        status: 'Published',
        date: { start_date: '2026-01-' + String(index + 1).padStart(2, '0') }
      })),
      NOTION_CONFIG: {}
    })

    const result = await getMoviePageProps({ page: 2, locale: 'zh-CN' })

    expect(result.props.movies).toHaveLength(1)
    expect(result.props.moviePagination).toEqual({
      currentPage: 2,
      totalPages: 2,
      totalCount: MOVIES_PER_PAGE + 1,
      pageSize: MOVIES_PER_PAGE
    })
    expect(result.props.allPages).toBeUndefined()
  })

  it('returns notFound for a page beyond the available movie pages', async () => {
    fetchGlobalAllData.mockResolvedValue({
      allPages: [],
      NOTION_CONFIG: {}
    })

    const result = await getMoviePageProps({ page: 2 })

    expect(result).toEqual({ notFound: true })
  })
})
