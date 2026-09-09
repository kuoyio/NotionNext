import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'

/**
 * 加密文章校验组件
 * @param {password, validPassword} props
 * @param password 正确的密码
 * @param validPassword(bool) 回调函数，校验正确回调入参为true
 * @returns
 */
export default function ArticleLock (props) {
  const { validPassword } = props
  const { locale } = useGlobal()
  const [hasError, setHasError] = useState(false)
  const passwordInputRef = useRef(null)

  const submitPassword = event => {
    event?.preventDefault()
    const isValid = validPassword(passwordInputRef.current?.value || '')
    setHasError(!isValid)
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
        <p className='simple-article-lock-eyebrow'>PRIVATE ARTICLE</p>
        <h1 id='article-lock-title' className='simple-article-lock-title'>
          {locale.COMMON.ARTICLE_LOCK_TIPS}
        </h1>
        <p className='simple-article-lock-description'>
          Enter the password to continue reading this note.
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
            placeholder='••••••••'
          />
          <button type='submit' className='simple-article-lock-submit'>
            <i className='fas fa-arrow-right' aria-hidden='true' />
            <span>{locale.COMMON.SUBMIT}</span>
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
