<script setup lang="ts">
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
    <ActionButton :icon="icon" :tooltip="tooltip" :is-active="isActive" :disabled="disabled" />

    <template #panel>
      <SearchAndReplaceBlock :editor="editor" />
    </template>
  </UPopover>
</template>
