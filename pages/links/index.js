import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { DynamicLayout } from '@/themes/theme'

/**
 * 友情链接首页。
 * 友链记录使用主 Notion 数据库中的 type=Link 条目。
 */
const LinksIndex = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutLinks' {...props} />
}

export async function getStaticProps({ locale }) {
  const props = await fetchGlobalAllData({ from: 'links-index', locale })
  props.friendLinks = (props.allPages || []).filter(
    page => page?.type === 'Link' && page?.status === 'Published'
  )
  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
        'NEXT_REVALIDATE_SECOND',
        BLOG.NEXT_REVALIDATE_SECOND,
        props.NOTION_CONFIG
      )
  }
}

export default LinksIndex
