<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'

interface Props {
  editor: Editor
  disabled?: boolean
  icon?: any
  tooltip?: string
}

const { editor, disabled = false, icon, tooltip = '' } = defineProps<Props>()

const input = ref<HTMLInputElement | null>(null)

const handleImportClick = () => {
  if (input.value) input.value.click()
}

const handleImport = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  input.value = null
  
  if (!file) return
  
  editor.chain().import({
    file,
    onImport: context => {
      context?.setEditorContent?.()
    }
  }).run()
}
</script>

<template>
  <ActionButton @click="handleImportClick" :disabled="disabled" :icon="icon" :tooltip="tooltip">
    <input ref="input" @change="handleImport" type="file" accept=".docx,.md,.odt,.rtf" class="hidden" />
  </ActionButton>
</template>
