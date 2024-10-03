import { Node } from '@tiptap/core'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface ClearOptions extends GeneralOptions<ClearOptions> {}

export const Clear = Node.create<ClearOptions>({
  name: 'clear',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
          disabled: !editor.can().chain().focus().clearNodes().unsetAllMarks().run(),
          icon: 'i-lucide-eraser',
          tooltip: t('editor.clear.tooltip'),
        },
      }),
    }
  },
})
