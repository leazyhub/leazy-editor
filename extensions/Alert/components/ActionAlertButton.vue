<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'

export interface Props {
  editor: Editor,
  tooltip: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: '',
  icon: undefined,
})
</script>

<template>
  <UPopover>
    <ActionButton :icon="icon" :tooltip="tooltip">
      <template #icon>
        <UIcon name="i-heroicons-chevron-down-20-solid" />
      </template>
    </ActionButton>

    <template #panel>
      <ActionButton
          title="Note"
          :tooltip="$t('editor.alert.note')"
          icon="i-fluent-note-24-regular"
          @click="props.editor.chain().focus().setAlert({ type: 'note' }).run()"
          :isActive="() => editor.isActive('alert', { type: 'note' })"
      />
      <ActionButton
          title="Info"
          :tooltip="$t('editor.alert.info')"
          icon="i-heroicons-information-circle"
          @click="props.editor.chain().focus().setAlert({ type: 'info' }).run()"
          :isActive="() => editor.isActive('alert', { type: 'info' })"
      />
      <ActionButton
          title="Warning"
          :tooltip="$t('editor.alert.warning')"
          icon="i-heroicons-exclamation-triangle"
          @click="props.editor.chain().focus().setAlert({ type: 'warning' }).run()"
          :isActive="() => editor.isActive('alert', { type: 'warning' })"
      />
      <ActionButton
          title="Danger"
          :tooltip="$t('editor.alert.danger')"
          icon="i-heroicons-x-circle"
          @click="props.editor.chain().focus().setAlert({ type: 'danger' }).run()"
          :isActive="() => editor.isActive('alert', { type: 'danger' })"
      />
      <ActionButton
          title="Success"
          :tooltip="$t('editor.alert.success')"
          icon="i-heroicons-check-circle"
          @click="props.editor.chain().focus().setAlert({ type: 'success' }).run()"
          :isActive="() => editor.isActive('alert', { type: 'success' })"
      />
    </template>
  </UPopover>
</template>
