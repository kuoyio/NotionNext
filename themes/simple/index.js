import { AdSlot } from '@/components/GoogleAdsense'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import BlogPostBar from './components/BlogPostBar'
import CONFIG from './config'
import { Style } from './style'
import HomeLanding from './components/HomeLanding'
import SimplePageLayout from './components/SimplePageLayout'
import FriendLinkCard from './components/FriendLinkCard'
import MovieCard from './components/MovieCard'
import MoviePagination from './components/MoviePagination'
import ArchivePostCard from './components/ArchivePostCard'
import ArticleLock from './components/ArticleLock'
import ArticleTableOfContents from './components/ArticleTableOfContents'
import { formatDateFmt } from '@/lib/utils/formatDate'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题组件
const BlogListScroll = dynamic(() => import('./components/BlogListScroll'), {
  ssr: false
})
const ArticleInfo = dynamic(() => import('./components/ArticleInfo'), {
  ssr: false
})
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const TopBar = dynamic(() => import('./components/TopBar'), { ssr: false })
const SideBar = dynamic(() => import('./components/SideBar'), { ssr: false })
const JumpToTopButton = dynamic(() => import('./components/JumpToTopButton'), {
  ssr: false
})
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const SearchInput = dynamic(() => import('./components/SearchInput'), {
  ssr: false
})
const WWAds = dynamic(() => import('@/components/WWAds'), { ssr: false })
const BlogListPage = dynamic(() => import('./components/BlogListPage'), {
  ssr: false
})
const RecommendPosts = dynamic(() => import('./components/RecommendPosts'), {
  ssr: false
})

// 主题全局状态
const ThemeGlobalSimple = createContext()
export const useSimpleGlobal = () => useContext(ThemeGlobalSimple)

/**
 * 基础布局
 *
 * @param {*} props
 * @returns
 */
const LayoutBase = props => {
  const { children, slotTop } = props
  const { onLoading, fullWidth } = useGlobal()
  const searchModal = useRef(null)

  return (
    <ThemeGlobalSimple.Provider value={{ searchModal }}>
      <div
        id='theme-simple'
        className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col dark:text-gray-300  bg-white dark:bg-black scroll-smooth`}
      >
        <Style />

        {siteConfig('SIMPLE_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

        <SimplePageLayout
          customMenu={props.customMenu}
          customNav={props.customNav}
          footer={<Footer {...props} />}
        >
          {/* 主体 */}
          <div
            id='container-wrapper'
            className={
              (JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE'))
                ? 'flex-row-reverse'
                : '') +
              ' w-full flex-1 flex items-start max-w-9/10 mx-auto pt-12'
            }
          >
            <div id='container-inner ' className='w-full flex-grow min-h-fit'>
              <Transition
                show={!onLoading}
                appear={true}
                enter='transition ease-in-out duration-700 transform order-first'
                enterFrom='opacity-0 translate-y-16'
                enterTo='opacity-100'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-16'
                unmount={false}
              >
                {slotTop}

                {children}
              </Transition>
              <AdSlot type='native' />
            </div>

            {fullWidth ? null : (
              <div
                id='right-sidebar'
                className='hidden xl:block flex-none sticky top-8 w-96 border-l dark:border-gray-800 pl-12 border-gray-100'
              >
                <SideBar {...props} />
              </div>
            )}
          </div>
        </SimplePageLayout>

        <div className='fixed right-4 bottom-4 z-20'>
          <JumpToTopButton />
        </div>

        {/* 搜索框 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalSimple.Provider>
  )
}

/**
 * 网站首页入口
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  return (
    <HomeLanding
      siteInfo={props.siteInfo}
      customMenu={props.customMenu}
      customNav={props.customNav}
    />
  )
}
/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <>
      <BlogPostBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </>
  )
}

/**
 * 友情链接页
 * @param {*} props
 * @returns
 */
const LayoutLinks = props => {
  const { friendLinks, siteInfo } = props
  const links = [...(Array.isArray(friendLinks) ? friendLinks : [])].sort(
    (a, b) => {
      const aOrder = getLinkSortOrder(a?.sortOrder)
      const bOrder = getLinkSortOrder(b?.sortOrder)
      const hasAOrder = aOrder !== null
      const hasBOrder = bOrder !== null

      if (hasAOrder && hasBOrder && aOrder !== bOrder) {
        return aOrder - bOrder
      }
      if (hasAOrder !== hasBOrder) return hasAOrder ? -1 : 1
      return (b?.publishDate ?? 0) - (a?.publishDate ?? 0)
    }
  )

  return (
    <section className='simple-friend-links-page'>
      {links.length > 0 ? (
        <div className='simple-friend-link-grid'>
          {links.map(link => (
            <FriendLinkCard
              key={link.id || link.href || link.slug}
              link={link}
              fallbackIcon={siteInfo?.icon}
            />
          ))}
        </div>
      ) : (
        <p className='simple-friend-links-empty'>暂时还没有友链</p>
      )}
    </section>
  )
}

const getLinkSortOrder = value => {
  if (value === undefined || value === null || String(value).trim() === '') {
    return null
  }

  const order = Number(value)
  return Number.isFinite(order) ? order : null
}

/**
 * 观影记录页
 * @param {*} props
 * @returns
 */
const LayoutMovie = props => {
  const { movies, moviePagination, movieBasePath, siteInfo } = props
  const movieItems = Array.isArray(movies) ? movies : []

  return (
    <section className='simple-movie-page'>
      {movieItems.length > 0 ? (
        <div className='simple-movie-grid'>
          {movieItems.map((movie, index) => (
            <MovieCard
              key={movie.id || movie.slug || movie.title || index}
              movie={movie}
              siteInfo={siteInfo}
            />
          ))}
        </div>
      ) : (
        <p className='simple-movie-empty'>暂时还没有观影记录</p>
      )}

      <MoviePagination pagination={moviePagination} basePath={movieBasePath} />
    </section>
  )
}

/**
 * 搜索页
 * 也是博客列表
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [])

  const slotTop = siteConfig('ALGOLIA_APP_ID') ? null : (
    <SearchInput {...props} />
  )

  return <LayoutPostList {...props} slotTop={slotTop} />
}

/**
 * 归档页
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts, archivePagination, siteInfo } = props
  const posts = Array.isArray(archivePosts) ? archivePosts : []
  const monthAnchors = new Set()

  return (
    <section className='simple-archive-page' aria-label='文章归档'>
      {posts.length > 0 ? (
        <div className='simple-archive-post-grid'>
          {posts.map((post, index) => {
            const month = post?.publishDate
              ? formatDateFmt(post.publishDate, 'yyyy-MM')
              : ''
            const anchorId =
              month && !monthAnchors.has(month) ? month : undefined

            if (month) monthAnchors.add(month)

            return (
              <ArchivePostCard
                key={post.id || post.slug || post.title || index}
                post={post}
                siteInfo={siteInfo}
                anchorId={anchorId}
              />
            )
          })}
        </div>
      ) : (
        <p className='simple-archive-empty'>暂时还没有文章</p>
      )}

      <MoviePagination
        pagination={archivePagination}
        basePath='/archive'
        ariaLabel='文章归档分页'
      />
    </section>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, hideLock, recommendPosts } = props
  const { fullWidth } = useGlobal()

  return (
    <div
      className={`simple-article-page ${
        fullWidth ? 'simple-article-page-wide' : ''
      }`}
    >
      {!hideLock && lock && <ArticleLock validPassword={props.validPassword} />}

      {!lock && post && (
        <article
          className={`simple-article-shell ${
            fullWidth ? 'simple-article-shell-wide' : ''
          }`}
        >
          <ArticleInfo post={post} />

          <div className='simple-article-body-layout'>
            <div className='simple-article-main'>
              <WWAds orientation='horizontal' className='w-full' />

              <div id='article-wrapper' className='simple-article-content'>
                <NotionPage post={post} />
              </div>

              <section className='simple-article-aftercare'>
                <AdSlot type='in-article' />

                {post?.type === 'Post' && (
                  <RecommendPosts recommendPosts={recommendPosts} />
                )}

                <section className='simple-article-comments'>
                  <span className='simple-article-section-eyebrow'>评论</span>
                  <Comment frontMatter={post} />
                </section>
              </section>
            </div>

            <ArticleTableOfContents post={post} />
          </div>
        </article>
      )}
    </div>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const { post } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post])
  return <>404 Not found.</>
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <>
      <div id='tags-list' className='duration-200 flex flex-wrap'>
        {tagOptions.map(tag => {
          return (
            <div key={tag.name} className='p-2'>
              <SmartLink
                key={tag}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                passHref
                className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200  mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white text-gray-600 hover:shadow-xl dark:border-gray-400 notion-${tag.color}_background dark:bg-gray-800`}
              >
                <div className='font-light dark:text-gray-400'>
                  <i className='mr-1 fas fa-tag' />{' '}
                  {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
                </div>
              </SmartLink>
            </div>
          )
        })}
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutIndex,
  LayoutLinks,
  LayoutMovie,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
