<script lang="ts" setup>
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
  <div
    class="mt-2 overflow-auto p-1 flex flex-col shadow-md rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 max-w-fit"
  >
    <UButton
      color="white" label="Remplacer" leading-icon="i-lucide-replace" size="xs" variant="ghost" @click="handleReplace"
    />
    <UButton
      color="white" label="Insérer" leading-icon="i-lucide-list-plus" size="xs" variant="ghost" @click="handleInsert"
    />
    
    <UDivider orientation="horizontal" />
    
    <UButton
      color="white" label="Regénerer" leading-icon="i-lucide-redo-2" size="xs" variant="ghost" @click="handleGenerate"
    />
    <UButton color="white" label="Fermer" leading-icon="i-lucide-x" size="xs" variant="ghost" @click="handleClose" />
  </div>
</template>
