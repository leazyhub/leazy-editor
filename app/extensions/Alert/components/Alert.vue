<script lang="ts" setup>
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(['node', 'editor', 'selected', 'updateAttributes'])

const types = ref([
  {
    name: 'note',
    icon: 'i-lucide-sticky-note',
    color: 'primary',
  },
  {
    name: 'info',
    icon: 'i-lucide-info',
    color: 'info',
  },
  {
    name: 'warning',
    icon: 'i-lucide-triangle-alert',
    color: 'warning',
  },
  {
    name: 'danger',
    icon: 'i-lucide-circle-x',
    color: 'error',
  },
  {
    name: 'success',
    icon: 'i-lucide-circle-check',
    color: 'success',
  },
])

const currentAlert = computed(() => types.value.find(type => type.name === props.node.attrs.type))
</script>

<template>
  <NodeViewWrapper
    class="alert"
    data-type="alert"
  >
    <UAlert
      :color="currentAlert.color"
      :icon="currentAlert.icon"
      variant="subtle"
    >
      <template #icon>
        <UIcon :name="currentAlert.icon" dynamic />
      </template>
      <template #description>
        <NodeViewContent
          as="p"
          class="text-sm font-medium"
        />
      </template>
    </UAlert>
  </NodeViewWrapper>
</template>
