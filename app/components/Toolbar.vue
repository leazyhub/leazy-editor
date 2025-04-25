<script lang="ts" setup>
import type { Editor } from '@tiptap/core'
import type { ButtonViewReturn } from '@/types'
import { isFunction } from '@/utils'

interface Menu {
  button: ButtonViewReturn
  divider: boolean
  spacer: boolean
}

interface Props {
  editor: Editor
  disabled?: boolean
}

const { t } = useI18n()

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const items = computed(() => {
  const extensions = [...props.editor.extensionManager.extensions]
  const sortExtensions = extensions.sort((arr, acc) => {
    const a = arr.options.sort ?? -1
    const b = acc.options.sort ?? -1
    return a - b
  })
  
  let menus: Menu[] = []
  
  for (const extension of sortExtensions) {
    const { button, divider = false, spacer = false, toolbar = true } = extension.options
    if (!button || !isFunction(button) || !toolbar) continue
    
    const _button: ButtonViewReturn = button({
      editor: props.editor,
      extension,
      t: unref(t),
    })
    
    if (Array.isArray(_button)) {
      const menu: Menu[] = _button.map((k, i) => ({
        button: k,
        divider: i === _button.length - 1 ? divider : false,
        spacer: i === 0 ? spacer : false,
      }))
      menus = [...menus, ...menu]
      continue
    }
    
    menus.push({ button: _button, divider, spacer })
  }
  return menus
})
</script>

<template>
  <div v-if="editor" v-bind="$attrs">
    <div
      class="flex flex-wrap items-center bg-white dark:bg-neutral-800 border border-(--ui-border) rounded-lg p-1"
    >
      <template v-for="(item, key) in items" :key="key">
        <USeparator v-if="item.spacer" class="h-[16px] mx-[10px]" orientation="vertical" />
        <component
          :is="item.button.component"
          :disabled="disabled || item.button.componentProps?.disabled"
          :editor="editor"
          v-bind="item.button.componentProps"
        >
          <template v-for="(element, slotName, i) in item.button.componentSlots" :key="i" #[`${slotName}`]="values">
            <component :is="element" v-bind="values?.props" />
          </template>
        </component>
        <USeparator v-if="item.divider" class="h-auto mx-2" orientation="vertical" />
      </template>
    </div>
  </div>
</template>
