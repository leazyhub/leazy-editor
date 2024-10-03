import { mergeAttributes } from '@tiptap/core'
import { HorizontalRule as TiptapHorizontalRule, type HorizontalRuleOptions as TiptapHorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface HorizontalRuleOptions extends TiptapHorizontalRuleOptions, GeneralOptions<HorizontalRuleOptions> {}

export const HorizontalRule = TiptapHorizontalRule.extend<HorizontalRuleOptions>({
  renderHTML() {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, {
        'data-type': this.name,
      }),
      ['hr'],
    ]
  },
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.setHorizontalRule(),
          disabled: !editor.can().setHorizontalRule(),
          icon: 'i-lucide-minus',
          shortcuts: ['mod', 'alt', 'S'],
          tooltip: t('editor.horizontalrule.tooltip'),
        },
      }),
    }
  },
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-s': () => this.editor.commands.setHorizontalRule(),
    }
  },
})
