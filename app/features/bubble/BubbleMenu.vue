<script lang="ts" setup>
import { type NodeSelection, TextSelection } from '@tiptap/pm/state'
import type { Editor, Extension } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3'
import { CellSelection } from '@tiptap/pm/tables'
import type { BaseKitOptions } from '../../extensions'
import type { BubbleTypeMenu } from './types'

interface Props {
  editor: Editor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const store = useTiptapStore()
const { t } = useI18n()
const tippyOptions = reactive<Record<string, unknown>>({
  maxWidth: 'auto',
  zIndex: 99,
  appendTo: 'parent',
  moveTransition: 'transform 0.15s ease-out',
})

const nodeType = computed(() => {
  const selection = props.editor.state.selection as NodeSelection
  const isImage = selection.node?.type.name === 'image'
  const isLink = props.editor.isActive('link')
  const isVideo = selection.node?.type.name === 'video'
  const isCell = selection instanceof CellSelection
  const isTable = selection.node?.type.name === 'table' || isCell
  const isText = selection instanceof TextSelection
  
  if (isLink) return 'link'
  if (isImage) return 'image'
  if (isVideo) return 'video'
  if (isTable) return 'table'
  if (isText) return 'text'
  
  return undefined
})

const nodeMenus = computed(() => {
  const { extensions = [] } = props.editor.extensionManager
  const find = extensions.find(k => k.name === 'base-kit') as Extension<BaseKitOptions>
  if (!find) return {}
  
  const { button } = find.options?.bubble ?? {}
  
  if (!button) return {}
  
  const _button: BubbleTypeMenu = button({
    editor: props.editor,
    extension: find,
    t: unref(t),
  })
  
  return _button
})

const items = computed(() => {
  if (!nodeType.value) return []
  return unref(nodeMenus)?.[nodeType.value] ?? []
})
</script>
<template>
  <BubbleMenu
    v-show="items.length > 0 && !store?.state.AIMenu" :editor="editor" :tippy-options="tippyOptions"
    class="flex items-center flex-nowrap whitespace-nowrap gap-0.5 p-1 w-max overflow-hidden focus:outline-none relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg"
  >
    <template v-for="(item, key) in items" :key="key">
      <!-- Divider -->
      <USeparator
        v-if="item.type === 'divider'" :ui="{ border: { base: 'dark:border-neutral-500' } }" class="mx-1.5 h-[20px]"
        orientation="vertical"
      />
      <!-- Buttons -->
      <component
        :is="item.component"
        v-else
        :disabled="disabled || item.componentProps?.disabled"
        :editor="editor"
        v-bind="item.componentProps"
      >
        <template v-for="(element, slotName, i) in item.componentSlots" :key="i" #[`${slotName}`]="values">
          <component :is="element" v-bind="values?.props" />
        </template>
      </component>
    </template>
  </BubbleMenu>
</template>
