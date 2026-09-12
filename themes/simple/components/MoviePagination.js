import SmartLink from '@/components/SmartLink'

const getPageHref = (page, basePath) =>
  page === 1 ? basePath : basePath + '/page/' + page

const getPageItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis-right', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis-left',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    ]
  }

  return [
    1,
    'ellipsis-left',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis-right',
    totalPages
  ]
}

export default function MoviePagination({
  pagination,
  basePath = '/movie',
  ariaLabel = '观影记录分页'
}) {
  const currentPage = Number(pagination?.currentPage) || 1
  const totalPages = Number(pagination?.totalPages) || 1

  if (totalPages <= 1) return null

  const pageItems = getPageItems(currentPage, totalPages)

  return (
    <nav className='simple-movie-pagination' aria-label={ariaLabel}>
      {currentPage > 1 ? (
        <SmartLink
          href={getPageHref(currentPage - 1, basePath)}
          rel='prev'
          className='simple-movie-pagination-control'
        >
          <i className='fas fa-angle-left' aria-hidden='true' />
          <span>上一页</span>
        </SmartLink>
      ) : (
        <span
          className='simple-movie-pagination-control is-disabled'
          aria-disabled='true'
        >
          <i className='fas fa-angle-left' aria-hidden='true' />
          <span>上一页</span>
        </span>
      )}

      <div className='simple-movie-pagination-pages'>
        {pageItems.map(item =>
          typeof item === 'string' ? (
            <span
              key={item}
              className='simple-movie-pagination-ellipsis'
              aria-hidden='true'
            >
              …
            </span>
          ) : item === currentPage ? (
            <span
              key={item}
              className='simple-movie-pagination-page is-active'
              aria-current='page'
            >
              {item}
            </span>
          ) : (
            <SmartLink
              key={item}
              href={getPageHref(item, basePath)}
              className='simple-movie-pagination-page'
            >
              {item}
            </SmartLink>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <SmartLink
          href={getPageHref(currentPage + 1, basePath)}
          rel='next'
          className='simple-movie-pagination-control'
        >
          <span>下一页</span>
          <i className='fas fa-angle-right' aria-hidden='true' />
        </SmartLink>
      ) : (
        <span
          className='simple-movie-pagination-control is-disabled'
          aria-disabled='true'
        >
          <span>下一页</span>
          <i className='fas fa-angle-right' aria-hidden='true' />
        </span>
      )}
    </nav>
  )
}
