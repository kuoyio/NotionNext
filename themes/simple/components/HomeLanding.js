import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'

const DEFAULT_SHORTCUTS = [
  { href: '/archive', label: '文章归档', icon: 'fa-solid fa-box-archive' },
  { href: '/category', label: '文章分类', icon: 'fa-solid fa-folder' },
  { href: '/tag', label: '文章标签', icon: 'fa-solid fa-tags' },
  { href: '/search', label: '搜索文章', icon: 'fa-solid fa-magnifying-glass' }
]

function collectNavigableItems(items, result = []) {
  if (!Array.isArray(items)) {
    return result
  }

  items.forEach(item => {
    if (!item || item.show === false) {
      return
    }

    const href = typeof item.href === 'string' ? item.href.trim() : ''
    // 带子菜单的一级 Menu 会用 `#` 作为占位链接，首页快捷入口不应展示它。
    const isPlaceholderHref = /^\/+#$/.test(href) || href === '#'
    if (href && !isPlaceholderHref) {
      result.push(item)
    }

    if (item.subMenus?.length) {
      collectNavigableItems(item.subMenus, result)
    }
  })

  return result
}

function isChineseOnlyItem(item) {
  const href = String(item?.href || '').toLowerCase()
  const name = String(item?.name || item?.title || '').trim().toLowerCase()
  return href !== '/en' && !href.startsWith('/en/') && name !== 'english'
}

function resolveIcon(icon, index) {
  const fallback = DEFAULT_SHORTCUTS[index % DEFAULT_SHORTCUTS.length].icon

  if (typeof icon !== 'string') {
    return { className: fallback }
  }

  const value = icon.trim()
  if (!value) {
    return { className: fallback }
  }

  // Notion 菜单通常填写 Font Awesome class，例如 `fas fa-folder`。
  if (value.includes('fa-') || /\b(?:fa|fas|far|fab|fal|fad|fat)\b/.test(value)) {
    return { className: value }
  }

  // 也允许在 Notion 菜单中直接填写 emoji 作为图标。
  if ([...value].length <= 4) {
    return { text: value }
  }

  return { className: fallback }
}

function getShortcuts(customMenu, customNav) {
  const menuItems = collectNavigableItems(customMenu).filter(isChineseOnlyItem)
  const navItems = collectNavigableItems(customNav).filter(isChineseOnlyItem)
  const sourceItems = menuItems.length > 0 ? menuItems : navItems

  if (sourceItems.length === 0) {
    return DEFAULT_SHORTCUTS
  }

  return sourceItems.slice(0, 4).map((item, index) => {
    const label = item.name || item.title || `导航 ${index + 1}`
    const icon = resolveIcon(item.icon || item.pageIcon, index)

    return {
      href: item.href,
      label,
      target: item.target,
      ...icon
    }
  })
}

export default function HomeLanding({ siteInfo, customMenu, customNav }) {
  const shortcuts = getShortcuts(customMenu, customNav)

  return (
    <section className='simple-home-landing' aria-labelledby='simple-home-title'>
      <div className='simple-home-center'>
        <div className='simple-home-identity'>
          <div className='simple-home-avatar-wrap'>
            <LazyImage
              priority={true}
              src={siteInfo?.icon || '/avatar.svg'}
              width={88}
              height={88}
              alt='Kuoyio 头像'
              className='simple-home-avatar'
            />
          </div>

          <h1 id='simple-home-title' className='simple-home-brand'>
            Kuoyio&apos;s Blog
          </h1>
        </div>

        <nav className='simple-home-shortcuts' aria-label='快捷导航'>
          {shortcuts.map((shortcut, index) => (
            <SmartLink
              key={`${shortcut.href}-${index}`}
              href={shortcut.href}
              target={shortcut.target}
              className='simple-home-shortcut'
              aria-label={shortcut.label}
              title={shortcut.label}>
              {shortcut.text ? (
                <span aria-hidden='true'>{shortcut.text}</span>
              ) : (
                <i
                  className={shortcut.className || shortcut.icon}
                  aria-hidden='true'
                />
              )}
            </SmartLink>
          ))}
        </nav>
      </div>
    </section>
  )
}
