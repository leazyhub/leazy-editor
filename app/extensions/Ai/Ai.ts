import { Node } from '@tiptap/core'
import ActionButton from './components/AiButton.vue'
import type { GeneralOptions } from '../../types'

export interface MenuItem {
  label: string
  prompt?: string
  children?: MenuItem[]
}
export interface AIOptions extends GeneralOptions<AIOptions> {
  completions: (prompt: string, text: string, signal?: AbortSignal) => Promise<any>
  /**
   * AI Shortcuts Menu
   */
  shortcuts: MenuItem[]
}

export const AI = Node.create<AIOptions>({
  name: 'Ai',
  group: 'block',
  addOptions() {
    return {
      ...this.parent?.(),
      toolbar: false,
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          editor,
          icon: 'i-heroicons-sparkles',
          tooltip: 'AI',
        },
      }),
    }
  },
})
