<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import type { CreateTablePayload } from './CreateTablePopover.vue'
import CreateTablePopover from './CreateTablePopover.vue'
import ActionButton from '../../../components/ActionButton.vue'
import type { ButtonViewReturnComponentProps } from '../../../types'

interface Props {
  editor: Editor
  icon?: string
  tooltip?: string
  disabled?: boolean
  color?: string
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  tooltip: undefined,
  disabled: false,
  color: undefined,
  action: undefined,
  isActive: undefined,
})

function createTable(options: CreateTablePayload) {
  if (!props.disabled) {
    props.editor
      .chain()
      .focus()
      .insertTable({ ...options, withHeaderRow: false })
      .run()
  }
}
</script>

<template>
  <CreateTablePopover :disabled="disabled" @create-table="createTable">
    <template #trigger>
      <ActionButton
        :action="action"
        :disabled="disabled"
        :icon="icon"
        :is-active="isActive"
        :tooltip="tooltip"
      >
      </ActionButton>
    </template>
  </CreateTablePopover>
</template>
