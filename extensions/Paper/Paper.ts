import { mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import ActionButton from '../../components/ActionButton.vue'
import PaperComponent from './components/Paper'

export const Paper = Node.create({
  name: 'paper',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.setPaper(),
          isActive: () => editor.isActive('paper') || false,
          disabled: !editor.can().setPaper(),
          icon: 'i-lucide-brush',
          tooltip: t('editor.paper.tooltip'),
        }
      })
    }
  },

  addAttributes() {
    return {
      lines: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="paper"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'paper' })]
  },

  addCommands() {
    return {
      setPaper: (lines) => ({ tr, commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { lines },
        })
      },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(PaperComponent)
  },
})
