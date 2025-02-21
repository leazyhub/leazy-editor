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
          <UIcon name="i-lucide-chevron-down"/>
        </Suspense>
      </template>
    </ActionButton>

    <template #content>
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'note' })"
          :tooltip="$t('editor.alert.note')"
          icon="i-lucide-sticky-note"
          title="Note"
          @click="props.editor.chain().focus().setAlert({ type: 'note' }).run()"
      />
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'info' })"
          :tooltip="$t('editor.alert.info')"
          icon="i-lucide-info"
          title="Info"
          @click="props.editor.chain().focus().setAlert({ type: 'info' }).run()"
      />
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'warning' })"
          :tooltip="$t('editor.alert.warning')"
          icon="i-lucide-triangle-alert"
          title="Warning"
          @click="props.editor.chain().focus().setAlert({ type: 'warning' }).run()"
      />
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'danger' })"
          :tooltip="$t('editor.alert.danger')"
          icon="i-lucide-circle-x"
          title="Danger"
          @click="props.editor.chain().focus().setAlert({ type: 'danger' }).run()"
      />
      <ActionButton
          :isActive="() => editor.isActive('alert', { type: 'success' })"
          :tooltip="$t('editor.alert.success')"
          icon="i-lucide-circle-check"
          title="Success"
          @click="props.editor.chain().focus().setAlert({ type: 'success' }).run()"
      />
    </template>
  </UPopover>
</template>
