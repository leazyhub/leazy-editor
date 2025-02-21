import { mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import ActionButton from '../../components/ActionButton.vue'
import TableOfContentsComponent from './components/TableOfContents'



export const TableOfContents = Node.create({
  name: 'tableOfContents',
  group: 'block',
  atom: true,
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.setTableOfContents(),
          isActive: () => editor.isActive('tableOfContents') || false,
          disabled: !editor.can().setTableOfContents(),
          icon: 'i-lucide-book-marked',
          tooltip: t('editor.tableOfContents.tooltip'),
        }
      })
    }
  },

  parseHTML() {
    return [
      {
        tag: 'toc',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['toc', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(TableOfContentsComponent)
  },

  addCommands() {
    return {
      setTableOfContents: () => ({ tr, commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {},
        })
      },
    }
  }
})
