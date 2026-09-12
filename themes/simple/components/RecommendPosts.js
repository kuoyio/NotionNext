import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 展示文章推荐
 */
const RecommendPosts = ({ recommendPosts }) => {
  const { locale } = useGlobal()
  if (!siteConfig('SIMPLE_ARTICLE_RECOMMEND_POSTS', null, CONFIG) || !recommendPosts || recommendPosts.length < 1) {
    return <></>
  }

  return (
    <section className='simple-article-related'>
      <div className='simple-article-related-heading'>
        <span className='simple-article-section-eyebrow'>KEEP READING</span>
        <h2>{locale.COMMON.RELATE_POSTS}</h2>
      </div>
      <ul className='simple-article-related-list'>
        {recommendPosts.map(post => (
          <li key={post.id}>
            <SmartLink
              href={`/${post.slug}`}
              className='simple-article-related-link'>
              <span>{post.title}</span>
              <i className='fas fa-arrow-up-right-from-square' aria-hidden='true' />
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
export default RecommendPosts
