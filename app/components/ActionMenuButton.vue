<script lang="ts" setup>
import type { ButtonViewReturnComponentProps } from '@/types'

interface Props {
  icon?: any
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcuts?: string[]
  color?: string
  action?: ButtonViewReturnComponentProps['action'],
  isActive?: ButtonViewReturnComponentProps['isActive']
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
  title: undefined,
  tooltip: undefined,
  disabled: false,
  color: undefined,
  shortcuts: undefined,
  action: undefined,
  isActive: undefined,
})
</script>

<template>
  <UTooltip :text="tooltip" :shortcuts="shortcuts">
    <UButton :label="title" :variant="isActive?.() ? 'soft' : 'ghost'" :color="isActive?.() ? 'primary' : 'gray'" @click="action" :disabled="disabled">
      <slot />
      <template #leading>
        <div v-if="loading">
          <UIcon class="animate-spin" name="i-lucide-loader-circle" />
        </div>
        <div v-else class="flex gap-1 items-center">
          <UIcon v-if="icon" :name="icon" dynamic />
          <slot name="icon" />
        </div>
      </template>
    </UButton>
  </UTooltip>
</template>
