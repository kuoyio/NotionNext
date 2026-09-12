import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'

/**
 * 文章详情页头部
 *
 * 将文章的核心信息集中在一个轻量的标题区中，
 * 正文仍然完全由 NotionPage 渲染。
 * @param {*} props
 * @returns
 */
export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()
  const common = locale?.COMMON || {}
  const isPost = post?.type === 'Post'
  const archiveHref = post?.publishDate
    ? `/archive#${formatDateFmt(post.publishDate, 'yyyy-MM')}`
    : '/archive'

  return (
    <header className='simple-article-hero'>
      <div className='simple-article-kicker'>
        <span className='simple-article-kicker-mark' aria-hidden='true' />
        <span>{isPost ? '文章' : '页面'}</span>
        {post?.category && (
          <>
            <span className='simple-article-kicker-divider' aria-hidden='true'>
              ·
            </span>
            <span className='simple-article-kicker-link'>{post.category}</span>
          </>
        )}
        {post?.publishDay && (
          <>
            <span className='simple-article-kicker-divider' aria-hidden='true'>
              ·
            </span>
            <SmartLink
              href={archiveHref}
              className='simple-article-kicker-link'
            >
              {post.publishDay}
            </SmartLink>
          </>
        )}
      </div>
      <h1 className='simple-article-title'>{post?.title}</h1>

      <div className='simple-article-meta' aria-label='文章信息'>
        {post?.lastEditedDay && (
          <span className='simple-article-meta-item'>
            <span>
              {common.LAST_EDITED_TIME || 'Updated'} {post.lastEditedDay}
            </span>
          </span>
        )}

        {post?.readTime > 0 && (
          <span className='simple-article-meta-item'>
            <span>
              {common.READ_TIME || 'Read time'} {post.readTime}{' '}
              {common.MINUTE || 'min'}
            </span>
          </span>
        )}

        {post?.wordCount > 0 && (
          <span className='simple-article-meta-item'>
            <span>
              {post.wordCount} {common.WORD_COUNT || 'words'}
            </span>
          </span>
        )}
      </div>
    </header>
  )
}
