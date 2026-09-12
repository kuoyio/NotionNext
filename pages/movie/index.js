import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { DynamicLayout } from '@/themes/theme'
import { getMoviePageProps } from '@/lib/site/moviePage'

const MovieIndex = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutMovie' {...props} />
}

export async function getStaticProps({ locale }) {
  return getMoviePageProps({
    page: 1,
    locale,
    from: 'movie-index',
    basePath: '/movie'
  })
}

export default MovieIndex
