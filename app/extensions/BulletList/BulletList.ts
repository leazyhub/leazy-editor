import {
  BulletList as TiptapBulletList,
  BulletListOptions as TiptapBulletListOptions,
} from "@tiptap/extension-list";
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

export interface BulletListOptions extends TiptapBulletListOptions, GeneralOptions<BulletListOptions> {}

export const BulletList = TiptapBulletList.extend<BulletListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBulletList(),
          isActive: () => editor.isActive('bulletList') || false,
          disabled: !editor.can().toggleBulletList(),
          shortcuts: ['shift', 'mod', '8'],
          icon: 'i-lucide-list',
          tooltip: t('editor.bulletlist.tooltip'),
        },
      }),
    }
  },
})
