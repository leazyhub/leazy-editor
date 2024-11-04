import { deleteSelection } from '@tiptap/pm/commands'
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '../../components/ActionButton.vue'
import { IMAGE_SIZE, VIDEO_SIZE } from '../../constants'
import type { ButtonViewParams, ButtonViewReturn } from '../../types'
import type { BubbleImageOrVideoSizeType, BubbleMenuItem } from './types'

const imageSizeMenus = (editor: Editor): BubbleMenuItem[] => {
  const types: BubbleImageOrVideoSizeType[] = ['size-small', 'size-medium', 'size-large']
  const icons: NonNullable<ButtonViewReturn['componentProps']['icon']>[] = ['i-lucide-proportions', 'i-lucide-proportions', 'i-lucide-proportions']

  return types.map((size, i) => ({
    type: `image-${size}`,
    component: ActionButton,
    componentProps: {
      tooltip: `editor.${size.replace('-', '.')}.tooltip`,
      icon: icons[i],
      action: () => editor.commands.updateImage({ width: IMAGE_SIZE[size], height: null }),
      isActive: () => editor.isActive('image', { width: IMAGE_SIZE[size] }),
    },
  }))
}

// Modify the videoSizeMenus function to use the VIDEO_SIZE constant
const videoSizeMenus = (editor: Editor): BubbleMenuItem[] => {
  const types: BubbleImageOrVideoSizeType[] = ['size-small', 'size-medium', 'size-large']
  const icons: NonNullable<ButtonViewReturn['componentProps']['icon']>[] = ['i-lucide-proportions', 'i-lucide-proportions', 'i-lucide-proportions']

  return types.map((size, i) => ({
    type: `video-${size}`,
    component: ActionButton,
    componentProps: {
      tooltip: `editor.${size.replace('-', '.')}.tooltip`,
      icon: icons[i],
      action: () => editor.commands.updateVideo({ width: VIDEO_SIZE[size] }),
      isActive: () => editor.isActive('video', { width: VIDEO_SIZE[size] }),
    },
  }))
}
export const defaultBubbleList = (editor: Editor): BubbleMenuItem[] => [
  ...imageSizeMenus(editor),
  ...videoSizeMenus(editor),
  {
    type: 'image-aspect-ratio',
    component: ActionButton,
    componentProps: {
      tooltip: 'editor.image.dialog.form.aspectRatio',
      icon: 'i-lucide-ratio',
      action: () => {
        const isLock = editor.isActive('image', { lockAspectRatio: true })
        editor.commands.updateImage({
          lockAspectRatio: !isLock,
          height: isLock ? undefined : null,
        })
      },
      isActive: () => editor.isActive('image', { lockAspectRatio: true }),
    },
  },
  {
    type: 'remove',
    component: ActionButton,
    componentProps: {
      tooltip: 'editor.remove',
      icon: 'i-heroicons-trash',
      action: () => {
        const { state, dispatch } = editor.view
        deleteSelection(state, dispatch)
      },
    },
  },
]

/**
 * bubble menu
 * @template T
 * @param {NodeTypeMenu} list
 * @param {BubbleMenuItem[]} defaultList
 * @param {ButtonViewParams<T>} { editor, extension, t }
 * @return {*}  {BubbleTypeMenu}
 */
export const generateBubbleTypeMenu = <T = any>(
  list: NodeTypeMenu,
  defaultList: BubbleMenuItem[],
  { editor, extension, t }: ButtonViewParams<T>
): BubbleTypeMenu => {
  const { extensions = [] } = editor.extensionManager
  const items: BubbleTypeMenu = {}

  for (const node of Object.keys(list)) {
    const nodeType = list[node as NodeTypeKey]
    if (!nodeType) continue

    const _items: BubbleMenuItem[] = []

    for (const ext of nodeType) {
      if (ext === 'divider') {
        const lastItem = _items[_items.length - 1]
        if (lastItem?.type === 'divider') continue

        _items.push({
          type: 'divider',
          component: undefined,
          componentProps: {},
        })
        continue
      }

      const find = defaultList.find(k => k.type === ext)
      if (find) {
        _items.push({
          ...find,
          componentProps: {
            ...find.componentProps,
            tooltip: find.componentProps.tooltip ? t(find.componentProps.tooltip) : undefined,
          },
          componentSlots: find.componentSlots,
        })
        continue
      }

      const findExt = extensions.find(k => k.name === ext)
      if (findExt) {
        const { button } = findExt.options as any
        const _button: ButtonViewReturn = button({
          editor,
          extension: findExt,
          t,
        })

        _items.push({
          type: ext,
          component: _button.component,
          componentProps: _button.componentProps,
          componentSlots: _button.componentSlots,
        })
        continue
      }
    }

    const lastItem = _items[_items.length - 1]
    const firstItem = _items[0]

    if (lastItem?.type === 'divider') _items.pop()
    if (firstItem?.type === 'divider') _items.shift()

    items[node as NodeTypeKey] = _items
  }

  return items
}
