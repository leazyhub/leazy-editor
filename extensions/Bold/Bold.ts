import { Bold as TiptapBold, type BoldOptions as TiptapImageOptions } from '@tiptap/extension-bold'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface BoldOptions extends TiptapImageOptions, GeneralOptions<BoldOptions> {}

export const Bold = TiptapBold.extend<BoldOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBold(),
          isActive: () => editor.isActive('bold') || false,
          disabled: !editor.can().toggleBold(),
          icon: 'i-lucide-bold',
          shortcuts: ['mod', 'B'],
          tooltip: t('editor.bold.tooltip'),
        },
      }),
    }
  },
})
