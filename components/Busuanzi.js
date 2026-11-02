import busuanzi from '@/lib/plugins/busuanzi'
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import { useEffect } from 'react'

export default function Busuanzi () {
  const { theme } = useGlobal()
  const router = useRouter()
  useEffect(() => {
    let path = router.asPath
    const handleRouteChange = url => {
      if (url !== path) {
        path = url
        busuanzi.fetch()
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, router.asPath])

  // 更换主题时更新
  useEffect(() => {
    if (theme) {
      busuanzi.fetch()
    }
  }, [theme])
  return null
}
