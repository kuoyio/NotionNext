import BLOG from '@/blog.config'
import {
  fetchGlobalAllData,
  getPostBlocks
} from '@/lib/db/SiteDataApi'
import { formatNotionBlock } from '@/lib/db/notion/getPostBlocks'
import { getMockPost } from '@/lib/site/mockData'
import { adapterNotionBlockMap } from '@/lib/utils/notion.util'
import { sha256Digest } from '@/lib/utils/password'
import md5 from 'js-md5'

const MAX_PASSWORD_LENGTH = 256

const normalizePath = value => String(value || '').replace(/^\/+/, '')

const findPost = (pages, requestedId) => {
  const requested = normalizePath(requestedId)
  const lastSegment = requested.split('/').at(-1)
  const candidates = pages.filter(page => page && !page.type?.includes('Menu'))

  return (
    candidates.find(page =>
      [page.id, page.slug, page.href]
        .filter(Boolean)
        .some(value => normalizePath(value) === requested)
    ) ||
    candidates.find(page =>
      [page.id, page.slug, page.href]
        .filter(Boolean)
        .some(value => normalizePath(value) === lastSegment)
    ) ||
    null
  )
}

const isPasswordValid = (post, password) => {
  const storedPassword = String(post?.password || '').trim()
  if (!storedPassword) return false

  const sha256Password = sha256Digest(password)
  const legacyPassword = md5(String(post?.slug || '') + password)

  return storedPassword === sha256Password || storedPassword === legacyPassword
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' })
  }

  const { postId, password } = req.body || {}
  if (
    typeof postId !== 'string' ||
    !postId.trim() ||
    typeof password !== 'string' ||
    !password ||
    password.length > MAX_PASSWORD_LENGTH
  ) {
    return res.status(400).json({ ok: false, message: 'Invalid request' })
  }

  try {
    let post

    if (BLOG.USE_MOCK_DATA) {
      post = getMockPost(postId)
    } else {
      const siteData = await fetchGlobalAllData({
        from: 'post-content-api',
        locale: BLOG.LANG
      })
      post = findPost(siteData?.allPages || [], postId)
    }

    if (!post || post.status !== 'Published') {
      return res.status(404).json({ ok: false, message: 'Article not found' })
    }

    if (!isPasswordValid(post, password)) {
      return res.status(401).json({ ok: false, message: 'Invalid password' })
    }

    const rawBlockMap =
      post.blockMap ||
      (await getPostBlocks(post.id, 'post-content-api', {
        cacheVersion: post.lastEditedDate
      }))

    if (!rawBlockMap?.block) {
      return res.status(404).json({ ok: false, message: 'Article content not found' })
    }

    const adaptedBlockMap = adapterNotionBlockMap(rawBlockMap)
    const blockMap = {
      ...adaptedBlockMap,
      block: formatNotionBlock(adaptedBlockMap.block)
    }

    return res.status(200).json({ ok: true, blockMap })
  } catch (error) {
    console.error('[post-content-api] failed to load article content:', error)
    return res.status(500).json({ ok: false, message: 'Unable to load article content' })
  }
}
