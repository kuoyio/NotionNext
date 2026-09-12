import BLOG from '@/blog.config'
import { createMockArticleBlockMap } from './mockArticleBlockMap'

const MOCK_SITE_ID = 'mock-site'
const MOCK_COVERS = [
  '/images/feature-1.webp',
  '/images/feature-2.webp',
  '/images/feature-3.webp',
  '/bg_image.jpg'
]

const clone = value => JSON.parse(JSON.stringify(value))

const toTimestamp = date => new Date(`${date}T00:00:00+08:00`).getTime()

const getPostUrlPrefix = () =>
  String(BLOG.POST_URL_PREFIX || 'article').replace(/^\/+|\/+$/g, '')

const getPostSlug = slug => {
  const prefix = getPostUrlPrefix()
  return prefix ? `${prefix}/${slug}` : slug
}

const getPostHref = slug => {
  const postSlug = getPostSlug(slug)
  return `/${postSlug}`
}

const createPage = ({
  id,
  title,
  slug,
  type,
  summary = '',
  category,
  tags,
  date,
  cover,
  href,
  target,
  icon,
  color,
  score,
  password,
  heading,
  body
}) => {
  const timestamp = toTimestamp(date)
  const resolvedSlug = type === 'Post' ? getPostSlug(slug) : slug
  return {
    id,
    title,
    name: title,
    slug: resolvedSlug,
    type,
    status: 'Published',
    summary,
    ...(category ? { category } : {}),
    ...(Array.isArray(tags) && tags.length
      ? {
          tags,
          tagItems: tags.map(tag => ({ name: tag, color: 'gray' }))
        }
      : {}),
    date: { start_date: date },
    publishDay: date,
    publishDate: timestamp,
    lastEditedDate: timestamp,
    pageCover: cover || '/bg_image.jpg',
    pageCoverThumbnail: cover || '/bg_image.jpg',
    pageIcon: icon || '/avatar.png',
    href: href || (type === 'Post' ? getPostHref(slug) : `/${slug}`),
    ...(target ? { target } : {}),
    ...(color ? { color } : {}),
    ...(score !== undefined ? { score } : {}),
    ...(password ? { password } : {}),
    // 以下字段只用于生成 mock 文章正文，不会返回到列表数据。
    _heading: heading || title,
    _body: body || summary || '这是一段用于本地预览的 mock 内容。'
  }
}

const MOCK_POSTS = [
  [
    '01',
    '从零搭建 Kuoyio Blog',
    'kuoyio-blog',
    '技术分享',
    '记录这个博客从设计到上线的过程。',
    '2026-09-09'
  ],
  [
    '02',
    '简约首页的设计记录',
    'minimal-home-design',
    '设计记录',
    '关于留白、字体和导航的取舍。',
    '2026-09-07'
  ],
  [
    '03',
    '本地开发性能排查',
    'local-performance-debugging',
    '技术分享',
    '分析 Next.js 开发环境卡顿的原因。',
    '2026-09-05',
    '617e3b41ddedbf492eed703465c3a99c76f90a63db4cc860cc52b163a6d984a5'
  ],
  [
    '04',
    'Notion 内容模型设计',
    'notion-content-model',
    '技术分享',
    '整理文章、友链和观影记录的数据结构。',
    '2026-09-03'
  ],
  [
    '05',
    '中文博客的 SEO 基础',
    'chinese-blog-seo',
    '技术分享',
    '记录中文站点的标题、描述与结构化数据。',
    '2026-09-01'
  ],
  [
    '06',
    '独立博客的图片策略',
    'blog-image-strategy',
    '设计记录',
    '思考头像、封面和文章配图的管理方式。',
    '2026-08-29'
  ],
  [
    '07',
    '前端组件抽象实践',
    'frontend-component-abstraction',
    '技术分享',
    '把重复的导航、页脚和分页器整理成公共组件。',
    '2026-08-27'
  ],
  [
    '08',
    '我的阅读与记录',
    'reading-and-notes',
    '生活记录',
    '把值得留下的内容整理成长期可读的笔记。',
    '2026-08-25'
  ],
  [
    '09',
    '网站导航设计',
    'site-navigation-design',
    '设计记录',
    '从首页快捷入口到页面顶部导航的设计思路。',
    '2026-08-23'
  ],
  [
    '10',
    '给未来自己的备忘',
    'note-to-future-self',
    '生活记录',
    '一些关于写作、生活和持续维护博客的想法。',
    '2026-08-21'
  ],
  [
    '11',
    'RSS 与内容分发',
    'rss-content-distribution',
    '技术分享',
    '整理博客订阅和内容分发的基础方案。',
    '2026-08-19'
  ],
  [
    '12',
    '让页面保持简单',
    'keep-the-page-simple',
    '设计记录',
    '删掉不必要的装饰，让内容回到中心。',
    '2026-08-17'
  ],
  [
    '13',
    '博客版本发布记录',
    'blog-release-notes',
    '技术分享',
    '记录每次迭代中真正有价值的变化。',
    '2026-08-15'
  ]
].map(([number, title, slug, category, summary, date, password], index) =>
  createPage({
    id: `mock-post-${number}`,
    title,
    slug,
    type: 'Post',
    category,
    summary,
    date,
    cover: MOCK_COVERS[index % MOCK_COVERS.length],
    password,
    heading: title,
    body: `${summary} 这篇文章当前使用本地 mock 数据，后续可以替换为 Notion 内容。`
  })
)

const MOCK_TEST_ARTICLE = createPage({
  id: 'mock-post-content-test',
  title: 'Notion 内容渲染测试',
  slug: 'notion-content-test',
  type: 'Post',
  category: '技术分享',
  summary:
    '覆盖标题、段落、代码、公式、图表、媒体、待办、折叠、表格和多级目录的测试文章。',
  date: '2026-09-11',
  cover: MOCK_COVERS[0],
  heading: 'Notion 内容渲染测试',
  body: '本地 mock 内容渲染测试。'
})

MOCK_POSTS.unshift(MOCK_TEST_ARTICLE)

const MOCK_LINKS = [
  [
    'notionnext',
    'NotionNext',
    '用 Notion 构建自己的独立站。',
    'https://github.com/notionnext-org/NotionNext',
    '#1677ff',
    '/brand/notionnext-logo.png'
  ],
  [
    'github',
    'Kuoyio GitHub',
    '代码、实验和开源项目。',
    'https://github.com/kuoyio',
    '#24292f',
    '/avatar.png'
  ],
  [
    'mdn',
    'MDN Web Docs',
    '前端开发者的参考资料。',
    'https://developer.mozilla.org/zh-CN/',
    '#3b82f6',
    '/images/feature-1.webp'
  ],
  [
    'react',
    'React',
    '构建用户界面的 JavaScript 库。',
    'https://react.dev/',
    '#61dafb',
    '/images/feature-2.webp'
  ]
].map(([slug, title, summary, href, color, icon], index) =>
  createPage({
    id: `mock-link-${index + 1}`,
    title,
    slug: `link-${slug}`,
    type: 'Link',
    summary,
    date: `2026-08-${String(14 - index).padStart(2, '0')}`,
    href,
    target: '_blank',
    icon,
    color
  })
)

const MOCK_MOVIES = [
  ['沙丘：第二部', '电影', '9.3', '2026-08-13'],
  ['龙猫', '电影', '9.2', '2026-08-11'],
  ['海街日记', '电影', '8.8', '2026-08-09'],
  ['进击的巨人', '动画', '9.8', '2026-08-07'],
  ['宇宙探索编辑部', '电影', '8.0', '2026-08-05'],
  ['人生切割术', '剧集', '9.1', '2026-08-03'],
  ['坠落的审判', '电影', '8.8', '2026-08-01'],
  ['无间道', '电影', '9.3', '2026-07-29'],
  ['星际穿越', '电影', '9.4', '2026-07-27'],
  ['请回答 1988', '剧集', '9.7', '2026-07-25'],
  ['机器人之梦', '动画', '9.0', '2026-07-23'],
  ['花束般的恋爱', '电影', '8.6', '2026-07-21'],
  ['黑镜', '剧集', '8.7', '2026-07-19']
].map(([title, category, score, date], index) =>
  createPage({
    id: `mock-movie-${index + 1}`,
    title,
    slug: `movie-${index + 1}`,
    type: 'Movie',
    tags: [category],
    summary: '本地 mock 观影记录',
    date,
    score,
    cover: MOCK_COVERS[index % MOCK_COVERS.length]
  })
)

const MOCK_PAGES = [
  createPage({
    id: 'mock-page-cocktails',
    title: '调酒',
    slug: 'cocktails',
    type: 'Page',
    summary: '调酒记录页面的 mock 内容。',
    date: '2026-08-18',
    heading: '调酒记录',
    body: '这里将来可以展示配方、风味和调酒笔记。'
  }),
  ...MOCK_POSTS,
  ...MOCK_LINKS,
  ...MOCK_MOVIES
]

const MOCK_MENU = [
  { name: '文章', href: '/archive', icon: 'fas fa-box-archive', show: true },
  { name: '友链', href: '/links', icon: 'fas fa-link', show: true },
  { name: '观影', href: '/movie', icon: 'fas fa-film', show: true },
  { name: '调酒', href: '/cocktails', icon: 'fas fa-cocktail', show: true }
]

const MOCK_CONFIG = {
  THEME: 'simple',
  LANG: 'zh-CN',
  LINK: BLOG.LINK || 'http://localhost:3000',
  TITLE: "Kuoyio's Blog",
  DESCRIPTION: 'Kuoyio 的个人博客',
  AVATAR: '/avatar.png',
  CUSTOM_MENU: true,
  APPEARANCE: 'light',
  POSTS_PER_PAGE: 10,
  POST_LIST_STYLE: 'page',
  POST_LIST_PREVIEW: false,
  POST_URL_PREFIX: BLOG.POST_URL_PREFIX || 'article',
  ENABLE_RSS: true,
  RSS_URL: '/rss/feed.xml',
  CONTACT_GITHUB: 'https://github.com/kuoyio',
  ANALYTICS_BUSUANZI_ENABLE: false,
  BEI_AN: '备案号（待配置）',
  BEI_AN_LINK: '#'
}

const MOCK_SITE_INFO = {
  title: MOCK_CONFIG.TITLE,
  description: MOCK_CONFIG.DESCRIPTION,
  pageCover: '/bg_image.jpg',
  icon: MOCK_CONFIG.AVATAR,
  link: MOCK_CONFIG.LINK
}

const toPublicPage = page => {
  const { _heading, _body, ...publicPage } = page
  return publicPage
}

const getPublishedPosts = () =>
  MOCK_POSTS.map(toPublicPage).filter(page => page.status === 'Published')

const getCategoryOptions = posts => {
  const counts = new Map()
  posts.forEach(post => {
    if (!post.category) return
    counts.set(post.category, (counts.get(post.category) || 0) + 1)
  })
  return [...counts.entries()].map(([name, count]) => ({ name, count }))
}

const findMockPage = pageId => {
  const rawId = String(pageId || '').replace(/^\/+/, '')
  const candidates = [
    rawId,
    rawId.replace(/^article\//, ''),
    rawId.split('/').at(-1)
  ].filter(Boolean)

  return MOCK_PAGES.find(page =>
    candidates.some(candidate =>
      [page.id, page.slug, page.href].includes(candidate)
    )
  )
}

const createMockBlockMap = page => {
  if (page?.id === MOCK_TEST_ARTICLE.id) {
    return createMockArticleBlockMap(page)
  }

  const headingId = `${page.id}-heading`
  const paragraphId = `${page.id}-paragraph`

  return {
    block: {
      [page.id]: {
        value: {
          id: page.id,
          type: 'page',
          parent_id: MOCK_SITE_ID,
          content: [headingId, paragraphId],
          properties: { title: [[page.title]] }
        }
      },
      [headingId]: {
        value: {
          id: headingId,
          type: 'header',
          parent_id: page.id,
          properties: { title: [[page._heading || page.title]] }
        }
      },
      [paragraphId]: {
        value: {
          id: paragraphId,
          type: 'text',
          parent_id: page.id,
          properties: { title: [[page._body || page.summary || '']] }
        }
      }
    },
    collection: {},
    collection_view: {},
    collection_query: {},
    signed_urls: {}
  }
}

export function getMockSiteData() {
  const allPages = MOCK_PAGES.map(toPublicPage)
  const posts = getPublishedPosts()
  const linkPages = allPages.filter(
    page =>
      page.status === 'Published' &&
      ['Post', 'Page', 'Link'].includes(page.type)
  )

  return clone({
    NOTION_CONFIG: MOCK_CONFIG,
    siteInfo: MOCK_SITE_INFO,
    notice: null,
    allPages,
    allNavPages: posts,
    allLinkPages: linkPages,
    latestPosts: posts.slice(0, 6),
    categoryOptions: getCategoryOptions(posts),
    tagOptions: [],
    customNav: [],
    customMenu: MOCK_MENU,
    allMembers: [],
    allEvents: [],
    postCount: posts.length,
    pageIds: allPages.map(page => page.id),
    collection: [],
    collectionQuery: {},
    collectionId: null,
    collectionView: {},
    viewIds: [],
    block: {},
    schema: {},
    rawMetadata: {}
  })
}

export function getMockPost(pageId) {
  const page = findMockPage(pageId)
  if (!page) return null

  return {
    ...clone(toPublicPage(page)),
    blockMap: clone(createMockBlockMap(page))
  }
}

export function getMockPostBlocks(pageId) {
  const page = findMockPage(pageId)
  return page ? clone(createMockBlockMap(page)) : null
}
