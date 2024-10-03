import type { Extension } from '@tiptap/core'
import { Heading as TiptapHeading, type HeadingOptions as TiptapHeadingOptions } from '@tiptap/extension-heading'
import type { Item } from './components/HeadingButton.vue'
import HeadingButton from './components/HeadingButton.vue'
import type { BaseKitOptions } from '../../extensions'
import type { GeneralOptions } from '../../types'

export interface HeadingOptions extends TiptapHeadingOptions, GeneralOptions<HeadingOptions> {}

export const Heading = TiptapHeading.extend<HeadingOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [1, 2, 3, 4, 5, 6],
      button({ editor, extension, t }) {
        const { extensions = [] } = editor.extensionManager ?? []
        const levels = extension.options?.levels || []
        const baseKitExt = extensions.find(k => k.name === 'base-kit') as Extension<BaseKitOptions>

        const items: Item[] = levels.map(level => ({
          action: () => editor.commands.toggleHeading({ level }),
          isActive: () => editor.isActive('heading', { level }) || false,
          disabled: !editor.can().toggleHeading({ level }),
          title: t(`editor.heading.h${level}.tooltip`),
          level: level,
          shortcuts: ['alt', 'mod', `${level}`],
        }))
        if (baseKitExt && baseKitExt.options.paragraph !== false) {
          items.unshift({
            action: () => editor.commands.setParagraph(),
            isActive: () => editor.isActive('paragraph') || false,
            disabled: !editor.can().setParagraph(),
            level: 0,
            title: t('editor.paragraph.tooltip'),
            shortcuts: ['alt', 'mod', '0'],
          })
        }

        const disabled = items.filter((k: any) => k.disabled).length === items.length

        return {
          component: HeadingButton,
          componentProps: {
            tooltip: t('editor.heading.tooltip'),
            disabled,
            items,
          },
        }
      },
    }
  },
})
