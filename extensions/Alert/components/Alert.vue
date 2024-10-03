<script setup lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

const props = defineProps(['node', 'editor', 'selected', 'updateAttributes'])

const types = ref([
  {
    name: 'note',
    icon: 'i-fluent-note-24-regular',
    color: 'primary',
  },
  {
    name: 'info',
    icon: 'i-heroicons-information-circle',
    color: 'gray',
  },
  {
    name: 'warning',
    icon: 'i-heroicons-exclamation-triangle',
    color: 'orange',
  },
  {
    name: 'danger',
    icon: 'i-heroicons-x-circle',
    color: 'red',
  },
  {
    name: 'success',
    icon: 'i-heroicons-check-circle',
    color: 'green',
  },
])

const currentAlert = computed(() => types.value.find(type => type.name === props.node.attrs.type))
</script>

<template>
  <NodeViewWrapper
    data-type="alert"
    class="alert"
  >
    <UAlert
      :icon="currentAlert.icon"
      :color="currentAlert.color"
      variant="subtle"
    >
      <template #icon>
        <Suspense>
          <UIcon :name="currentAlert.icon" dynamic />
        </Suspense>
      </template>
      <template #description>
        <NodeViewContent
          class="text-sm font-medium"
          as="p"
        />
      </template>
    </UAlert>
  </NodeViewWrapper>
</template>
