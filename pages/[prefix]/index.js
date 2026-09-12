import BLOG from '@/blog.config'
import useNotification from '@/components/Notification'
import TechGrow from '@/components/TechGrow'
import { siteConfig } from '@/lib/config'
import { resolvePostProps } from '@/lib/db/SiteDataApi'
import { useGlobal } from '@/lib/global'
import { getPageTableOfContents } from '@/lib/db/notion/getPageTableOfContents'
import {
  getPasswordQuery,
  getPasswordStoragePath
} from '@/lib/utils/password'
import { checkSlugHasNoSlash } from '@/lib/utils/post'
import ArticleLock from '@/themes/simple/components/ArticleLock'
import { DynamicLayout } from '@/themes/theme'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getStaticPathsBase } from '@/lib/build/staticPaths'
import { isExport } from '@/lib/utils/buildMode'

const isStaticExport = process.env.EXPORT === 'true'

const getInitialPost = post => {
  if (!post?.password) return post

  // 即使上游误带 blockMap，锁定页也不应把正文留在客户端 props 中。
  const { blockMap, content, toc, ...safePost } = post
  return safePost
}

/**
 * 根据notion的slug访问页面
 * 只解析一级目录例如 /about
 * @param {*} props
 * @returns
 */
const Slug = props => {
  const { post } = props
  const router = useRouter()
  const { locale } = useGlobal()

  // 文章锁🔐
  const [articlePost, setArticlePost] = useState(() => getInitialPost(post))
  const [lock, setLock] = useState(() => Boolean(post?.password))
  const { showNotification, Notification } = useNotification()

  const loadProtectedContent = useCallback(
    async (
      targetPost,
      passInput,
      { silent = false, isActive = () => true } = {}
    ) => {
      if (!targetPost?.id || !targetPost?.password || typeof window === 'undefined') {
        return false
      }

      try {
        const response = await fetch('/api/post-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: targetPost.id, password: passInput })
        })

        if (!response.ok) return false

        const data = await response.json()
        if (!data?.ok || !data.blockMap) return false
        if (!isActive()) return false

        setArticlePost(currentPost => ({
          ...currentPost,
          blockMap: data.blockMap
        }))
        setLock(false)

        // 输入密码存入 localStorage；键仅含 pathname，避免 query/hash 导致读写不一致。
        window.localStorage.setItem(
          'password_' + getPasswordStoragePath(router.asPath),
          passInput
        )

        if (!silent) {
          showNotification(locale.COMMON.ARTICLE_UNLOCK_TIPS)
        }
        return true
      } catch (error) {
        console.warn('[ArticleLock] failed to load protected content:', error)
        return false
      }
    },
    [locale.COMMON.ARTICLE_UNLOCK_TIPS, router.asPath, showNotification]
  )

  const validPassword = useCallback(
    passInput => loadProtectedContent(articlePost, passInput),
    [articlePost, loadProtectedContent]
  )

  // 文章加载
  useEffect(() => {
    const initialPost = getInitialPost(post)
    const isLocked = Boolean(post?.password)
    setArticlePost(initialPost)
    setLock(isLocked)

    if (!isLocked) return

    let active = true

    // 读取上次记录 自动提交密码
    const unlockFromStorage = async () => {
      const passInputs = getPasswordQuery(router.asPath)
      for (const passInput of passInputs) {
        if (!active) return
        if (
          await loadProtectedContent(initialPost, passInput, {
            silent: true,
            isActive: () => active
          })
        ) {
          break // 密码验证成功，停止尝试
        }
      }
    }

    unlockFromStorage()
    return () => {
      active = false
    }
    // 这里故意只在文章或地址变化时自动尝试已保存密码。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, router.asPath])

  const renderPost = useMemo(() => {
    if (!articlePost?.blockMap?.block) return articlePost

    const content = Object.keys(articlePost.blockMap.block).filter(
      key => articlePost.blockMap.block[key]?.value?.parent_id === articlePost.id
    )
    const postWithContent = { ...articlePost, content }

    return {
      ...postWithContent,
      toc: getPageTableOfContents(postWithContent, articlePost.blockMap)
    }
  }, [articlePost])

  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  const layoutProps = {
    ...props,
    post: renderPost,
    lock,
    validPassword,
    // simple 主题的动态布局加载期间，由页面本身负责渲染锁定面板，避免首屏出现空白。
    hideLock: theme === 'simple'
  }
  return (
    <>
      {layoutProps.hideLock && lock && (
        <div className='simple-article-page'>
          <ArticleLock validPassword={validPassword} />
        </div>
      )}
      {/* 文章布局 */}
      <DynamicLayout theme={theme} layoutName='LayoutSlug' {...layoutProps} />
      {/* 解锁密码提示框 */}
      {renderPost?.password && !lock && <Notification />}
      {/* 导流工具 */}
      <TechGrow lock={lock} />
    </>
  )
}

Slug.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    password: PropTypes.string,
    content: PropTypes.array,
    toc: PropTypes.array,
    blockMap: PropTypes.shape({
      block: PropTypes.object
    })
  }),
  NOTION_CONFIG: PropTypes.object
}

export async function getStaticPaths() {
  return getStaticPathsBase({
    from: 'slug-paths',
    filterFn: row => checkSlugHasNoSlash(row),
    mapPageToParams: row => ({ params: { prefix: row.slug } })
  })
}

export async function getStaticProps({ params: { prefix }, locale }) {
  const props = await resolvePostProps({
    prefix,
    locale,
  })

  return {
    props,
    revalidate: isStaticExport
      ? undefined
      : siteConfig(
        'NEXT_REVALIDATE_SECOND',
        BLOG.NEXT_REVALIDATE_SECOND,
        props.NOTION_CONFIG
      ),
    notFound: !props.post
  }
}

export default Slug
