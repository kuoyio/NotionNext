import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'

export const MOVIES_PER_PAGE = 12

const getDateText = value => {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    return value.start_date || value.start || ''
  }
  return ''
}

const getDateTimestamp = value => {
  const dateText = getDateText(value)
  if (!dateText) return 0

  const timestamp = Date.parse(dateText)
  return Number.isFinite(timestamp) ? timestamp : 0
}

export const getMovieTimestamp = movie =>
  getDateTimestamp(movie?.date) || movie?.publishDate || 0

export const sortMovies = movies =>
  [...(Array.isArray(movies) ? movies : [])].sort((a, b) => {
    const timestampDifference = getMovieTimestamp(b) - getMovieTimestamp(a)
    if (timestampDifference !== 0) return timestampDifference
    return (b?.publishDate ?? 0) - (a?.publishDate ?? 0)
  })

/**
 * 读取并分页处理 Notion 中 type=Movie 的记录。
 * 第 1 页由 /movie 提供，其余页面使用 /movie/page/[page]。
 */
export async function getMoviePageProps({
  page = 1,
  locale,
  from = 'movie-page',
  basePath = '/movie'
} = {}) {
  const requestedPage = Math.max(1, Number.parseInt(String(page), 10) || 1)
  const props = await fetchGlobalAllData({ from, locale })
  const movies = sortMovies(
    (props.allPages || []).filter(
      item => item?.type === 'Movie' && item?.status === 'Published'
    )
  )
  const totalCount = movies.length
  const totalPages = Math.max(1, Math.ceil(totalCount / MOVIES_PER_PAGE))

  if (requestedPage > totalPages) {
    return { notFound: true }
  }

  props.movies = movies.slice(
    MOVIES_PER_PAGE * (requestedPage - 1),
    MOVIES_PER_PAGE * requestedPage
  )
  props.moviePagination = {
    currentPage: requestedPage,
    totalPages,
    totalCount,
    pageSize: MOVIES_PER_PAGE
  }
  props.movieBasePath = basePath

  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}
