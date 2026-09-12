const text = value => [[String(value)]]

/**
 * 本地 mock 文章的完整内容块。
 * 用 Notion block 结构覆盖详情页常见内容，方便在没有连接 Notion 时做渲染回归。
 */
export function createMockArticleBlockMap(page) {
  let sequence = 0
  const blocks = {}
  const root = {
    id: page.id,
    type: 'page',
    parent_id: 'mock-site',
    content: [],
    properties: { title: text(page.title) }
  }

  blocks[page.id] = { value: root }

  const add = (type, properties = {}, options = {}) => {
    const { parentId = page.id, format, content } = options
    const id = `${page.id}-${type}-${++sequence}`
    const value = {
      id,
      type,
      parent_id: parentId
    }

    if (Object.keys(properties).length > 0) value.properties = properties
    if (format) value.format = format
    if (content) value.content = content

    blocks[id] = { value }
    const parent = blocks[parentId]?.value
    if (Array.isArray(parent?.content)) parent.content.push(id)
    return id
  }

  const addHeading = (level, title, options = {}) => {
    const typeMap = {
      h1: 'header',
      h2: 'sub_header',
      h3: 'sub_sub_header',
      h4: 'header_4'
    }
    return add(typeMap[level] || 'sub_header', { title: text(title) }, options)
  }

  const addText = (value, options = {}) =>
    add('text', { title: text(value) }, options)

  const addCode = (language, lines, options = {}) =>
    add(
      'code',
      {
        title: text(lines.join('\n')),
        language: text(language)
      },
      options
    )

  const addImage = (source, caption) =>
    add('image', {
      source: text(source),
      title: text(caption)
    })

  addHeading('h1', '基本段落')
  addText('这是用于验证 Notion 内容渲染的本地测试文章。')
  add('quote', { title: text('书中自有黄金屋，书中自有颜如玉。') })
  add(
    'callout',
    {
      title: text(
        '生活的意义并不是与他人争高下，而在于享受努力实现目标的过程。'
      )
    },
    {
      format: {
        page_icon: '💡',
        block_color: 'gray_background'
      }
    }
  )

  addHeading('h2', '将进酒')
  addText('李白〔唐代〕')
  addText('君不见黄河之水天上来，奔流到海不复回。')
  addText('君不见高堂明镜悲白发，朝如青丝暮成雪。')

  addHeading('h1', '特殊段落')
  addHeading('h2', '代码')
  addCode('bash', ['#!/usr/bin/env bash', 'echo "Hello, Kuoyio Blog"'])
  addCode('java', [
    'public class HelloBlog {',
    '  public static void main(String[] args) {',
    '    System.out.println("Hello, Kuoyio Blog");',
    '  }',
    '}'
  ])
  addCode('python', [
    'from dataclasses import dataclass',
    '',
    '@dataclass',
    'class Article:',
    '    title: str',
    '',
    'print(Article("Notion 内容测试"))'
  ])
  addCode('r', ['scores <- c(9.2, 8.8, 9.5)', 'mean(scores)'])
  addCode('css', [
    '.article {',
    '  color: #171717;',
    '  background: transparent;',
    '}'
  ])
  addCode('cpp', [
    '#include <iostream>',
    'int main() {',
    '  std::cout << "Kuoyio" << std::endl;',
    '}'
  ])
  addCode('csharp', [
    'using System;',
    'Console.WriteLine("Notion content test");'
  ])
  addCode('nasm', ['section .text', 'global _start', '_start:'])

  addHeading('h2', '公式与化学方程式')
  add('equation', { title: text('E = mc^2') })
  add('equation', { title: text('\\ce{H2O -> H+ + OH-}') })

  addHeading('h2', '流程图')
  addCode('mermaid', [
    'graph LR',
    '  A[写作] --> B[Notion]',
    '  B --> C[博客展示]',
    '  C --> D[读者反馈]'
  ])

  addHeading('h2', '表格')
  const columnOrder = ['test-column-name', 'test-column-value']
  const tableId = add(
    'table',
    {},
    {
      format: {
        table_block_column_order: columnOrder,
        table_block_column_header: true,
        table_block_row_header: false,
        table_block_column_format: {
          [columnOrder[0]]: { width: 180 },
          [columnOrder[1]]: { width: 240 }
        }
      },
      content: []
    }
  )
  add(
    'table_row',
    {
      [columnOrder[0]]: text('内容类型'),
      [columnOrder[1]]: text('测试状态')
    },
    { parentId: tableId }
  )
  add(
    'table_row',
    {
      [columnOrder[0]]: text('标题、段落、引用'),
      [columnOrder[1]]: text('已覆盖')
    },
    { parentId: tableId }
  )
  add(
    'table_row',
    {
      [columnOrder[0]]: text('代码、公式、图表'),
      [columnOrder[1]]: text('已覆盖')
    },
    { parentId: tableId }
  )

  addHeading('h2', '附件与媒体')
  addText('下面的图片、PDF、下载文件、网页和视频用于验证媒体内容的渲染。')
  addImage('/images/feature-1.webp', '本地图片测试')
  add('pdf', {
    source: text(
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ),
    title: text('PDF 测试文件')
  })
  add('file', {
    source: text('https://example.com/kuoyio-content-test.txt'),
    title: text('下载测试附件')
  })
  add('bookmark', {
    link: text('https://notionnext.tangly1024.com/'),
    title: text('NotionNext 文档'),
    description: text('嵌入网页链接测试')
  })
  add(
    'embed',
    {
      source: text('https://notionnext.tangly1024.com/'),
      title: text('嵌入网页测试')
    },
    {
      format: {
        display_source: 'https://notionnext.tangly1024.com/',
        block_height: 360
      }
    }
  )
  add(
    'video',
    {
      source: text('https://www.youtube.com/embed/dQw4w9WgXcQ'),
      title: text('视频测试')
    },
    {
      format: {
        display_source: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        block_height: 320
      }
    }
  )

  addHeading('h2', '待办与折叠')
  add('to_do', {
    title: text('检查文章目录是否可以点击跳转'),
    checked: text('Yes')
  })
  add('to_do', { title: text('补充真实 Notion 文章内容'), checked: text('No') })

  const toggleId = add(
    'toggle',
    { title: text('展开查看折叠内容') },
    { content: [] }
  )
  addText('折叠内容也应该能够正常显示，并且不会破坏文章目录。', {
    parentId: toggleId
  })
  addHeading('h3', '折叠内容中的小标题', { parentId: toggleId })
  addText('这是多级内容测试。', { parentId: toggleId })

  add('table_of_contents')

  addHeading('h1', '多级标题与列表')
  addHeading('h2', '二级标题')
  addHeading('h3', '三级标题')
  addHeading('h4', '四级标题')
  const nestedBulletId = add(
    'bulleted_list',
    {
      title: text('一级无序列表')
    },
    { content: [] }
  )
  add(
    'bulleted_list',
    { title: text('二级无序列表') },
    {
      parentId: nestedBulletId
    }
  )
  add('bulleted_list', { title: text('另一个一级无序列表') })
  add('numbered_list', { title: text('一级有序列表') })
  add('numbered_list', { title: text('第二项有序列表') })

  addHeading('h2', '同步块与分隔线')
  const syncedBlockId = add('transclusion_container', {}, { content: [] })
  addText('这是同步块中的测试内容。', { parentId: syncedBlockId })
  add('divider')

  addHeading('h2', '测试结论')
  addText(
    '如果以上内容均能正常显示，说明文章详情页的基础 Notion 渲染链路已经可以继续接入真实文章。'
  )

  return {
    block: blocks,
    collection: {},
    collection_view: {},
    collection_query: {},
    signed_urls: {}
  }
}
