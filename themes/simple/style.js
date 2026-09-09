/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`

  // 底色
  .dark body{
      background-color: black;
  }
  // 文本不可选取
    .forbid-copy {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

  #theme-simple #announcement-content {
    /* background-color: #f6f6f6; */
  }

  #theme-simple .blog-item-title {
    color: #276077;
  }

  .dark #theme-simple .blog-item-title {
    color: #d1d5db;
  }

  .notion {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  /* Article detail redesign */
  #theme-simple .simple-article-page {
    --article-ink: #142326;
    --article-muted: #617276;
    --article-border: rgba(20, 35, 38, 0.12);
    --article-surface: rgba(255, 255, 255, 0.92);
    --article-accent: #0f766e;
    position: relative;
    width: 100%;
    padding: 0 0 5rem;
    color: var(--article-ink);
  }

  #theme-simple .simple-article-page::before {
    content: '';
    position: absolute;
    inset: -4rem -10% auto;
    height: 28rem;
    pointer-events: none;
    background:
      radial-gradient(circle at 15% 20%, rgba(20, 184, 166, 0.12), transparent 30%),
      radial-gradient(circle at 90% 15%, rgba(245, 158, 11, 0.12), transparent 28%);
    opacity: 0.9;
  }

  #theme-simple .simple-article-shell {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  #theme-simple .simple-article-shell-wide {
    max-width: 1180px;
  }

  #theme-simple .simple-article-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: clamp(2rem, 6vw, 5.5rem);
    border: 1px solid var(--article-border);
    border-radius: 2rem 2rem 1.25rem 1.25rem;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.97), rgba(239, 248, 246, 0.9)),
      #fff;
    box-shadow: 0 1.5rem 4rem rgba(20, 35, 38, 0.08);
  }

  #theme-simple .simple-article-hero::after {
    content: '';
    position: absolute;
    z-index: -1;
    right: -5rem;
    bottom: -7rem;
    width: 18rem;
    height: 18rem;
    border: 1px solid rgba(15, 118, 110, 0.18);
    border-radius: 50%;
    box-shadow: 0 0 0 2rem rgba(15, 118, 110, 0.04), 0 0 0 4rem rgba(15, 118, 110, 0.025);
  }

  #theme-simple .simple-article-kicker {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.65rem;
    color: var(--article-accent);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    line-height: 1.4;
    text-transform: uppercase;
  }

  #theme-simple .simple-article-kicker-mark {
    display: inline-block;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    background: #f59e0b;
    box-shadow: 0 0 0 0.35rem rgba(245, 158, 11, 0.15);
  }

  #theme-simple .simple-article-kicker-divider {
    color: rgba(20, 35, 38, 0.3);
  }

  #theme-simple .simple-article-kicker-link {
    color: inherit;
    text-decoration: none;
    transition: color 160ms ease;
  }

  #theme-simple .simple-article-kicker-link:hover {
    color: #115e59;
  }

  #theme-simple .simple-article-title {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    max-width: 56rem;
    margin: 1.35rem 0 1.25rem;
    color: var(--article-ink);
    font-size: clamp(2.5rem, 6vw, 5.25rem);
    font-weight: 800;
    letter-spacing: -0.065em;
    line-height: 0.98;
    overflow-wrap: anywhere;
  }

  #theme-simple .simple-article-title-icon {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 0.25rem;
    border: 1px solid rgba(15, 118, 110, 0.16);
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.7);
    font-size: 1.45rem;
    line-height: 1;
  }

  #theme-simple .simple-article-title-icon > * {
    margin: 0;
  }

  #theme-simple .simple-article-summary {
    max-width: 48rem;
    margin: 0;
    color: var(--article-muted);
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.8;
  }

  #theme-simple .simple-article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1rem;
    align-items: center;
    margin-top: 2rem;
    padding-top: 1.15rem;
    border-top: 1px solid rgba(20, 35, 38, 0.12);
    color: var(--article-muted);
    font-size: 0.78rem;
    line-height: 1.5;
  }

  #theme-simple .simple-article-meta-item {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    white-space: nowrap;
  }

  #theme-simple .simple-article-meta-item i {
    color: var(--article-accent);
  }

  #theme-simple .simple-article-meta-item-link {
    color: inherit;
    text-decoration: none;
  }

  #theme-simple .simple-article-meta-item-link:hover {
    color: var(--article-accent);
  }

  #theme-simple .simple-article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    align-items: center;
    margin-top: 1.2rem;
  }

  #theme-simple .simple-article-tags-label {
    margin-right: 0.15rem;
    color: var(--article-muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  #theme-simple .simple-article-tag {
    padding: 0.3rem 0.65rem;
    border: 1px solid rgba(15, 118, 110, 0.16);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.6);
    color: var(--article-accent);
    font-size: 0.75rem;
    text-decoration: none;
    transition: all 160ms ease;
  }

  #theme-simple .simple-article-tag:hover {
    border-color: var(--article-accent);
    background: var(--article-accent);
    color: white;
  }

  #theme-simple .simple-article-author {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-top: 2rem;
    color: var(--article-ink);
    font-size: 0.82rem;
    font-weight: 700;
  }

  #theme-simple .simple-article-author-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 50%;
    background: var(--article-ink);
    color: white;
    font-size: 0.75rem;
  }

  #theme-simple .simple-article-author-caption {
    color: var(--article-muted);
    font-weight: 500;
  }

  #theme-simple .simple-article-lead-line {
    width: 4.5rem;
    height: 0.35rem;
    margin: 1.2rem 0 0 2rem;
    border-radius: 999px;
    background: linear-gradient(90deg, #f59e0b, var(--article-accent));
  }

  #theme-simple .simple-article-content {
    position: relative;
    z-index: 2;
    max-width: 880px;
    margin: -0.15rem auto 0;
    padding: clamp(1.3rem, 5vw, 4.5rem);
    border: 1px solid var(--article-border);
    border-radius: 1.25rem;
    background: var(--article-surface);
    box-shadow: 0 1.2rem 3rem rgba(20, 35, 38, 0.06);
  }

  #theme-simple .simple-article-content #notion-article,
  #theme-simple .simple-article-content .notion,
  #theme-simple .simple-article-content .notion-page-content-inner {
    max-width: 100%;
  }

  #theme-simple .simple-article-content .notion {
    font-size: clamp(1rem, 1.3vw, 1.1rem);
    line-height: 1.9;
  }

  #theme-simple .simple-article-content .notion h1,
  #theme-simple .simple-article-content .notion h2,
  #theme-simple .simple-article-content .notion h3,
  #theme-simple .simple-article-content .notion h4 {
    scroll-margin-top: 5rem;
    color: var(--article-ink);
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  #theme-simple .simple-article-content .notion h1 {
    margin-top: 2.5rem;
    font-size: clamp(1.8rem, 3vw, 2.45rem);
  }

  #theme-simple .simple-article-content .notion h2 {
    margin-top: 2.25rem;
    font-size: clamp(1.45rem, 2.5vw, 1.95rem);
  }

  #theme-simple .simple-article-content .notion h3,
  #theme-simple .simple-article-content .notion h4 {
    margin-top: 1.75rem;
    font-size: clamp(1.2rem, 2vw, 1.5rem);
  }

  #theme-simple .simple-article-content .notion a {
    color: var(--article-accent);
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
  }

  #theme-simple .simple-article-content .notion blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.25rem;
    border-left: 0.25rem solid #f59e0b;
    border-radius: 0 0.75rem 0.75rem 0;
    background: rgba(245, 158, 11, 0.08);
    color: var(--article-muted);
  }

  #theme-simple .simple-article-content .notion img {
    border-radius: 0.9rem;
  }

  #theme-simple .simple-article-content .notion .notion-code,
  #theme-simple .simple-article-content .notion pre {
    border: 1px solid rgba(20, 35, 38, 0.12);
    border-radius: 0.9rem;
  }

  #theme-simple .simple-article-aftercare {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 880px;
    margin: 2rem auto 0;
  }

  #theme-simple .simple-article-share {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid var(--article-border);
    border-bottom: 1px solid var(--article-border);
  }

  #theme-simple .simple-article-share > .m-1 {
    margin: 0;
  }

  #theme-simple .simple-article-section-eyebrow {
    flex: 0 0 auto;
    color: var(--article-accent);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  #theme-simple .simple-article-around {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  #theme-simple .simple-article-around-link {
    display: flex;
    min-height: 7rem;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.1rem 1.25rem;
    border: 1px solid var(--article-border);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.56);
    color: var(--article-ink);
    text-decoration: none;
    transition: all 180ms ease;
  }

  #theme-simple .simple-article-around-link:hover {
    border-color: rgba(15, 118, 110, 0.45);
    transform: translateY(-0.15rem);
  }

  #theme-simple .simple-article-around-link-next {
    align-items: flex-end;
    text-align: right;
  }

  #theme-simple .simple-article-around-label {
    color: var(--article-muted);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  #theme-simple .simple-article-around-title {
    display: -webkit-box;
    overflow: hidden;
    color: var(--article-ink);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.45;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  #theme-simple .simple-article-related {
    padding: 1.4rem;
    border: 1px solid var(--article-border);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.56);
  }

  #theme-simple .simple-article-related-heading h2 {
    margin: 0.35rem 0 0;
    color: var(--article-ink);
    font-size: 1.25rem;
    font-weight: 800;
  }

  #theme-simple .simple-article-related-list {
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
  }

  #theme-simple .simple-article-related-list li {
    border-top: 1px solid var(--article-border);
  }

  #theme-simple .simple-article-related-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 0;
    color: var(--article-ink);
    font-size: 0.9rem;
    text-decoration: none;
  }

  #theme-simple .simple-article-related-link:hover {
    color: var(--article-accent);
  }

  #theme-simple .simple-article-related-link i {
    flex: 0 0 auto;
    color: var(--article-accent);
    font-size: 0.75rem;
  }

  #theme-simple .simple-article-comments {
    padding-top: 0.5rem;
    border-top: 1px solid var(--article-border);
  }

  #theme-simple .simple-article-comments > .comment {
    margin-top: 1rem;
  }

  #theme-simple .simple-article-lock {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: min(62vh, 38rem);
    padding: 2rem 1rem 5rem;
  }

  #theme-simple .simple-article-lock-card {
    width: min(100%, 31rem);
    padding: clamp(1.75rem, 6vw, 3.25rem);
    border: 1px solid var(--article-border);
    border-radius: 1.5rem;
    background: var(--article-surface);
    box-shadow: 0 1.5rem 4rem rgba(20, 35, 38, 0.08);
    text-align: center;
  }

  #theme-simple .simple-article-lock-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1.1rem;
    background: rgba(15, 118, 110, 0.1);
    color: var(--article-accent);
    font-size: 1.35rem;
  }

  #theme-simple .simple-article-lock-eyebrow {
    margin: 1.4rem 0 0;
    color: var(--article-accent);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.18em;
  }

  #theme-simple .simple-article-lock-title {
    margin: 0.65rem 0 0;
    color: var(--article-ink);
    font-size: clamp(1.35rem, 4vw, 1.8rem);
    font-weight: 800;
    line-height: 1.35;
  }

  #theme-simple .simple-article-lock-description {
    margin: 0.8rem auto 0;
    color: var(--article-muted);
    font-size: 0.9rem;
    line-height: 1.7;
  }

  #theme-simple .simple-article-lock-form {
    display: flex;
    gap: 0.55rem;
    margin-top: 1.5rem;
  }

  #theme-simple .simple-article-lock-input {
    min-width: 0;
    flex: 1;
    height: 3rem;
    padding: 0 1rem;
    border: 1px solid var(--article-border);
    border-radius: 0.75rem;
    outline: none;
    background: rgba(255, 255, 255, 0.72);
    color: var(--article-ink);
    transition: border-color 160ms ease, box-shadow 160ms ease;
  }

  #theme-simple .simple-article-lock-input:focus {
    border-color: var(--article-accent);
    box-shadow: 0 0 0 0.2rem rgba(15, 118, 110, 0.13);
  }

  #theme-simple .simple-article-lock-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-width: 6rem;
    height: 3rem;
    padding: 0 1rem;
    border: 0;
    border-radius: 0.75rem;
    background: var(--article-ink);
    color: white;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 700;
    transition: background 160ms ease, transform 160ms ease;
  }

  #theme-simple .simple-article-lock-submit:hover {
    background: var(--article-accent);
    transform: translateY(-0.1rem);
  }

  #theme-simple .simple-article-lock-error {
    margin: 0.9rem 0 0;
    color: #dc2626;
    font-size: 0.8rem;
  }

  .dark #theme-simple .simple-article-page {
    --article-ink: #e6f0ee;
    --article-muted: #9aadaa;
    --article-border: rgba(230, 240, 238, 0.14);
    --article-surface: rgba(17, 29, 31, 0.92);
    --article-accent: #5eead4;
  }

  .dark #theme-simple .simple-article-hero {
    background:
      linear-gradient(135deg, rgba(19, 43, 42, 0.96), rgba(14, 24, 27, 0.97)),
      #111d1f;
    box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.26);
  }

  .dark #theme-simple .simple-article-title-icon,
  .dark #theme-simple .simple-article-tag,
  .dark #theme-simple .simple-article-around-link,
  .dark #theme-simple .simple-article-related {
    background: rgba(255, 255, 255, 0.04);
  }

  .dark #theme-simple .simple-article-lock-input {
    background: rgba(255, 255, 255, 0.06);
  }

  @media (max-width: 767px) {
    #theme-simple .simple-article-shell {
      padding: 0 0.65rem;
    }

    #theme-simple .simple-article-hero {
      border-radius: 1.35rem 1.35rem 0.9rem 0.9rem;
    }

    #theme-simple .simple-article-title {
      font-size: clamp(2.25rem, 12vw, 3.5rem);
    }

    #theme-simple .simple-article-title-icon {
      width: 2.15rem;
      height: 2.15rem;
      font-size: 1.1rem;
    }

    #theme-simple .simple-article-lead-line {
      margin-left: 1rem;
    }

    #theme-simple .simple-article-content {
      padding: 1.25rem 1rem;
    }

    #theme-simple .simple-article-share {
      align-items: flex-start;
      flex-direction: column;
    }

    #theme-simple .simple-article-around {
      grid-template-columns: 1fr;
    }

    #theme-simple .simple-article-around-link-next {
      align-items: flex-start;
      text-align: left;
    }

    #theme-simple .simple-article-lock-form {
      flex-direction: column;
    }

    #theme-simple .simple-article-lock-submit {
      width: 100%;
    }
  }


  /*  菜单下划线动画 */
  #theme-simple .menu-link {
      text-decoration: none;
      background-image: linear-gradient(#dd3333, #dd3333);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 0 2px;
      transition: background-size 100ms ease-in-out;
  }

  #theme-simple .menu-link:hover {
      background-size: 100% 2px;
      color: #dd3333;
      cursor: pointer;
  }




      ${themeConsoleStyle('simple', CONFIG)}
  `}</style>
}

export { Style }
