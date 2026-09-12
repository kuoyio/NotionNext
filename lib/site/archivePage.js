import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'

export const getArchivePageProps = async ({
  page = 1,
  locale,
  from = 'archive-page'
} = {}) => {
  const requestedPage = Math.max(1, Number.parseInt(String(page), 10) || 1)
  const props = await fetchGlobalAllData({ from, locale })
  const posts = [...(props.allPages || [])]
    .filter(item => item?.type === 'Post' && item?.status === 'Published')
    .sort((a, b) => (b?.publishDate ?? 0) - (a?.publishDate ?? 0))
  const totalCount = posts.length
  const postsPerPage = Math.max(
    1,
    Number(siteConfig('POSTS_PER_PAGE', 10, props.NOTION_CONFIG)) || 10
  )
  const totalPages = Math.max(1, Math.ceil(totalCount / postsPerPage))

  if (requestedPage > totalPages) {
    return { notFound: true }
  }

  props.archivePosts = posts.slice(
    postsPerPage * (requestedPage - 1),
    postsPerPage * requestedPage
  )
  props.archivePagination = {
    currentPage: requestedPage,
    totalPages,
    totalCount,
    pageSize: postsPerPage
  }

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
