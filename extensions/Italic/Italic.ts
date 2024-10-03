import { type Editor } from '@tiptap/core'
import TiptapItalic, { type ItalicOptions as TiptapItalicOptions} from '@tiptap/extension-italic'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface ItalicOptions extends TiptapItalicOptions, GeneralOptions<ItalicOptions> {}

export const Italic = TiptapItalic.extend<ItalicOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.commands.toggleItalic(),
            isActive: () => editor.isActive('italic') || false,
            disabled: !editor.can().toggleItalic(),
            shortcuts: ['mod', 'I'],
            icon: 'i-lucide-italic',
            tooltip: t('editor.italic.tooltip'),
          },
        }
      },
    }
  },
})
