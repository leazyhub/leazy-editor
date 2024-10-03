import type { Editor, Extension } from '@tiptap/core'
import TiptapTextAlign, { type TextAlignOptions as TiptapTextAlignOptions } from '@tiptap/extension-text-align'
import TextAlignMenuButton from './components/TextAlignMenuButton.vue'
import type { GeneralOptions } from '../../types'

type Alignments = 'left' | 'center' | 'right' | 'justify'
/**
 * Represents the interface for text align options, extending TiptapTextAlignOptions and GeneralOptions.
 */
export interface TextAlignOptions extends TiptapTextAlignOptions, GeneralOptions<TextAlignOptions> {
  /**
   * List of available alignment options
   *
   * @default ['left', 'center', 'right', 'justify']
   */
  alignments: Alignments[]
}
export const TextAlign = TiptapTextAlign.extend<TextAlignOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['heading', 'paragraph', 'list_item', 'title'],
      button({ editor, extension, t }: { editor: Editor; extension: Extension; t: (...args: any[]) => string }) {
        const alignments = (extension.options?.alignments as Alignments[]) || []
        const shortcutsMap = {
          left: ['mod', 'Shift', 'L'],
          center: ['mod', 'Shift', 'E'],
          right: ['mod', 'Shift', 'R'],
          justify: ['mod', 'Shift', 'J'],
        }
        const iconMap = {
          left: 'i-lucide-align-left',
          center: 'i-lucide-align-center',
          right: 'i-lucide-align-right',
          justify: 'i-lucide-align-justify',
        }
        const items = alignments.map(k => ({
          title: t(`editor.textalign.${k}.tooltip`),
          icon: iconMap[k],
          shortcuts: shortcutsMap[k],
          isActive: () => editor.isActive({ textAlign: k }) || false,
          action: () => editor.commands.setTextAlign(k),
          disabled: !editor.can().setTextAlign(k),
        }))
        const disabled = items.filter(k => k.disabled).length === items.length
        return {
          component: TextAlignMenuButton,
          componentProps: {
            icon: 'i-lucide-align-justify',
            tooltip: t(`editor.textalign.tooltip`),
            disabled,
            items,
          },
        }
      },
    }
  },
})
