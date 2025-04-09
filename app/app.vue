<script setup lang="ts">
const content = ref({})
const editor = useTemplateRef('editor')
</script>

<template>
  <UApp :toaster="{ expand: false }" :tooltip="{ delayDuration: 50 }">
    <LeazyEditor ref="editor" v-model="content" @comment:added="() => console.log(editor.editor.storage.comment.comments)" class="flex-1" max-width="800" />
  </UApp>
</template>
