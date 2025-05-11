<script lang="ts" setup>
import { BubbleMenu, type Editor, isActive } from '@tiptap/vue-3'
import { offset } from '@floating-ui/dom'
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
      :options="{
        middleware: [offset(8)]
      }"
      :updateDelay="0"
      pluginKey="alert"
  >
    <div class="bg-white rounded-lg dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
      <div class="flex gap-1 items-center">
        <ActionButton
            :is-active="() => editor.isActive('alert', { type: 'note' })"
            :tooltip="$t('editor.alert.note')"
            icon="i-lucide-sticky-note"
            :title="$t('editor.alert.note')"
            @click="editor.chain().focus().setAlertType('note').run()"
        />
        <ActionButton
            :is-active="() => editor.isActive('alert', { type: 'info' })"
            :tooltip="$t('editor.alert.info')"
            icon="i-lucide-info"
            :title="$t('editor.alert.info')"
            @click="editor.chain().focus().setAlertType('info').run()"
        />
        <ActionButton
            :is-active="() => editor.isActive('alert', { type: 'warning' })"
            :tooltip="$t('editor.alert.warning')"
            icon="i-lucide-triangle-alert"
            :title="$t('editor.alert.warning')"
            @click="editor.chain().focus().setAlertType('warning').run()"
        />
        <ActionButton
            :is-active="() => editor.isActive('alert', { type: 'danger' })"
            :tooltip="$t('editor.alert.danger')"
            icon="i-lucide-circle-x"
            :title="$t('editor.alert.danger')"
            @click="editor.chain().focus().setAlertType('danger').run()"
        />
        <ActionButton
            :is-active="() => editor.isActive('alert', { type: 'success' })"
            :tooltip="$t('editor.alert.success')"
            icon="i-lucide-circle-check"
            :title="$t('editor.alert.success')"
            @click="editor.chain().focus().setAlertType('success').run()"
        />
        <UTooltip :text="$t('editor.remove')">
          <UButton
            :active="() => editor.isActive('alert')"
            :tooltip="$t('editor.remove')"
            color="error"
            icon="i-lucide-trash-2"
            size="xs"
            :title="$t('editor.remove')"
            variant="ghost"
            @click="editor.chain().focus().deleteNode('alert').run()"
          />
        </UTooltip>
      </div>
    </div>
  </BubbleMenu>
</template>
