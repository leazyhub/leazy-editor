import { Strike as TiptapStrike, type StrikeOptions as TiptapStrikeOptions } from '@tiptap/extension-strike'
import ActionButton from '../../components/ActionButton.vue'
import type { GeneralOptions } from '../../types'

export interface StrikeOptions extends TiptapStrikeOptions, GeneralOptions<StrikeOptions> {}

export const Strike = TiptapStrike.extend<StrikeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleStrike(),
          isActive: () => editor.isActive('strike') || false,
          disabled: !editor.can().toggleStrike(),
          icon: 'i-lucide-strikethrough',
          shortcuts: ['shift', 'mod', 'X'],
          tooltip: t('editor.strike.tooltip'),
        },
      }),
    }
  },
})
