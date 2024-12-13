<script lang="ts" setup>
import { sticky } from 'tippy.js'
import { BubbleMenu, type Editor, isActive } from '@tiptap/vue-3'
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
      :shouldShow="shouldShow"
      :tippy-options="{
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      getReferenceClientRect,
      plugins: [sticky],
      sticky: 'popper',
    }"
      :updateDelay="0"
      pluginKey="alert"
  >
    <div class="bg-white rounded-lg dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
      <div class="flex gap-1 items-center">
        <ActionButton
            :isActive="() => editor.isActive('alert', { type: 'note' })"
            :tooltip="$t('editor.alert.note')"
            icon="i-fluent-note-24-regular"
            title="Note"
            @click="editor.chain().focus().setAlertType('note').run()"
        />
        <ActionButton
            :isActive="() => editor.isActive('alert', { type: 'info' })"
            :tooltip="$t('editor.alert.info')"
            icon="i-heroicons-information-circle"
            title="Info"
            @click="editor.chain().focus().setAlertType('info').run()"
        />
        <ActionButton
            :isActive="() => editor.isActive('alert', { type: 'warning' })"
            :tooltip="$t('editor.alert.warning')"
            icon="i-heroicons-exclamation-triangle"
            title="Warning"
            @click="editor.chain().focus().setAlertType('warning').run()"
        />
        <ActionButton
            :isActive="() => editor.isActive('alert', { type: 'danger' })"
            :tooltip="$t('editor.alert.danger')"
            icon="i-heroicons-x-circle"
            title="Danger"
            @click="editor.chain().focus().setAlertType('danger').run()"
        />
        <ActionButton
            :isActive="() => editor.isActive('alert', { type: 'success' })"
            :tooltip="$t('editor.alert.success')"
            icon="i-heroicons-check-circle"
            title="Success"
            @click="editor.chain().focus().setAlertType('success').run()"
        />
        <UTooltip :popper="{ placement: 'bottom' }" :text="$t('editor.remove')">
          <UButton
              :active="() => editor.isActive('alert')"
              :tooltip="$t('editor.alert.remove')"
              color="error"
              icon="i-heroicons-trash"
              size="xs"
              title="Remove"
              variant="ghost"
              @click="editor.chain().focus().deleteNode('alert').run()"
          />
        </UTooltip>
      </div>
    </div>
  </BubbleMenu>
</template>
