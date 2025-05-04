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
        <UIcon name="i-lucide-chevron-down"/>
      </template>
    </ActionButton>

    <template #content>
      <ActionButton
        :is-active="() => editor.isActive('alert', { type: 'note' })"
        :tooltip="$t('editor.alert.note')"
        icon="i-lucide-sticky-note"
        :title="$t('editor.alert.note')"
        @click="props.editor.chain().focus().setAlert({ type: 'note' }).run()"
      />
      <ActionButton
        :is-active="() => editor.isActive('alert', { type: 'info' })"
        :tooltip="$t('editor.alert.info')"
        icon="i-lucide-info"
        :title="$t('editor.alert.info')"
        @click="props.editor.chain().focus().setAlert({ type: 'info' }).run()"
      />
      <ActionButton
        :is-active="() => editor.isActive('alert', { type: 'warning' })"
        :tooltip="$t('editor.alert.warning')"
        icon="i-lucide-triangle-alert"
        :title="$t('editor.alert.warning')"
        @click="props.editor.chain().focus().setAlert({ type: 'warning' }).run()"
      />
      <ActionButton
        :is-active="() => editor.isActive('alert', { type: 'danger' })"
        :tooltip="$t('editor.alert.danger')"
        icon="i-lucide-circle-x"
        :title="$t('editor.alert.danger')"
        @click="props.editor.chain().focus().setAlert({ type: 'danger' }).run()"
      />
      <ActionButton
        :is-active="() => editor.isActive('alert', { type: 'success' })"
        :tooltip="$t('editor.alert.success')"
        icon="i-lucide-circle-check"
        :title="$t('editor.alert.success')"
        @click="props.editor.chain().focus().setAlert({ type: 'success' }).run()"
      />
    </template>
  </UPopover>
</template>
