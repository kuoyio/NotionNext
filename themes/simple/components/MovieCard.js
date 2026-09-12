import LazyImage from '@/components/LazyImage'

const isImageSource = value =>
  typeof value === 'string' && /^(?:https?:|\/)/.test(value.trim())

const getPoster = (movie, siteInfo) => {
  const candidates = [
    movie?.pageCoverThumbnail,
    movie?.pageCover,
    movie?.poster,
    movie?.pageIcon,
    siteInfo?.pageCover,
    siteInfo?.icon,
    '/bg_image.jpg'
  ]

  return candidates.find(isImageSource) || '/bg_image.jpg'
}

const getText = value => {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value.trim()
  return String(value).trim()
}

const getDateText = value => {
  const text =
    typeof value === 'object' && value !== null
      ? getText(value.start_date || value.start)
      : getText(value)

  if (!text) return ''
  return text.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || text
}

const getCategoryText = movie => {
  const tags = Array.isArray(movie?.tags)
    ? movie.tags
    : Array.isArray(movie?.tagItems)
      ? movie.tagItems.map(tag => tag?.name)
      : []

  if (tags.length > 0) {
    return tags.map(getText).filter(Boolean).join(' / ')
  }

  return ''
}

export default function MovieCard({ movie, siteInfo }) {
  const title = getText(movie?.title || movie?.name) || '未命名影片'
  const remark = getText(movie?.summary || movie?.remark)
  const category = getCategoryText(movie) || '未分类'
  const score = getText(movie?.score) || '—'
  const watchDateText =
    getDateText(movie?.date) || getText(movie?.publishDay) || '—'
  const poster = getPoster(movie, siteInfo)

  return (
    <article className='simple-movie-card' aria-label={title + '观影记录'}>
      <section className='simple-movie-card-header'>
        <div className='simple-movie-card-poster'>
          <LazyImage
            src={poster}
            fallbackSrc='/bg_image.jpg'
            width={200}
            height={270}
            alt={title + '海报'}
            className='simple-movie-card-poster-image'
          />
        </div>
        <div
          className='simple-movie-card-background'
          style={{ backgroundImage: 'url("' + poster + '")' }}
          aria-hidden='true'
        />
      </section>

      <section className='simple-movie-card-content'>
        <div className='simple-movie-card-name'>
          <span className='simple-movie-card-name-text'>{title}</span>
          {remark && (
            <span className='simple-movie-card-name-remark'>{remark}</span>
          )}
        </div>

        <div className='simple-movie-card-divider' aria-hidden='true' />

        <div className='simple-movie-card-info'>
          <div className='simple-movie-card-info-item'>
            <i className='fas fa-folder' aria-hidden='true' />
            <span title={category}>{category}</span>
          </div>
          <div className='simple-movie-card-info-item'>
            <i className='fas fa-star' aria-hidden='true' />
            <span title={score}>{score}</span>
          </div>
          <div className='simple-movie-card-info-item'>
            <i className='far fa-calendar' aria-hidden='true' />
            <span title={watchDateText}>{watchDateText}</span>
          </div>
        </div>
      </section>
    </article>
  )
}
