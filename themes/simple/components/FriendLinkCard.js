import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'

const DEFAULT_LINK_COLOR = '#1677ff'

const isImageSource = value =>
  typeof value === 'string' && /^(?:https?:|\/)/.test(value.trim())

const getCardColor = value => {
  const color = typeof value === 'string' ? value.trim() : ''
  return /^#[0-9a-f]{3,8}$/i.test(color) ? color : DEFAULT_LINK_COLOR
}

const getImageSource = (link, fallbackIcon) => {
  const candidates = [
    link?.pageIcon,
    link?.icon,
    link?.pageCoverThumbnail,
    fallbackIcon
  ]

  return candidates.find(isImageSource) || '/avatar.svg'
}

export default function FriendLinkCard({ link, fallbackIcon }) {
  const href = link?.href || link?.slug
  if (!href) return null

  const title = link?.title || link?.name || '未命名友链'
  const summary = link?.summary || link?.description || ''
  const imageSource = getImageSource(link, fallbackIcon)
  const color = getCardColor(link?.color)

  return (
    <SmartLink
      href={href}
      target={link?.target}
      style={{ '--simple-friend-link-color': color }}
      className='simple-friend-link-card'>
      <article>
        <div className='simple-friend-link-card-icon'>
          <LazyImage
            src={imageSource}
            width={56}
            height={56}
            alt={`${title} 图标`}
            className='simple-friend-link-card-image'
          />
        </div>

        <div className='simple-friend-link-card-body'>
          <div className='simple-friend-link-card-title-row'>
            <h2>{title}</h2>
          </div>

          {summary && <p>{summary}</p>}
        </div>
      </article>
    </SmartLink>
  )
}
