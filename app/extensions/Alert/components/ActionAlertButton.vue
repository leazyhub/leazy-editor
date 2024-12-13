<script lang="ts" setup>
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
        <Suspense>
          <UIcon name="i-heroicons-chevron-down-20-solid"/>
        </Suspense>
      </template>
    </ActionButton>

    <template #content>
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'note' })"
          :tooltip="$t('editor.alert.note')"
          icon="i-fluent-note-24-regular"
          title="Note"
          @click="props.editor.chain().focus().setAlert({ type: 'note' }).run()"
      />
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'info' })"
          :tooltip="$t('editor.alert.info')"
          icon="i-heroicons-information-circle"
          title="Info"
          @click="props.editor.chain().focus().setAlert({ type: 'info' }).run()"
      />
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'warning' })"
          :tooltip="$t('editor.alert.warning')"
          icon="i-heroicons-exclamation-triangle"
          title="Warning"
          @click="props.editor.chain().focus().setAlert({ type: 'warning' }).run()"
      />
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'danger' })"
          :tooltip="$t('editor.alert.danger')"
          icon="i-heroicons-x-circle"
          title="Danger"
          @click="props.editor.chain().focus().setAlert({ type: 'danger' }).run()"
      />
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'success' })"
          :tooltip="$t('editor.alert.success')"
          icon="i-heroicons-check-circle"
          title="Success"
          @click="props.editor.chain().focus().setAlert({ type: 'success' }).run()"
      />
    </template>
  </UPopover>
</template>
