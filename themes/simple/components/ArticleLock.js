import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'

/**
 * 加密文章校验组件
 * @param {validPassword} props
 * @param validPassword 异步校验密码并加载正文，成功时返回 true
 * @returns
 */
export default function ArticleLock (props) {
  const { validPassword } = props
  const { locale } = useGlobal()
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const passwordInputRef = useRef(null)

  const submitPassword = event => {
    void handlePasswordSubmit(event)
  }

  const handlePasswordSubmit = async event => {
    event?.preventDefault()
    if (isSubmitting || typeof validPassword !== 'function') return

    setHasError(false)
    setIsSubmitting(true)
    try {
      const isValid = await validPassword(passwordInputRef.current?.value || '')
      setHasError(!isValid)
    } catch {
      setHasError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    // 选中密码输入框并将其聚焦
    passwordInputRef.current?.focus()
  }, [])

  return (
    <section className='simple-article-lock' aria-labelledby='article-lock-title'>
      <div className='simple-article-lock-card'>
        <div className='simple-article-lock-icon' aria-hidden='true'>
          <i className='fas fa-lock' />
        </div>
        <p className='simple-article-lock-eyebrow'>加密文章</p>
        <h1 id='article-lock-title' className='simple-article-lock-title'>
          {locale.COMMON.ARTICLE_LOCK_TIPS}
        </h1>
        <p className='simple-article-lock-description'>
          请输入密码后继续阅读。
        </p>

        <form className='simple-article-lock-form' onSubmit={submitPassword}>
          <label className='sr-only' htmlFor='password'>
            {locale.COMMON.ARTICLE_LOCK_TIPS}
          </label>
          <input
            id='password'
            ref={passwordInputRef}
            type='password'
            autoComplete='current-password'
            aria-invalid={hasError}
            className='simple-article-lock-input'
            placeholder='请输入访问密码'
          />
          <button
            type='submit'
            className='simple-article-lock-submit'
            disabled={isSubmitting}
            aria-busy={isSubmitting}>
            <i className='fas fa-arrow-right' aria-hidden='true' />
            <span>{isSubmitting ? '验证中…' : locale.COMMON.SUBMIT}</span>
          </button>
        </form>

        {hasError && (
          <p className='simple-article-lock-error' role='alert'>
            {locale.COMMON.PASSWORD_ERROR}
          </p>
        )}
      </div>
    </section>
  )
}
