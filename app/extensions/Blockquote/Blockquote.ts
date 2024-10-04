import { Blockquote as TiptapBlockquote, type BlockquoteOptions as TiptapBlockquoteOptions } from '@tiptap/extension-blockquote'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface BlockquoteOptions extends TiptapBlockquoteOptions, GeneralOptions<BlockquoteOptions> {}

export const Blockquote = TiptapBlockquote.extend<BlockquoteOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'blockquote',
      },
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBlockquote(),
          isActive: () => editor.isActive('blockquote') || false,
          disabled: !editor.can().toggleBlockquote(),
          icon: 'i-lucide-text-quote',
          shortcuts: ['shift', 'mod', 'B'],
          tooltip: t('editor.blockquote.tooltip'),
        },
      }),
    }
  },
})
