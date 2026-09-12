import SmartLink from '@/components/SmartLink'

/**
 * 归档分组文章
 * @param {*} param0
 * @returns
 */
export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  return (
    <section className='simple-archive-group' id={archiveTitle}>
      <h2 className='simple-archive-group-title'>
        {archiveTitle}
      </h2>

      <ul className='simple-archive-items'>
        {archivePosts.map(post => {
          return (
            <li key={post.id} className='simple-archive-item'>
              <time
                className='simple-archive-date'
                dateTime={post.date?.start_date || ''}>
                {post.date?.start_date}
              </time>
              <div className='simple-archive-post'>
                <SmartLink
                  href={post?.href}
                  passHref
                  className='simple-archive-link'>
                  {post.title}
                </SmartLink>
                {post.password && (
                  <i
                    className='simple-archive-lock fa-solid fa-lock'
                    title='加密文章'
                    aria-label='加密文章'
                  />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
