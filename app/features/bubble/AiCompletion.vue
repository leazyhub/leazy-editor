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
    class="mt-2 overflow-auto p-1 flex flex-col shadow-md rounded-md border border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 max-w-fit"
  >
    <UButton
      color="neutral" label="Remplacer" leading-icon="i-lucide-replace" size="xs" variant="ghost" @click="handleReplace"
    />
    <UButton
      color="neutral" label="Insérer" leading-icon="i-lucide-list-plus" size="xs" variant="ghost" @click="handleInsert"
    />
    
    <USeparator orientation="horizontal" />
    
    <UButton
      color="neutral" label="Regénerer" leading-icon="i-lucide-redo-2" size="xs" variant="ghost" @click="handleGenerate"
    />
    <UButton color="neutral" label="Fermer" leading-icon="i-lucide-x" size="xs" variant="ghost" @click="handleClose" />
  </div>
</template>
