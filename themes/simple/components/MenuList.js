import Collapse from '@/components/Collapse'
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 菜单导航
 * @param {*} props
 * @returns
 */
export const MenuList = ({ customNav, customMenu }) => {
  const { locale } = useGlobal()
  const [isOpen, changeIsOpen] = useState(false)
  const toggleIsOpen = () => {
    changeIsOpen(!isOpen)
  }
  const closeMenu = e => {
    changeIsOpen(false)
  }
  const router = useRouter()
  const collapseRef = useRef(null)

  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)
  })

  let links = [
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('SIMPLE_MENU_SEARCH', null, CONFIG)
    },
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('SIMPLE_MENU_ARCHIVE', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (
    siteConfig('CUSTOM_MENU') &&
    Array.isArray(customMenu) &&
    customMenu.length > 0
  ) {
    links = customMenu
  }

  const isCategoryPath = href => {
    const path =
      String(href || '')
        .split(/[?#]/)[0]
        .replace(/\/+$/, '') || '/'
    return path === '/category' || path.startsWith('/category/')
  }

  const removeCategoryLinks = items => {
    if (!Array.isArray(items)) return items

    return items.reduce((result, link) => {
      if (!link || isCategoryPath(link.href)) return result

      const subMenus = Array.isArray(link.subMenus)
        ? removeCategoryLinks(link.subMenus)
        : link.subMenus

      result.push(subMenus === link.subMenus ? link : { ...link, subMenus })
      return result
    }, [])
  }

  // 分类页已移除，避免默认菜单、自定义菜单或子菜单留下失效链接。
  links = removeCategoryLinks(links)

  // 当前站点只维护中文内容，不在中文导航中展示英文语言切换入口。
  const chineseOnly = String(BLOG.LANG).toLowerCase().startsWith('zh')
  if (chineseOnly) {
    links = links.filter(link => {
      const href = String(link?.href || '').toLowerCase()
      const name = String(link?.name || '')
        .trim()
        .toLowerCase()
      return href !== '/en' && !href.startsWith('/en/') && name !== 'english'
    })
  }

  if (!links || links.length === 0) {
    return null
  }

  const currentPath = String(router.asPath || '').split(/[?#]/)[0] || '/'
  const isActivePath = href => {
    if (typeof href !== 'string' || !href.startsWith('/')) return false

    const menuPath = href.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
    return (
      menuPath === currentPath ||
      (menuPath !== '/' && currentPath.startsWith(`${menuPath}/`))
    )
  }
  const isActiveLink = link =>
    [link, ...(link?.subMenus || [])].some(menuItem =>
      isActivePath(menuItem?.href)
    )

  return (
    <>
      {/* 大屏模式菜单 */}
      <div id='nav-menu-pc' className='hidden md:flex my-auto'>
        {links?.map((link, index) => (
          <MenuItemDrop key={index} link={link} active={isActiveLink(link)} />
        ))}
      </div>
      {/* 移动端小屏菜单 */}
      <div
        id='nav-menu-mobile'
        className='flex md:hidden my-auto justify-start'
      >
        <div
          onClick={toggleIsOpen}
          className='cursor-pointer hover:text-red-400 transition-all duration-200'
        >
          <i
            className={`${isOpen && 'rotate-90'} transition-all duration-200 fa fa-bars mr-3`}
          />
          <span>{!isOpen ? '菜单' : '关闭'}</span>
        </div>

        <Collapse
          collapseRef={collapseRef}
          className='absolute w-full top-12 left-0'
          isOpen={isOpen}
        >
          <div
            id='menu-wrap'
            className='bg-white dark:border-hexo-black-gray border'
          >
            {links?.map((link, index) => (
              <MenuItemCollapse
                key={index}
                link={link}
                active={isActiveLink(link)}
                onHeightChange={param =>
                  collapseRef.current?.updateCollapseHeight(param)
                }
              />
            ))}
          </div>
        </Collapse>
      </div>
    </>
  )
}
