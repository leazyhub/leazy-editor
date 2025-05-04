<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'

interface Item {
  icon: any
  label: string
  disabled: boolean
  action: () => void
  tooltip: string
}

interface Props {
  editor: Editor
  disabled?: boolean
  icon?: any
  tooltip?: string
  items: Item[]
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  icon: undefined,
  tooltip: ''
})
</script>

<template>
  <UPopover>
    <ActionButton :disabled="disabled" :icon="icon" :tooltip="tooltip">
      <UIcon name="i-lucide-chevron-down" />
    </ActionButton>
    
    <template #content>
      <div class="flex flex-col min-w-24">
        <UButton
          v-for="(item, index) in items"
          :key="index"
          color="neutral"
          variant="ghost"
          size="xs"
          :label="item.label"
          :leading-icon="item.icon"
          @click="item.action"
        />
      </div>
    </template>
  </UPopover>
</template>
