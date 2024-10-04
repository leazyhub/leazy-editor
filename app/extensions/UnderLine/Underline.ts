import TiptapUnderline, { type UnderlineOptions as TiptapUnderlineOptions } from '@tiptap/extension-underline'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface UnderlineOptions extends TiptapUnderlineOptions, GeneralOptions<UnderlineOptions> {}

export const Underline = TiptapUnderline.extend<UnderlineOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor, t }) {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.commands.toggleUnderline(),
            isActive: () => editor.isActive('underline') || false,
            disabled: !editor.can().toggleUnderline(),
            icon: 'i-lucide-underline',
            shortcuts: ['mod', 'U'],
            tooltip: t('editor.underline.tooltip'),
          },
        }
      },
    }
  },
})
