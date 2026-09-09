import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'

/**
 * 文章详情页头部
 *
 * 将标题、分类、发布时间和阅读信息集中在同一个视觉入口中，
 * 正文仍然完全由 NotionPage 渲染。
 * @param {*} props
 * @returns
 */
export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()
  const common = locale?.COMMON || {}
  const isPost = post?.type === 'Post'
  const hasTags = isPost && post?.tagItems?.length > 0
  const archiveHref = post?.publishDate
    ? `/archive#${formatDateFmt(post.publishDate, 'yyyy-MM')}`
    : '/archive'

  return (
    <header className='simple-article-hero'>
      <div className='simple-article-kicker'>
        <span className='simple-article-kicker-mark' aria-hidden='true' />
        <span>{isPost ? 'ARTICLE' : 'PAGE'}</span>
        {post?.category && (
          <>
            <span className='simple-article-kicker-divider' aria-hidden='true'>
              /
            </span>
            <SmartLink
              href={`/category/${post.category}`}
              className='simple-article-kicker-link'>
              {post.category}
            </SmartLink>
          </>
        )}
      </div>

      <h1 className='simple-article-title'>
        {siteConfig('POST_TITLE_ICON') && post?.pageIcon && (
          <span className='simple-article-title-icon'>
            <NotionIcon icon={post.pageIcon} />
          </span>
        )}
        <span>{post?.title}</span>
      </h1>

      {post?.summary && (
        <p className='simple-article-summary'>{post.summary}</p>
      )}

      <div className='simple-article-meta' aria-label='Article metadata'>
        {post?.publishDay && (
          <SmartLink
            href={archiveHref}
            className='simple-article-meta-item simple-article-meta-item-link'>
            <i className='far fa-calendar' aria-hidden='true' />
            <span>{common.POST_TIME || 'Published'} {post.publishDay}</span>
          </SmartLink>
        )}

        {post?.lastEditedDay && (
          <span className='simple-article-meta-item'>
            <i className='far fa-calendar-check' aria-hidden='true' />
            <span>
              {common.LAST_EDITED_TIME || 'Updated'} {post.lastEditedDay}
            </span>
          </span>
        )}

        {post?.readTime > 0 && (
          <span className='simple-article-meta-item'>
            <i className='far fa-clock' aria-hidden='true' />
            <span>
              {common.READ_TIME || 'Read time'} {post.readTime}{' '}
              {common.MINUTE || 'min'}
            </span>
          </span>
        )}

        {post?.wordCount > 0 && (
          <span className='simple-article-meta-item'>
            <i className='far fa-file-lines' aria-hidden='true' />
            <span>
              {post.wordCount} {common.WORD_COUNT || 'words'}
            </span>
          </span>
        )}
      </div>

      {hasTags && (
        <div className='simple-article-tags' aria-label={common.TAGS || 'Tags'}>
          <span className='simple-article-tags-label'>
            {common.TAGS || 'Tags'}
          </span>
          {post.tagItems.map(tag => (
            <SmartLink
              key={tag.name}
              href={`/tag/${tag.name}`}
              className='simple-article-tag'>
              #{tag.name}
            </SmartLink>
          ))}
        </div>
      )}

      <div className='simple-article-author'>
        <span className='simple-article-author-avatar' aria-hidden='true'>
          {(siteConfig('AUTHOR') || 'K').slice(0, 1).toUpperCase()}
        </span>
        <span>
          {siteConfig('AUTHOR')}
          <span className='simple-article-author-caption'>
            · {isPost ? 'Knowledge notes' : 'Personal page'}
          </span>
        </span>
      </div>
    </header>
  )
}
