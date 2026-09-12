import SmartLink from '@/components/SmartLink'

const isImageSource = value =>
  typeof value === 'string' && /^(?:https?:|\/)/.test(value.trim())

const getCover = (post, siteInfo) => {
  const candidates = [
    post?.pageCoverThumbnail,
    post?.pageCover,
    siteInfo?.pageCover,
    '/bg_image.jpg'
  ]

  return candidates.find(isImageSource) || '/bg_image.jpg'
}

const getCategoryText = post => {
  if (post?.category) {
    return Array.isArray(post.category)
      ? post.category.filter(Boolean).join(' / ')
      : post.category
  }

  return '未分类'
}

export default function ArchivePostCard({ post, siteInfo, anchorId }) {
  const title = post?.title || '未命名文章'
  const href = post?.href || '#'
  const category = getCategoryText(post)
  const publishedDate = post?.date?.start_date || post?.publishDay || '—'
  const isLocked = Boolean(post?.password)
  const cover = getCover(post, siteInfo)

  return (
    <article
      id={anchorId}
      className='simple-archive-post-card'
      style={{ scrollMarginTop: '6rem' }}
    >
      <SmartLink
        href={href}
        target={post?.target}
        className='simple-archive-post-card-cover-link'
        aria-label={title + '封面'}
      >
        <div
          className='simple-archive-post-card-cover'
          style={{ backgroundImage: 'url("' + cover + '")' }}
          aria-hidden='true'
        />
      </SmartLink>

      <section className='simple-archive-post-card-content'>
        <div className='simple-archive-post-card-title-row'>
          <SmartLink
            href={href}
            target={post?.target}
            className='simple-archive-post-card-title'
          >
            {title}
          </SmartLink>
          {isLocked && (
            <span
              className='simple-archive-post-card-lock'
              title='加密文章'
              aria-label='加密文章'
            >
              <i className='fas fa-lock' aria-hidden='true' />
              <span className='sr-only'>已加密</span>
            </span>
          )}
        </div>

        <div className='simple-archive-post-card-meta'>
          <div className='simple-archive-post-card-meta-item' title={category}>
            <i className='fas fa-folder' aria-hidden='true' />
            <span>{category}</span>
          </div>
          <time
            className='simple-archive-post-card-meta-item'
            dateTime={post?.date?.start_date || ''}
          >
            <i className='far fa-calendar' aria-hidden='true' />
            <span>{publishedDate}</span>
          </time>
        </div>
      </section>
    </article>
  )
}
