<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import { ActionButton } from '#components'
import SearchAndReplaceBlock from './SearchAndReplaceBlock'
import type { ButtonViewReturnComponentProps } from '@/types'

interface Props {
  editor: Editor
  icon?: any
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcuts?: string[]
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  title: undefined,
  tooltip: undefined,
  disabled: false,
  shortcuts: undefined,
  action: undefined,
  isActive: undefined,
})
</script>

<template>
  <UPopover>
    <ActionButton :disabled="disabled" :icon="icon" :is-active="isActive" :tooltip="tooltip" />
    
    <template #content>
      <SearchAndReplaceBlock :editor="editor" />
    </template>
  </UPopover>
</template>
