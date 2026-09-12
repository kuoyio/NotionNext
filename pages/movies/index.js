import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getMoviePageProps } from '@/lib/site/moviePage'
import { DynamicLayout } from '@/themes/theme'

const MoviesIndex = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutMovie' {...props} />
}

export async function getStaticProps({ locale }) {
  return getMoviePageProps({
    page: 1,
    locale,
    from: 'movies-index',
    basePath: '/movies'
  })
}

export default MoviesIndex
