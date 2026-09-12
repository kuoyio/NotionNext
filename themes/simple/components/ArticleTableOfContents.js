import { uuidToId } from 'notion-utils'
import { useEffect, useMemo, useState } from 'react'

const getHeadingId = item => {
  if (!item?.id) return null
  return uuidToId(item.id)
}

const getHeadingElements = toc =>
  toc
    .map(item => {
      const id = getHeadingId(item)
      if (!id) return null

      return {
        id,
        element:
          document.getElementById(id) ||
          document.querySelector(`[data-id="${id}"]`)
      }
    })
    .filter(item => item?.element)

/**
 * 文章详情页右侧目录。
 * 目录数据来自 Notion 的标题块，解锁文章后会随 post 一起更新。
 */
export default function ArticleTableOfContents({ post }) {
  const toc = useMemo(
    () => (Array.isArray(post?.toc) ? post.toc : []),
    [post?.toc]
  )
  const firstId = getHeadingId(toc[0])
  const [activeId, setActiveId] = useState(firstId)

  useEffect(() => {
    if (!toc.length || typeof window === 'undefined') return undefined

    let frameId = null
    const updateActiveHeading = () => {
      frameId = null
      const headings = getHeadingElements(toc)
      if (!headings.length) return

      let currentId = headings[0].id
      headings.forEach(({ id, element }) => {
        if (element.getBoundingClientRect().top <= 160) {
          currentId = id
        }
      })
      setActiveId(currentId)
    }

    const scheduleUpdate = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(updateActiveHeading)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    const timerId = window.setTimeout(scheduleUpdate, 240)

    const article = document.getElementById('notion-article')
    const mutationObserver =
      article && typeof MutationObserver === 'function'
        ? new MutationObserver(scheduleUpdate)
        : null
    mutationObserver?.observe(article, { childList: true, subtree: true })

    scheduleUpdate()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.clearTimeout(timerId)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      mutationObserver?.disconnect()
    }
  }, [toc])

  if (!toc.length) return null

  return (
    <aside className='simple-article-toc' aria-label='文章目录'>
      <div className='simple-article-toc-heading'>
        <span className='simple-article-toc-mark' aria-hidden='true' />
        <span>目录</span>
      </div>

      <nav className='simple-article-toc-list'>
        {toc.map(item => {
          const id = getHeadingId(item)
          if (!id) return null

          const isActive = activeId === id
          const indentLevel = Number.isInteger(item.indentLevel)
            ? item.indentLevel
            : 0

          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? 'location' : undefined}
              className={`simple-article-toc-link ${
                isActive ? 'is-active' : ''
              }`}
              style={{ paddingLeft: `${0.7 + indentLevel * 0.75}rem` }}
              onClick={() => setActiveId(id)}
            >
              {item.text}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
