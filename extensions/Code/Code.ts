import { Code as TiptapCode, type CodeOptions as TiptapCodeOptions } from '@tiptap/extension-code'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface CodeOptions extends TiptapCodeOptions, GeneralOptions<CodeOptions> {}

export const Code = TiptapCode.extend<CodeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      toolbar: false,
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleCode(),
          isActive: () => editor.isActive('code') || false,
          disabled: !editor.can().toggleCode(),
          icon: 'i-lucide-code',
          shortcuts: ['mod', 'E'],
          tooltip: t('editor.code.tooltip'),
        },
      }),
    }
  },
})
