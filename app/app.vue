<script setup lang="ts">
const content = ref({})
</script>

<template>
  <div>
    <LeazyEditor ref="editor" v-model="content" class="flex-1" max-width="800" />
  </div>
</template>
