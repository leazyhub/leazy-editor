<script setup lang="ts">
const content = ref({})
const editor = useTemplateRef('editor')
</script>

<template>
  <div>
    <LeazyEditor ref="editor" v-model="content" @comment:added="() => console.log(editor.editor.storage.comment.comments)" class="flex-1" max-width="800" />
  </div>
</template>
