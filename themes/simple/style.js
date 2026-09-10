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

  /* Minimal article detail */
  #theme-simple .simple-article-page {
    --article-ink: #171717;
    --article-muted: #77736d;
    --article-border: #dedbd5;
    --article-accent: #bd3b31;
    padding: clamp(2.75rem, 7vw, 5.5rem) 0 6rem;
    background: #fcfbf8;
  }

  #theme-simple .simple-article-page::before,
  #theme-simple .simple-article-hero::after {
    display: none;
  }

  #theme-simple .simple-article-shell,
  #theme-simple .simple-article-shell-wide {
    max-width: 820px;
    padding: 0 1.25rem;
  }

  #theme-simple .simple-article-hero {
    padding: 0 0 2.25rem;
    border: 0;
    border-bottom: 1px solid var(--article-border);
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  #theme-simple .simple-article-kicker {
    gap: 0.5rem;
    color: var(--article-muted);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: none;
  }

  #theme-simple .simple-article-kicker-mark {
    width: 0.38rem;
    height: 0.38rem;
    background: var(--article-accent);
    box-shadow: none;
  }

  #theme-simple .simple-article-kicker-divider {
    color: #b9b4ac;
  }

  #theme-simple .simple-article-kicker-link,
  #theme-simple .simple-article-kicker-link:hover {
    color: inherit;
  }

  #theme-simple .simple-article-title {
    display: block;
    max-width: 46rem;
    margin: 1.25rem 0 1rem;
    color: var(--article-ink);
    font-size: clamp(2.35rem, 6vw, 4.8rem);
    font-weight: 700;
    letter-spacing: -0.065em;
    line-height: 1.02;
  }

  #theme-simple .simple-article-summary {
    max-width: 42rem;
    color: var(--article-muted);
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    line-height: 1.75;
  }

  #theme-simple .simple-article-meta {
    gap: 0.45rem 1rem;
    margin-top: 1.4rem;
    padding-top: 0;
    border-top: 0;
    color: var(--article-muted);
    font-size: 0.75rem;
  }

  #theme-simple .simple-article-meta-item {
    gap: 0;
  }

  #theme-simple .simple-article-meta-item:not(:last-child)::after {
    content: '·';
    margin-left: 1rem;
    color: #b9b4ac;
  }

  #theme-simple .simple-article-tags {
    gap: 0.35rem;
    margin-top: 1rem;
  }

  #theme-simple .simple-article-tag {
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: var(--article-accent);
    font-size: 0.75rem;
  }

  #theme-simple .simple-article-tag:not(:last-child)::after {
    content: ',';
    color: var(--article-muted);
  }

  #theme-simple .simple-article-tag:hover {
    border: 0;
    background: transparent;
    color: var(--article-ink);
  }

  #theme-simple .simple-article-author,
  #theme-simple .simple-article-lead-line {
    display: none;
  }

  #theme-simple .simple-article-content,
  #theme-simple .simple-article-aftercare {
    max-width: 740px;
  }

  #theme-simple .simple-article-content {
    margin: 3.25rem auto 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  #theme-simple .simple-article-content .notion {
    color: var(--article-ink);
    font-size: 1.06rem;
    line-height: 1.9;
  }

  #theme-simple .simple-article-content .notion h1,
  #theme-simple .simple-article-content .notion h2,
  #theme-simple .simple-article-content .notion h3,
  #theme-simple .simple-article-content .notion h4 {
    color: var(--article-ink);
    font-weight: 700;
    letter-spacing: -0.035em;
  }

  #theme-simple .simple-article-content .notion h1 {
    margin-top: 3rem;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
  }

  #theme-simple .simple-article-content .notion h2 {
    margin-top: 2.75rem;
    font-size: clamp(1.45rem, 3vw, 2rem);
  }

  #theme-simple .simple-article-content .notion h3,
  #theme-simple .simple-article-content .notion h4 {
    margin-top: 2rem;
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  }

  #theme-simple .simple-article-content .notion > :first-child,
  #theme-simple .simple-article-content .notion-page-content-inner > :first-child {
    margin-top: 0;
  }

  #theme-simple .simple-article-content .notion blockquote {
    margin: 1.75rem 0;
    padding: 0 0 0 1.25rem;
    border-left: 2px solid var(--article-accent);
    border-radius: 0;
    background: transparent;
    color: var(--article-muted);
  }

  #theme-simple .simple-article-content .notion img {
    border-radius: 0.35rem;
  }

  #theme-simple .simple-article-content .notion .notion-code,
  #theme-simple .simple-article-content .notion pre {
    border: 1px solid var(--article-border);
    border-radius: 0.35rem;
  }

  #theme-simple .simple-article-aftercare {
    gap: 2.25rem;
    margin: 3.5rem auto 0;
  }

  #theme-simple .simple-article-share {
    justify-content: flex-start;
    padding: 1rem 0;
    border-top: 1px solid var(--article-border);
    border-bottom: 1px solid var(--article-border);
  }

  #theme-simple .simple-article-section-eyebrow {
    color: var(--article-muted);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  #theme-simple .simple-article-around {
    gap: 1.5rem;
  }

  #theme-simple .simple-article-around-link {
    min-height: 5rem;
    padding: 1rem 0;
    border: 0;
    border-top: 1px solid var(--article-border);
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  #theme-simple .simple-article-around-link:hover {
    border-color: var(--article-border);
    transform: none;
  }

  #theme-simple .simple-article-around-label {
    color: var(--article-muted);
    font-size: 0.68rem;
  }

  #theme-simple .simple-article-around-title {
    color: var(--article-ink);
    font-size: 0.9rem;
  }

  #theme-simple .simple-article-related {
    padding: 1.25rem 0;
    border: 0;
    border-top: 1px solid var(--article-border);
    border-bottom: 1px solid var(--article-border);
    border-radius: 0;
    background: transparent;
  }

  #theme-simple .simple-article-related-heading h2 {
    color: var(--article-ink);
    font-size: 1.15rem;
  }

  #theme-simple .simple-article-related-list {
    margin-top: 0.75rem;
  }

  #theme-simple .simple-article-related-link {
    padding: 0.75rem 0;
    color: var(--article-ink);
  }

  #theme-simple .simple-article-comments {
    padding-top: 1.25rem;
    border-top: 1px solid var(--article-border);
  }

  #theme-simple .simple-article-lock {
    min-height: min(62vh, 38rem);
    padding: 2rem 1rem 5rem;
  }

  #theme-simple .simple-article-lock-card {
    width: min(100%, 28rem);
    padding: 0 1rem;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  #theme-simple .simple-article-lock-icon {
    width: auto;
    height: auto;
    background: transparent;
    color: var(--article-ink);
    font-size: 1rem;
  }

  #theme-simple .simple-article-lock-eyebrow {
    margin-top: 1rem;
    color: var(--article-muted);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
  }

  #theme-simple .simple-article-lock-title {
    color: var(--article-ink);
    font-size: 1.5rem;
  }

  #theme-simple .simple-article-lock-form {
    gap: 0.75rem;
    margin: 1.75rem auto 0;
  }

  #theme-simple .simple-article-lock-input {
    height: 2.75rem;
    padding: 0 0.25rem;
    border: 0;
    border-bottom: 1px solid var(--article-border);
    border-radius: 0;
    background: transparent;
  }

  #theme-simple .simple-article-lock-input:focus {
    border-color: var(--article-accent);
    box-shadow: none;
  }

  #theme-simple .simple-article-lock-submit {
    min-width: 5rem;
    height: 2.75rem;
    border-radius: 0.25rem;
    background: var(--article-ink);
  }

  #theme-simple .simple-article-lock-submit:hover {
    background: var(--article-accent);
    transform: none;
  }

  /* Keep the shared masthead quiet when reading an article. */
  #theme-simple:has(.simple-article-page) #container-wrapper {
    padding-top: 1.5rem;
  }

  #theme-simple:has(.simple-article-page) > header {
    height: 14rem;
  }

  #theme-simple:has(.simple-article-page) > header > div {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }

  #theme-simple:has(.simple-article-page) > header img {
    width: 72px;
    height: 72px;
  }

  #theme-simple:has(.simple-article-page) > header .text-2xl {
    font-size: 1.35rem;
  }

  .dark #theme-simple .simple-article-page {
    --article-ink: #f2f0eb;
    --article-muted: #aaa69e;
    --article-border: #363431;
    --article-accent: #e27c70;
    background: #11110f;
  }

  .dark #theme-simple .simple-article-content .notion {
    color: var(--article-ink);
  }

  .dark #theme-simple .simple-article-lock-input {
    background: transparent;
  }

  @media (max-width: 767px) {
    #theme-simple .simple-article-page {
      padding-top: 2.25rem;
    }

    #theme-simple .simple-article-shell,
    #theme-simple .simple-article-shell-wide {
      padding: 0 1rem;
    }

    #theme-simple .simple-article-hero {
      padding-bottom: 1.75rem;
    }

    #theme-simple .simple-article-title {
      font-size: clamp(2.2rem, 12vw, 3.5rem);
    }

    #theme-simple .simple-article-content {
      margin-top: 2.5rem;
    }

    #theme-simple .simple-article-content .notion {
      font-size: 1rem;
    }

    #theme-simple .simple-article-share {
      align-items: flex-start;
      flex-direction: column;
    }

    #theme-simple .simple-article-around {
      grid-template-columns: 1fr;
      gap: 0;
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

  /* Minimal Chinese home page */
  #theme-simple .simple-home-page {
    --home-ink: #171717;
    --home-muted: #77736d;
    --home-border: #dedbd5;
    --home-accent: #bd3b31;
    width: 100%;
    color: var(--home-ink);
    background: #fcfbf8;
  }

  #theme-simple .simple-home-heading,
  #theme-simple .simple-post-list,
  #theme-simple .simple-post-context {
    width: 100%;
    max-width: 820px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  #theme-simple .simple-home-heading {
    display: flex;
    align-items: baseline;
    gap: 0.8rem;
    padding-top: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--home-border);
  }

  #theme-simple .simple-home-heading-label {
    color: var(--home-accent);
    font-size: 0.75rem;
    font-weight: 700;
  }

  #theme-simple .simple-home-heading h1 {
    margin: 0;
    color: var(--home-ink);
    font-size: clamp(1.6rem, 4vw, 2.35rem);
    font-weight: 700;
    letter-spacing: -0.05em;
  }

  #theme-simple .simple-home-heading-count {
    margin-left: auto;
    color: var(--home-muted);
    font-size: 0.75rem;
  }

  #theme-simple .simple-post-list {
    margin-bottom: 4rem;
  }

  #theme-simple .simple-post-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 2rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--home-border);
  }

  #theme-simple .simple-post-item:first-child {
    padding-top: 1.75rem;
  }

  #theme-simple .simple-post-item-main {
    min-width: 0;
  }

  #theme-simple .simple-post-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.45rem;
    color: var(--home-muted);
    font-size: 0.75rem;
    line-height: 1.5;
  }

  #theme-simple .simple-post-meta a {
    color: inherit;
    text-decoration: none;
  }

  #theme-simple .simple-post-meta a:hover {
    color: var(--home-accent);
  }

  #theme-simple .simple-post-private {
    color: var(--home-accent);
  }

  #theme-simple .simple-post-title {
    margin: 0.7rem 0 0.65rem;
    font-size: clamp(1.45rem, 3vw, 2.15rem);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 1.25;
  }

  #theme-simple .simple-post-title a {
    color: var(--home-ink);
    text-decoration: none;
    transition: color 160ms ease;
  }

  #theme-simple .simple-post-title a:hover {
    color: var(--home-accent);
  }

  #theme-simple .simple-post-summary {
    display: -webkit-box;
    max-width: 44rem;
    margin: 0;
    overflow: hidden;
    color: var(--home-muted);
    font-size: 0.95rem;
    line-height: 1.75;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  #theme-simple .simple-post-preview {
    max-height: 13rem;
    overflow: hidden;
    color: var(--home-muted);
    font-size: 0.95rem;
  }

  #theme-simple .simple-post-preview .notion {
    color: inherit;
    line-height: 1.75;
  }

  #theme-simple .simple-post-footer {
    display: flex;
    margin-top: 1rem;
  }

  #theme-simple .simple-post-read {
    color: var(--home-accent);
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
  }

  #theme-simple .simple-post-read:hover {
    color: var(--home-ink);
  }

  #theme-simple .simple-post-cover-link {
    display: block;
    width: 11rem;
    height: 7.25rem;
    overflow: hidden;
    border-radius: 0.25rem;
  }

  #theme-simple .simple-post-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 240ms ease;
  }

  #theme-simple .simple-post-cover-link:hover .simple-post-cover {
    transform: scale(1.03);
  }

  #theme-simple .simple-post-pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--home-border);
    font-size: 0.8rem;
  }

  #theme-simple .simple-post-pagination a {
    padding: 0;
    border: 0;
    color: var(--home-accent);
    text-decoration: none;
  }

  #theme-simple .simple-post-pagination a:hover {
    color: var(--home-ink);
  }

  #theme-simple .simple-post-load-more {
    padding: 1.5rem 0;
    color: var(--home-muted);
    cursor: pointer;
    font-size: 0.8rem;
    text-align: center;
  }

  #theme-simple .simple-post-context {
    padding-top: 1.25rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--home-border);
    color: var(--home-muted);
    font-size: 0.9rem;
  }

  #theme-simple .simple-post-context i {
    color: var(--home-accent);
  }

  /* Shared simple page layout */
  #theme-simple .simple-page-layout {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
  }

  #theme-simple .simple-page-header {
    flex: 0 0 auto;
    width: 100%;
    border-bottom: 1px solid #ececec;
    background: #fff;
  }

  #theme-simple .simple-page-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
    max-width: 1120px;
    min-height: 72px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  #theme-simple .simple-page-brand {
    flex: 0 0 auto;
    color: #111;
    font-family: 'Shrikhand', cursive;
    font-size: 1.35rem;
    font-weight: 400;
    letter-spacing: 0.01em;
    line-height: 1;
    text-decoration: none;
  }

  #theme-simple .simple-page-brand:hover {
    color: #1677ff;
  }

  #theme-simple .simple-page-navigation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
  }

  #theme-simple .simple-page-navigation #nav-menu-pc {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin: 0;
  }

  #theme-simple .simple-page-navigation #nav-menu-pc > div {
    position: relative;
  }

  #theme-simple .simple-page-navigation .menu-link {
    display: inline-flex;
    align-items: center;
    padding: 0;
    color: #111;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.5;
    text-decoration: none;
    background-image: none;
    transition: color 160ms ease;
  }

  #theme-simple .simple-page-navigation .menu-link:hover {
    color: #1677ff;
    background-image: none;
  }

  #theme-simple .simple-page-navigation .menu-link.simple-menu-link-active {
    color: #1677ff;
  }

  #theme-simple .simple-page-navigation #nav-menu-pc .menu-link.simple-menu-link-active::after {
    position: absolute;
    right: 0;
    bottom: -0.5rem;
    left: 0;
    height: 2px;
    background: #1677ff;
    content: '';
  }

  #theme-simple .simple-page-navigation #nav-menu-pc ul {
    top: calc(100% + 0.75rem);
    right: 0;
    min-width: 10rem;
    margin: 0;
    border: 1px solid #ececec;
    box-shadow: 0 0.75rem 2rem rgba(17, 17, 17, 0.08);
  }

  #theme-simple .simple-page-navigation #nav-menu-pc li {
    padding: 0.6rem 0.85rem;
    border-color: #f0f0f0;
  }

  #theme-simple .simple-page-navigation #nav-menu-pc li a {
    color: #111;
    text-decoration: none;
  }

  #theme-simple .simple-page-navigation #nav-menu-pc li a:hover {
    color: #1677ff;
  }

  #theme-simple .simple-page-navigation #nav-menu-mobile {
    position: relative;
    align-items: center;
    margin: 0;
  }

  #theme-simple .simple-page-navigation #nav-menu-mobile > div:first-child {
    color: #111;
    font-size: 0.82rem;
  }

  #theme-simple .simple-page-navigation #nav-menu-mobile > .absolute {
    top: calc(100% + 0.75rem);
    right: 0;
    left: auto;
    width: min(16rem, calc(100vw - 2rem));
    z-index: 50;
  }

  #theme-simple .simple-page-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    min-height: 0;
    background: #fff;
  }

  #theme-simple .simple-page-main > #container-wrapper {
    display: flex;
    align-items: stretch;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 3rem 1.5rem 4rem;
  }

  #theme-simple .simple-page-main > #container-wrapper > [id^='container-inner'] {
    width: 100%;
    min-width: 0;
  }

  #theme-simple .simple-page-main #right-sidebar {
    display: none;
  }

  #theme-simple .simple-page-heading {
    padding-bottom: 2.5rem;
    border-bottom: 1px solid #ececec;
  }

  #theme-simple .simple-page-eyebrow {
    margin: 0 0 0.75rem;
    color: #1677ff;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  #theme-simple .simple-page-heading-row {
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  #theme-simple .simple-page-heading-row h1 {
    margin: 0;
    color: #111;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 1.05;
  }

  #theme-simple .simple-page-heading-count {
    margin-left: auto;
    color: #888;
    font-size: 0.78rem;
  }

  #theme-simple .simple-page-description {
    margin: 0.9rem 0 0;
    color: #777;
    font-size: 0.9rem;
    line-height: 1.7;
  }

  #theme-simple .simple-archive-page {
    width: 100%;
    max-width: 820px;
    margin: 0 auto;
  }

  #theme-simple .simple-archive-groups {
    width: 100%;
  }

  #theme-simple .simple-archive-group {
    display: grid;
    grid-template-columns: 8rem minmax(0, 1fr);
    gap: 2rem;
    padding: 2rem 0;
    border-bottom: 1px solid #ececec;
  }

  #theme-simple .simple-archive-group-title {
    margin: 0;
    color: #111;
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1.3;
  }

  #theme-simple .simple-archive-items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  #theme-simple .simple-archive-item {
    display: grid;
    grid-template-columns: 7rem minmax(0, 1fr);
    gap: 1rem;
    align-items: baseline;
    padding: 0.6rem 0;
  }

  #theme-simple .simple-archive-date {
    color: #888;
    font-size: 0.75rem;
    line-height: 1.6;
  }

  #theme-simple .simple-archive-post {
    display: flex;
    align-items: baseline;
    min-width: 0;
    gap: 0.5rem;
  }

  #theme-simple .simple-archive-link {
    min-width: 0;
    overflow-wrap: anywhere;
    color: #111;
    font-size: 0.95rem;
    line-height: 1.6;
    text-decoration: none;
    transition: color 160ms ease;
  }

  #theme-simple .simple-archive-link:hover {
    color: #1677ff;
  }

  #theme-simple .simple-archive-lock {
    flex: 0 0 auto;
    color: #999;
    font-size: 0.7rem;
  }

  #theme-simple .simple-friend-links-page {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
  }

  #theme-simple .simple-friend-link-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 0;
  }

  #theme-simple .simple-friend-link-card {
    display: block;
    min-width: 0;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: var(--simple-friend-link-color, #1677ff);
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    text-decoration: none;
    transition: all 200ms ease-in-out;
  }

  #theme-simple .simple-friend-link-card:hover,
  #theme-simple .simple-friend-link-card:focus-visible {
    border-color: var(--simple-friend-link-color, #1677ff);
    color: #fff;
    background: var(--simple-friend-link-color, #1677ff);
    box-shadow: 0 2px 20px var(--simple-friend-link-color, #1677ff);
    outline: none;
  }

  #theme-simple .simple-friend-link-card article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 4rem;
    gap: 0 0.5rem;
  }

  #theme-simple .simple-friend-link-card-icon {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    overflow: hidden;
    border: 1px solid var(--simple-friend-link-color, #1677ff);
    border-radius: 50%;
    background: #fafafa;
  }

  #theme-simple .simple-friend-link-card-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #theme-simple .simple-friend-link-card-body {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }

  #theme-simple .simple-friend-link-card-title-row {
    display: flex;
    align-items: baseline;
    max-width: 100%;
  }

  #theme-simple .simple-friend-link-card-title-row h2 {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    color: inherit;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.4;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #theme-simple .simple-friend-link-card p {
    width: 100%;
    margin: 0.15rem 0 0;
    overflow: hidden;
    color: inherit;
    font-size: 0.75rem;
    line-height: 1.4;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
  }

  #theme-simple .simple-friend-links-empty {
    margin: 2rem 0 0;
    padding: 2rem 0;
    border-bottom: 1px solid #ececec;
    color: #888;
    font-size: 0.9rem;
    text-align: center;
  }

  @media (max-width: 767px) {
    #theme-simple .simple-friend-link-grid {
      grid-template-columns: 1fr;
      margin-top: 0;
    }
  }

  @media (min-width: 992px) {
    #theme-simple .simple-friend-link-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  /* Movie records */
  #theme-simple .simple-movie-page {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
  }

  #theme-simple .simple-movie-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  #theme-simple .simple-movie-card {
    min-width: 0;
    overflow: hidden;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
  }

  #theme-simple .simple-movie-card-header {
    position: relative;
    width: 100%;
    height: 320px;
    overflow: hidden;
  }

  #theme-simple .simple-movie-card-poster {
    position: absolute;
    z-index: 2;
    top: 30px;
    right: 0;
    left: 0;
    width: 200px;
    height: 270px;
    margin: 0 auto;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: transform 200ms ease-in-out;
  }

  #theme-simple .simple-movie-card-poster:hover {
    transform: scale(1.05);
  }

  #theme-simple .simple-movie-card-poster-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #theme-simple .simple-movie-card-background {
    position: absolute;
    z-index: 1;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background-position: 50%;
    background-size: cover;
    box-shadow: inset 0 -40px 30px 40px #fff;
    filter: blur(6px);
    transform: scale(1.3);
  }

  #theme-simple .simple-movie-card-content {
    position: relative;
    padding: 16px 32px;
    overflow: hidden;
  }

  #theme-simple .simple-movie-card-name {
    display: flex;
    align-items: baseline;
    justify-content: center;
    min-width: 0;
    overflow: hidden;
    color: #666;
    font-size: 1.1rem;
    letter-spacing: 2px;
    line-height: 1.4;
  }

  #theme-simple .simple-movie-card-name-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #theme-simple .simple-movie-card-name-remark {
    flex: 0 1 auto;
    max-width: 45%;
    margin-top: 4px;
    margin-left: 4px;
    overflow: hidden;
    color: #999;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #theme-simple .simple-movie-card-divider {
    position: relative;
    width: 100px;
    height: 32px;
    margin: 0 auto;
  }

  #theme-simple .simple-movie-card-divider::after {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 1px;
    background: #b1b1b1;
    content: '';
    opacity: 0.5;
  }

  #theme-simple .simple-movie-card-info {
    display: grid;
    gap: 0.45rem;
  }

  #theme-simple .simple-movie-card-info-item {
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
    color: #999;
    font-size: 0.9rem;
    letter-spacing: 1px;
    line-height: 1.4;
    white-space: nowrap;
  }

  #theme-simple .simple-movie-card-info-item i {
    flex: 0 0 1rem;
    width: 1rem;
    color: #999;
    text-align: center;
  }

  #theme-simple .simple-movie-card-info-item span {
    min-width: 0;
    margin-left: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #theme-simple .simple-movie-empty {
    margin: 0;
    padding: 2rem 0;
    border-bottom: 1px solid #ececec;
    color: #888;
    font-size: 0.9rem;
    text-align: center;
  }

  #theme-simple .simple-movie-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 2rem;
    padding-top: 1.25rem;
    border-top: 1px solid #ececec;
  }

  #theme-simple .simple-movie-pagination-pages {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  #theme-simple .simple-movie-pagination-control,
  #theme-simple .simple-movie-pagination-page {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.55rem;
    border: 1px solid #ececec;
    border-radius: 0.25rem;
    color: #666;
    font-size: 0.78rem;
    line-height: 1;
    text-decoration: none;
    transition: border-color 160ms ease, background-color 160ms ease,
      color 160ms ease;
  }

  #theme-simple .simple-movie-pagination-control {
    gap: 0.35rem;
  }

  #theme-simple .simple-movie-pagination-control:hover,
  #theme-simple .simple-movie-pagination-page:hover {
    border-color: #1677ff;
    color: #1677ff;
  }

  #theme-simple .simple-movie-pagination-page.is-active {
    border-color: #1677ff;
    color: #fff;
    background: #1677ff;
  }

  #theme-simple .simple-movie-pagination-page.is-active:hover {
    color: #fff;
  }

  #theme-simple .simple-movie-pagination-control.is-disabled {
    color: #bbb;
    background: #fafafa;
    cursor: default;
  }

  #theme-simple .simple-movie-pagination-ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1rem;
    height: 2rem;
    color: #999;
    font-size: 0.8rem;
  }

  @media (min-width: 576px) {
    #theme-simple .simple-movie-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 992px) {
    #theme-simple .simple-movie-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 575px) {
    #theme-simple .simple-movie-pagination {
      gap: 0.35rem;
    }

    #theme-simple .simple-movie-pagination-control {
      min-width: 1.75rem;
      padding: 0 0.4rem;
    }

    #theme-simple .simple-movie-pagination-control span {
      display: none;
    }
  }

  #theme-simple .simple-site-footer {
    flex-shrink: 0;
    padding: 0 1.5rem;
    border-top: 0 !important;
    border-color: transparent;
    color: #111;
    background: #fff !important;
  }

  #theme-simple .simple-site-footer .simple-footer-theme-control,
  #theme-simple .simple-site-footer .simple-footer-analytics {
    display: none;
  }

  #theme-simple .simple-site-footer .simple-footer-content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
    max-width: none;
    padding: 1.1rem 0 1.25rem;
    color: #111 !important;
    font-size: 0.75rem;
    line-height: 1.6;
  }

  #theme-simple .simple-site-footer .simple-footer-info-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem 0.75rem;
    align-items: center;
    justify-content: center;
    margin: 0;
    color: #111 !important;
    text-align: center;
  }

  #theme-simple .simple-site-footer .simple-footer-copyright,
  #theme-simple .simple-site-footer .simple-footer-beian,
  #theme-simple .simple-site-footer .simple-footer-powered,
  #theme-simple .simple-site-footer .simple-footer-info-row a {
    margin: 0;
    color: #111 !important;
  }

  #theme-simple .simple-site-footer .simple-footer-divider {
    color: #999;
  }

  #theme-simple .simple-site-footer .simple-footer-social-row {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  #theme-simple .simple-site-footer .simple-footer-social-row a {
    color: #111;
    font-size: 1rem;
    line-height: 1;
    transition: color 160ms ease, transform 160ms ease;
  }

  #theme-simple .simple-site-footer .simple-footer-social-row a:hover,
  #theme-simple .simple-site-footer .simple-footer-social-row a:focus-visible {
    color: #1677ff;
    outline: none;
    transform: translateY(-2px) scale(1.08);
  }

  @media (max-width: 767px) {
    #theme-simple .simple-page-header-inner {
      min-height: 64px;
      padding: 0 1rem;
    }

    #theme-simple .simple-page-brand {
      font-size: 1.1rem;
    }

    #theme-simple .simple-page-navigation #nav-menu-pc {
      display: none !important;
    }

    #theme-simple .simple-page-navigation #nav-menu-mobile {
      display: flex !important;
    }

    #theme-simple .simple-page-main > #container-wrapper {
      padding: 2rem 1rem 3rem;
    }

    #theme-simple .simple-page-heading {
      padding-bottom: 1.75rem;
    }

    #theme-simple .simple-archive-group {
      display: block;
      padding: 1.5rem 0;
    }

    #theme-simple .simple-archive-group-title {
      margin-bottom: 0.75rem;
    }

    #theme-simple .simple-archive-item {
      grid-template-columns: 5.5rem minmax(0, 1fr);
      gap: 0.75rem;
    }
  }

  /* Minimal Kuoyio landing page */
  #theme-simple:has(.simple-home-landing),
  .dark #theme-simple:has(.simple-home-landing) {
    min-height: 100svh;
    color: #111;
    background: #fff !important;
  }

  #theme-simple:has(.simple-home-landing) > header,
  #theme-simple:has(.simple-home-landing) > nav,
  #theme-simple:has(.simple-home-landing) .simple-page-header,
  #theme-simple:has(.simple-home-landing) #right-sidebar,
  #theme-simple:has(.simple-home-landing) > .fixed {
    display: none;
  }

  #theme-simple:has(.simple-home-landing) #container-wrapper {
    width: 100%;
    max-width: none;
    min-height: 0;
    margin: 0;
    padding: 0;
    align-items: stretch;
  }

  #theme-simple:has(.simple-home-landing) #container-inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
  }

  #theme-simple:has(.simple-home-landing) #container-inner > *:first-child {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  #theme-simple .simple-home-landing {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-height: calc(100svh - 7rem);
    padding: 4rem 1.5rem 5rem;
    color: #111;
    background: #fff;
  }

  #theme-simple .simple-home-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
    text-align: center;
  }

  #theme-simple .simple-home-identity {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  #theme-simple .simple-home-avatar-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 88px;
    overflow: hidden;
    border: 1px solid #d9d9d9;
    border-radius: 50%;
    background: #fff;
  }

  #theme-simple .simple-home-avatar {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #theme-simple .simple-home-brand {
    margin: 0;
    color: #000;
    font-family: 'Shrikhand', cursive;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 400;
    letter-spacing: 0.01em;
    line-height: 1;
  }

  #theme-simple .simple-home-shortcuts {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-top: 0;
  }

  #theme-simple .simple-home-shortcut {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    color: #111;
    font-size: 1rem;
    text-decoration: none;
    transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
  }

  #theme-simple .simple-home-shortcut:hover,
  #theme-simple .simple-home-shortcut:focus-visible {
    color: #1677ff;
    background: #fff;
    outline: none;
    transform: translateY(-2px) scale(1.08);
  }

  #theme-simple:has(.simple-home-landing) .simple-site-footer {
    flex-shrink: 0;
    padding: 0 1.5rem;
    border-top: 0 !important;
    border-color: transparent;
    color: #111;
    background: #fff !important;
  }

  #theme-simple:has(.simple-home-landing) .simple-footer-theme-control,
  #theme-simple:has(.simple-home-landing) .simple-footer-analytics {
    display: none;
  }

  #theme-simple:has(.simple-home-landing) .simple-footer-content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
    max-width: none;
    padding: 1.1rem 0 1.25rem;
    color: #111 !important;
    font-size: 0.75rem;
    line-height: 1.6;
  }

  #theme-simple:has(.simple-home-landing) .simple-footer-info-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem 0.75rem;
    align-items: center;
    justify-content: center;
    margin: 0;
    color: #111 !important;
    text-align: center;
  }

  #theme-simple:has(.simple-home-landing) .simple-footer-copyright,
  #theme-simple:has(.simple-home-landing) .simple-footer-beian,
  #theme-simple:has(.simple-home-landing) .simple-footer-powered,
  #theme-simple:has(.simple-home-landing) .simple-footer-info-row a {
    margin: 0;
    color: #111 !important;
  }

  #theme-simple:has(.simple-home-landing) .simple-footer-divider {
    color: #999;
  }

  #theme-simple:has(.simple-home-landing) .simple-footer-social-row {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  #theme-simple:has(.simple-home-landing) .simple-footer-social-row a {
    color: #111;
    font-size: 1rem;
    line-height: 1;
    transition: color 160ms ease, transform 160ms ease;
  }

  #theme-simple:has(.simple-home-landing) .simple-footer-social-row a:hover,
  #theme-simple:has(.simple-home-landing) .simple-footer-social-row a:focus-visible {
    color: #1677ff;
    outline: none;
    transform: translateY(-2px) scale(1.08);
  }

  body:has(#theme-simple .simple-home-landing) #draggableBox {
    display: none !important;
  }

  #theme-simple:has(.simple-home-page) #container-wrapper {
    max-width: 860px;
    padding-top: 1.5rem;
  }

  #theme-simple:has(.simple-home-page) #right-sidebar {
    display: none;
  }

  #theme-simple:has(.simple-home-page) > header {
    height: 14rem;
  }

  #theme-simple:has(.simple-home-page) > header > div {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }

  #theme-simple:has(.simple-home-page) > header img {
    width: 72px;
    height: 72px;
  }

  #theme-simple:has(.simple-home-page) > header .text-2xl {
    font-size: 1.35rem;
  }

  #theme-simple:has(.simple-home-page) nav {
    border-top: 0;
    box-shadow: none;
  }

  #theme-simple:has(.simple-home-page) footer {
    background: #fcfbf8;
    border-color: var(--home-border);
    color: var(--home-muted);
  }

  #theme-simple:has(.simple-home-page) footer .text-yellow-300 {
    color: var(--home-muted);
  }

  #theme-simple:has(.simple-home-page) footer a {
    color: inherit;
  }

  .dark #theme-simple .simple-home-page {
    --home-ink: #f2f0eb;
    --home-muted: #aaa69e;
    --home-border: #363431;
    --home-accent: #e27c70;
    background: #11110f;
  }

  .dark #theme-simple:has(.simple-home-page) footer {
    background: #11110f;
  }

  @media (max-width: 767px) {
    #theme-simple .simple-home-heading,
    #theme-simple .simple-post-list,
    #theme-simple .simple-post-context {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    #theme-simple .simple-home-heading {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    #theme-simple .simple-post-item {
      display: block;
      padding: 1.5rem 0;
    }

    #theme-simple .simple-post-item:first-child {
      padding-top: 1.25rem;
    }

    #theme-simple .simple-post-cover-link {
      width: 100%;
      height: 10rem;
      margin-top: 1rem;
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
