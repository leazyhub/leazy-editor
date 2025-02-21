<script setup lang="ts">
const content = ref({})
const editor = useTemplateRef('editor')
</script>

<template>
  <UApp :toaster="{ expand: false }" :tooltip="{ delayDuration: 50 }">
    <div>
      <UPopover>
        <UButton label="Open" color="neutral" variant="subtle" />
        
        <template #content>
          <div class="size-48 m-4 inline-flex bg-white" />
        </template>
      </UPopover>
      <LeazyEditor ref="editor" v-model="content" @comment:added="() => console.log(editor.editor.storage.comment.comments)" class="flex-1" max-width="800" />
    </div>
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
