<script setup lang="ts">
import { sticky } from 'tippy.js'
import { BubbleMenu, isActive, type Editor } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'
import { getRenderContainer } from '../../../utils/get-render-container'

interface Props {
  editor: Editor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const shouldShow = ({ editor }) => {
  return isActive(editor.view.state, 'alert')
}

// Get the reference client rect for the bubble menu
const getReferenceClientRect = () => {
  const renderContainer = getRenderContainer(props.editor, 'alert')
  const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

  return rect
}
</script>

<template>
  <BubbleMenu
    :editor="editor"
    pluginKey="alert"
    :shouldShow="shouldShow"
    :updateDelay="0"
    :tippy-options="{
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      getReferenceClientRect,
      plugins: [sticky],
      sticky: 'popper',
    }"
  >
    <div class="bg-white rounded-lg dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex gap-1 items-center">
        <ActionButton
          title="Note"
          :tooltip="$t('editor.alert.note')"
          icon="i-fluent-note-24-regular"
          @click="editor.chain().focus().setAlertType('note').run()"
          :isActive="() => editor.isActive('alert', { type: 'note' })"
        />
        <ActionButton
          title="Info"
          :tooltip="$t('editor.alert.info')"
          icon="i-heroicons-information-circle"
          @click="editor.chain().focus().setAlertType('info').run()"
          :isActive="() => editor.isActive('alert', { type: 'info' })"
        />
        <ActionButton
          title="Warning"
          :tooltip="$t('editor.alert.warning')"
          icon="i-heroicons-exclamation-triangle"
          @click="editor.chain().focus().setAlertType('warning').run()"
          :isActive="() => editor.isActive('alert', { type: 'warning' })"
        />
        <ActionButton
          title="Danger"
          :tooltip="$t('editor.alert.danger')"
          icon="i-heroicons-x-circle"
          @click="editor.chain().focus().setAlertType('danger').run()"
          :isActive="() => editor.isActive('alert', { type: 'danger' })"
        />
        <ActionButton
          title="Success"
          :tooltip="$t('editor.alert.success')"
          icon="i-heroicons-check-circle"
          @click="editor.chain().focus().setAlertType('success').run()"
          :isActive="() => editor.isActive('alert', { type: 'success' })"
        />
        <UTooltip :text="$t('editor.remove')" :popper="{ placement: 'bottom' }">
          <UButton
            title="Remove"
            :tooltip="$t('editor.alert.remove')"
            icon="i-heroicons-trash"
            variant="ghost"
            size="xs"
            color="red"
            @click="editor.chain().focus().deleteNode('alert').run()"
            :active="() => editor.isActive('alert')"
          />
        </UTooltip>
      </div>
    </div>
  </BubbleMenu>
</template>
