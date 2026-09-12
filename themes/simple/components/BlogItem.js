import LazyImage from '@/components/LazyImage'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

export const BlogItem = props => {
  const { post } = props
  const { NOTION_CONFIG } = useGlobal()
  const showPageCover = siteConfig('SIMPLE_POST_COVER_ENABLE', false, CONFIG)
  const showPreview =
    siteConfig('POST_LIST_PREVIEW', false, NOTION_CONFIG) && post.blockMap
  const publishedAt =
    post?.date?.start_date || post?.publishDay || post?.createdTime

  return (
    <article className='simple-post-item'>
      <div className='simple-post-item-main'>
        <div className='simple-post-meta'>
          {post.category && <span>{post.category}</span>}
          {(post.category || publishedAt) && <span aria-hidden='true'>·</span>}
          {publishedAt &&
            (post?.publishDate ? (
              <SmartLink
                href={`/archive#${formatDateFmt(post.publishDate, 'yyyy-MM')}`}
              >
                {publishedAt}
              </SmartLink>
            ) : (
              <span>{publishedAt}</span>
            ))}
          {post.password && <span className='simple-post-private'>已加密</span>}
        </div>

        <h2 className='simple-post-title'>
          <SmartLink href={post.href}>{post.title}</SmartLink>
        </h2>

        {!showPreview && post.summary && (
          <p className='simple-post-summary'>{post.summary}</p>
        )}

        {showPreview && post?.blockMap && (
          <div className='simple-post-preview'>
            <NotionPage post={post} />
          </div>
        )}

        <div className='simple-post-footer'>
          <SmartLink href={post.href} className='simple-post-read'>
            阅读全文 <span aria-hidden='true'>→</span>
          </SmartLink>
        </div>
      </div>

      {showPageCover && post?.pageCoverThumbnail && (
        <SmartLink href={post.href} className='simple-post-cover-link'>
          <LazyImage
            src={post.pageCoverThumbnail}
            alt={post.title}
            className='simple-post-cover'
          />
        </SmartLink>
      )}
    </article>
  )
}
