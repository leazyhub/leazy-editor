import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import type { GeneralOptions } from '../../types'
import AlertComponent from './components/Alert.vue'
import ActionAlertButton from './components/ActionAlertButton.vue'

export interface AlertOptions extends GeneralOptions<AlertOptions> {
  type: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    alert: {
      /**
       * Add an alert
       *
       * @param attributes - The alert attributes
       */
      setAlert: (attributes: { type: string }) => ReturnType,
      /**
       * Set the alert type
       *
       * @param type - The alert type
       */
      setAlertType: (type: string) => ReturnType,
    }
  }
}

export const Alert = Node.create<AlertOptions>({
  name: 'alert',

  group: 'block',

  defining: true,

  isolating: true,
  // content: 'block+',

  content: 'inline*',

  addAttributes() {
    return {
      type: {
        default: 'note',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="alert"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'alert' }), 0]
  },

  addCommands() {
    return {
      setAlert: (attributes) => ({ commands }) => {
        return commands.setNode(this.name, attributes)
      },
      setAlertType: (type: string) => ({ commands }) => {
        return commands.updateAttributes(this.name, { type })
      }
    }
  },

  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => {
        return {
          component: ActionAlertButton,
          componentProps: {
            editor,
            icon: 'i-fluent-note-24-regular',
            tooltip: t('editor.alert.tooltip'),
          },
        }
      }
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(AlertComponent)
  },
})
