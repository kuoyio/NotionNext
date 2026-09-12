import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getArchivePageProps } from '@/lib/site/archivePage'
import { DynamicLayout } from '@/themes/theme'

const ArchivePage = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutArchive' {...props} />
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params, locale }) {
  return getArchivePageProps({
    page: params?.page,
    locale,
    from: 'archive-page'
  })
}

export default ArchivePage
