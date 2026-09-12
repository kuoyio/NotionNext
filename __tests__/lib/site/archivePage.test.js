/**
 * @jest-environment node
 */

import { getArchivePageProps } from '@/lib/site/archivePage'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'

jest.mock('@/lib/db/SiteDataApi', () => ({
  fetchGlobalAllData: jest.fn()
}))

describe('archive page data', () => {
  it('filters published posts and paginates them', async () => {
    fetchGlobalAllData.mockResolvedValue({
      allPages: [
        { id: 'draft', type: 'Post', status: 'Draft', publishDate: 3 },
        { id: 'movie', type: 'Movie', status: 'Published', publishDate: 4 },
        { id: 'newer', type: 'Post', status: 'Published', publishDate: 2 },
        { id: 'older', type: 'Post', status: 'Published', publishDate: 1 }
      ],
      NOTION_CONFIG: { POSTS_PER_PAGE: 1 }
    })

    const result = await getArchivePageProps({ page: 2 })

    expect(result.props.archivePosts.map(post => post.id)).toEqual(['older'])
    expect(result.props.archivePagination).toEqual({
      currentPage: 2,
      totalPages: 2,
      totalCount: 2,
      pageSize: 1
    })
    expect(result.props.allPages).toBeUndefined()
  })

  it('returns notFound beyond the final page', async () => {
    fetchGlobalAllData.mockResolvedValue({
      allPages: [],
      NOTION_CONFIG: {}
    })

    await expect(getArchivePageProps({ page: 2 })).resolves.toEqual({
      notFound: true
    })
  })

  it('defaults to ten articles per page', async () => {
    fetchGlobalAllData.mockResolvedValue({
      allPages: Array.from({ length: 11 }, (_, index) => ({
        id: `post-${index}`,
        type: 'Post',
        status: 'Published',
        publishDate: index
      })),
      NOTION_CONFIG: {}
    })

    const result = await getArchivePageProps({ page: 2 })

    expect(result.props.archivePosts).toHaveLength(1)
    expect(result.props.archivePagination).toEqual({
      currentPage: 2,
      totalPages: 2,
      totalCount: 11,
      pageSize: 10
    })
  })
})
