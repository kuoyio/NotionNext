import SmartLink from '@/components/SmartLink'
import { MenuList } from './MenuList'

/**
 * simple 主题的通用页面外壳。
 * 所有非落地页内容都通过这里复用统一的顶部导航、主体区域和页脚。
 */
export default function SimplePageLayout({
  children,
  customMenu,
  customNav,
  footer
}) {
  return (
    <div className='simple-page-layout'>
      <header className='simple-page-header'>
        <div className='simple-page-header-inner'>
          <SmartLink
            href='/'
            className='simple-page-brand'
            aria-label="返回 Kuoyio's Blog 首页">
            Kuoyio&apos;s Blog
          </SmartLink>

          <nav className='simple-page-navigation' aria-label='主导航'>
            <MenuList customMenu={customMenu} customNav={customNav} />
          </nav>
        </div>
      </header>

      <main className='simple-page-main'>{children}</main>

      {footer}
    </div>
  )
}
