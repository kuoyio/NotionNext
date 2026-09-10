import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { DynamicLayout } from '@/themes/theme'
import { getMoviePageProps } from '@/lib/site/moviePage'

const MoviePage = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutMovie' {...props} />
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params, locale }) {
  return getMoviePageProps({
    page: params?.page,
    locale,
    from: 'movie-page',
    basePath: '/movie'
  })
}

export default MoviePage
