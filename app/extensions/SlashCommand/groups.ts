import type { Editor } from '@tiptap/core'
import { hasExtension } from '../../utils'
import { AllEmbedServices } from '../Iframe/embed'
import type { Group } from './types'

export function renderGroups(editor: Editor) {
  const groups: Group[] = [
    {
      name: 'format',
      title: 'editor.slash.format',
      commands: [
        {
          name: 'paragraph',
          label: 'Texte',
          description: 'Ajouter un texte',
          aliases: ['p', 'paragraph', 'texte'],
          iconName: 'i-lucide-case-sensitive',
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
          },
        },
        {
          name: 'heading1',
          label: 'editor.heading.h1.tooltip',
          aliases: ['h1', 'bt', 'bt1'],
          iconName: 'i-lucide-heading-1',
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run()
          },
        },
        {
          name: 'heading2',
          label: 'editor.heading.h2.tooltip',
          aliases: ['h2', 'bt', 'bt2'],
          iconName: 'i-lucide-heading-2',
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
          },
        },
        {
          name: 'heading3',
          label: 'editor.heading.h3.tooltip',
          aliases: ['h3', 'bt', 'bt3'],
          iconName: 'i-lucide-heading-3',
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
          },
        },
        {
          name: 'bulletList',
          label: 'editor.bulletlist.tooltip',
          aliases: ['ul', 'yxlb'],
          iconName: 'i-lucide-list',
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run()
          },
        },
        {
          name: 'numberedList',
          label: 'editor.orderedlist.tooltip',
          aliases: ['ol', 'yxlb'],
          iconName: 'i-lucide-list-ordered',
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run()
          },
        },
        {
          name: 'taskList',
          label: 'editor.tasklist.tooltip',
          iconName: 'i-lucide-list-todo',
          description: 'Task list with todo items',
          aliases: ['todo'],
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleTaskList().run()
          },
        },
        {
          name: 'blockquote',
          label: 'editor.blockquote.tooltip',
          description: 'Blockquote with citation',
          aliases: ['yr'],
          iconName: 'i-lucide-text-quote',
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setBlockquote().run()
          },
        },
        {
          name: 'codeBlock',
          label: 'editor.codeblock.tooltip',
          iconName: 'i-lucide-code-xml',
          description: 'Code block with syntax highlighting',
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setCodeBlock().run()
          },
        },
      ],
    },
    {
      name: 'insert',
      title: 'editor.slash.insert',
      commands: [
        {
          name: 'image',
          label: 'editor.image.tooltip',
          iconName: 'i-lucide-image-up',
          description: 'Insert a image',
          aliases: ['image', 'tp', 'tupian'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setImageUpload().run()
          },
        },
        {
          name: 'tableOfContents',
          label: 'editor.tableOfContents.tooltip',
          iconName: 'i-lucide-book-marked',
          description: 'Insert a table of contents',
          aliases: ['toc', 'tableofcontents', 'sommaire'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setTableOfContents().run()
          },
        },
        {
          name: 'table',
          label: 'editor.table.tooltip',
          iconName: 'i-lucide-table',
          description: 'Insert a table',
          aliases: ['table', 'bg', 'biaoge', 'biao'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
          },
        },
        {
          name: 'columns',
          label: 'editor.columns.tooltip',
          iconName: 'i-lucide-columns-2',
          description: 'Add two column content',
          aliases: ['columns', 'cols', '2cols'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor
              .chain()
              .deleteRange(range)
              .setColumns()
              .focus(editor.state.selection.head - 1)
              .run()
          },
        },
        {
          name: 'paper',
          label: 'editor.paper.tooltip',
          iconName: 'i-lucide-brush',
          description: 'Insert a paper',
          aliases: ['paper', 'zhi', 'dessiner', 'brush', 'draw'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setPaper().run()
          },
        },
        {
          name: 'details',
          label: 'editor.details.tooltip',
          iconName: 'i-lucide-list-collapse',
          description: 'Insert a details',
          aliases: ['details'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setDetails().run()
          },
        },
        {
          name: 'alert',
          label: 'editor.alert.tooltip',
          iconName: 'i-lucide-sticky-note',
          description: 'Insert a alert',
          aliases: ['note', 'alert', 'alerte'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setAlert().run()
          },
        },
        {
          name: 'horizontalRule',
          label: 'editor.horizontalrule.tooltip',
          iconName: 'i-lucide-minus',
          description: 'Insert a horizontal divider',
          aliases: ['règle', 'regle', 'ligne', 'trait', 'horizontal', 'horizontale', 'hr', 'fgx', 'fg'],
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHorizontalRule().run()
          },
        },
        {
          name: 'video',
          label: 'editor.video.tooltip',
          iconName: 'i-lucide-video',
          description: 'Insert a video',
          aliases: ['video', 'sp', 'shipin'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setVideoUpload().run()
          },
        }/*,
        {
          name: 'Twitter',
          label: 'Twitter',
          iconName: 'i-lucide-twitter',
          description: 'Insert a Twitter post',
          aliases: ['twitter'],
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setTwitterUpload().run()
          },
        },*/
      ],
    },
  ]
  const hasAI = hasExtension(editor, 'Ai')
  // const hasIframes = hasExtension(editor, 'iframes')
  const hasIframes = false
  if (hasAI) {
    groups.unshift({
      name: 'ai',
      title: 'AI',
      commands: [
        {
          name: 'aiWriter',
          label: 'Complétez avec l\'IA',
          iconName: 'i-lucide-wand-sparkles',
          description: 'Let AI finish your thoughts',
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).activateMagic().run()
          },
        },
      ],
    })
  }
  if (hasIframes) {
    groups.push({
      name: 'others',
      title: 'editor.slash.embed',
      commands: AllEmbedServices.map(item => ({
        name: item.value,
        label: item.label,
        iconName: item.icon,
        aliases: [item.value, item.label],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: ({ editor, range }) => {
          editor
            .chain()
            .deleteRange(range)
            .focus()
            .setIframe({
              src: '',
              service: item.value,
            })
            .run()
        },
      })),
    })
  }
  return groups
}
