import { useGlobal } from '@/lib/global'

/**
 * 文章列表上方嵌入
 * @param {*} props
 * @returns
 */
export default function BlogPostBar(props) {
  const { category } = props
  const { locale } = useGlobal()

  if (category) {
    return (
      <div className='simple-post-context'>
        <i className='mr-2 fas fa-th' />
        {locale.COMMON.CATEGORY}: {category}
      </div>
    )
  } else {
    return <></>
  }
}
