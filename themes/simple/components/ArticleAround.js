import SmartLink from '@/components/SmartLink'

/**
 * 上一篇，下一篇文章
 * @param {prev,next} param0
 * @returns
 */
export default function ArticleAround({ prev, next }) {
  if (!prev || !next) {
    return <></>
  }

  return (
    <nav className='simple-article-around' aria-label='Article navigation'>
      <SmartLink
        href={`/${prev.slug}`}
        className='simple-article-around-link simple-article-around-link-prev'>
        <span className='simple-article-around-label'>Previous</span>
        <span className='simple-article-around-title'>
          <i className='mr-2 fas fa-arrow-left' aria-hidden='true' />
          {prev.title}
        </span>
      </SmartLink>

      <SmartLink
        href={`/${next.slug}`}
        className='simple-article-around-link simple-article-around-link-next'>
        <span className='simple-article-around-label'>Next</span>
        <span className='simple-article-around-title'>
          {next.title}
          <i className='ml-2 fas fa-arrow-right' aria-hidden='true' />
        </span>
      </SmartLink>
    </nav>
  )
}
