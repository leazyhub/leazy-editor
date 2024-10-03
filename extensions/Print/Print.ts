import { Extension } from '@tiptap/core'
import { printEditorContent } from '../../utils/print'
import ActionButton from '../../components/ActionButton.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    print: {
      print: () => ReturnType
    }
  }
}

export const Print = Extension.create({
  name: 'print',

  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.print(),
          icon: 'i-lucide-printer',
          shortcuts: ['mod', 'P'],
          tooltip: t('editor.print.tooltip'),
        }
      })
    }
  },

  addCommands() {
    return {
      print: () => ({ view }) => printEditorContent(view)
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-p': () => this.editor.commands.print()
    }
  }
})
