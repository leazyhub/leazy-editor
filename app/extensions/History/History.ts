import { History as TiptapHistory, type HistoryOptions as TiptapHistoryOptions } from '@tiptap/extension-history'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface HistoryOptions extends TiptapHistoryOptions, GeneralOptions<HistoryOptions> {}

export const History = TiptapHistory.extend<HistoryOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      depth: 10,
      button: ({ editor, t }) => {
        const historys: ['undo', 'redo'] = ['undo', 'redo']
        return historys.map(item => ({
          component: ActionButton,
          componentProps: {
            action: () => {
              if (item === 'undo') editor.commands.undo()
              if (item === 'redo') editor.commands.redo()
            },
            shortcuts: item === 'undo' ? ['mod', 'Z'] : ['shift', 'mod', 'Z'],
            disabled: !editor.can()[item](),
            icon: item === 'undo' ? 'i-lucide-undo' : 'i-lucide-redo',
            tooltip: t(`editor.${item}.tooltip`),
          },
        }))
      },
    }
  },
})
