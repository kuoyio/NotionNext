import AnalyticsBusuanzi from '@/components/AnalyticsBusuanzi'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

/**
 * 页脚
 * @param {*} props
 * @returns
 */
export default function Footer(props) {
  const { NOTION_CONFIG } = props
  const d = new Date()
  const currentYear = d.getFullYear()
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig(
    'ANALYTICS_BUSUANZI_ENABLE',
    null,
    NOTION_CONFIG
  )
  const beiAn = siteConfig('BEI_AN', null, NOTION_CONFIG)
  const beiAnLink = siteConfig('BEI_AN_LINK', null, NOTION_CONFIG)
  const githubUrl =
    siteConfig('CONTACT_GITHUB', null, NOTION_CONFIG) ||
    'https://github.com/kuoyio'
  const rssEnabled = siteConfig('ENABLE_RSS', true, NOTION_CONFIG)
  const rssUrl =
    siteConfig('RSS_URL', '/rss/feed.xml', NOTION_CONFIG) || '/rss/feed.xml'

  return (
    <footer className='simple-site-footer relative w-full bg-black px-6 border-t'>
      <div className='simple-footer-theme-control'>
        <DarkModeButton className='text-center pt-4' />
      </div>

      <div className='simple-footer-content text-yellow-300 container mx-auto max-w-4xl py-6 md:flex flex-wrap md:flex-no-wrap md:justify-between items-center text-sm'>
        <div className='simple-footer-info-row' aria-label='站点信息'>
          <span className='simple-footer-copyright'>
            © {currentYear} kuoyio. All rights reserved.
          </span>
          <span className='simple-footer-divider' aria-hidden='true'>
            |
          </span>
          <a
            href={beiAnLink}
            className='simple-footer-beian no-underline hover:underline'
            target='_blank'
            rel='noreferrer'>
            {beiAn || '备案号'}
          </a>
          <span className='simple-footer-divider' aria-hidden='true'>
            |
          </span>
          <span className='simple-footer-powered'>
            Powered by{' '}
            <a
              href='https://github.com/notionnext-org/NotionNext'
              className='hover:underline'
              target='_blank'
              rel='noreferrer'>
              NotionNext
            </a>
          </span>
        </div>

        <div className='simple-footer-social-row' aria-label='社交链接'>
          <a
            href={githubUrl}
            target='_blank'
            rel='noreferrer'
            title='GitHub'
            aria-label='GitHub'>
            <i className='fab fa-github' aria-hidden='true' />
          </a>
          {rssEnabled !== false && (
            <a
              href={rssUrl}
              target='_blank'
              rel='noreferrer'
              title='RSS'
              aria-label='RSS'>
              <i className='fas fa-rss' aria-hidden='true' />
            </a>
          )}
        </div>

        {ANALYTICS_BUSUANZI_ENABLE && (
          <div className='simple-footer-analytics'>
            <AnalyticsBusuanzi />
          </div>
        )}
      </div>
    </footer>
  )
}
