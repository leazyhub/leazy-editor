<script setup lang="ts">
import { Editor } from '@tiptap/core'

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
  completion: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['generate', 'close'])

const handleReplace = () => {
  const selection = props.editor.view.state.selection
  props.editor.chain().focus().insertContentAt({
    from: selection.from,
    to: selection.to
  }, props.completion).run()
}

const handleInsert = () => {
  const { to } = props.editor.view.state.selection
  if (to) {
    props.editor.chain().focus().insertContentAt(to + 1, props.completion).run()
  }
}

const handleGenerate = () => {
  emit('generate')
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="mt-2 overflow-auto p-1 flex flex-col shadow-md rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 max-w-fit">
    <UButton @click="handleReplace" leading-icon="i-lucide-replace" label="Remplacer" variant="ghost" color="white" size="xs" />
    <UButton @click="handleInsert" leading-icon="i-lucide-list-plus" label="Insérer" variant="ghost" color="white" size="xs" />

    <UDivider orientation="horizontal" />

    <UButton @click="handleGenerate" leading-icon="i-lucide-redo-2" label="Regénerer" variant="ghost" color="white" size="xs" />
    <UButton @click="handleClose" leading-icon="i-lucide-x" label="Fermer" variant="ghost" color="white" size="xs" />
  </div>
</template>
