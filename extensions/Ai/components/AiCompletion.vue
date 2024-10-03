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
  },
})

const emits = defineEmits(['discard'])
function handleReplace() {
  const selection = props.editor.view.state.selection
  props.editor
    .chain()
    .focus()
    .insertContentAt(
      {
        from: selection.from,
        to: selection.to,
      },
      props.completion
    )
    .run()
}
function handleInsert() {
  const selection = props.editor.view.state.selection
  props.editor
    .chain()
    .focus()
    .insertContentAt(selection.to + 1, props.completion)
    .run()
}
</script>

<template>
  <div class="dark:bg-black text-black overflow-auto flex-wrap p-1">
    <UDivider />
    <div class="flex flex-row gap-3 mt-3">
      <UButton @click="handleReplace" size="sm" icon="i-lucide-replace" :label="$t('editor.replace')" />
      <UButton @click="handleInsert" size="sm" icon="i-lucide-text-quote" label="Citation" />
      <UButton @click="emits('discard')" size="sm" icon="i-heroicons-trash" :label="$t('editor.remove')" />
    </div>
  </div>
</template>
