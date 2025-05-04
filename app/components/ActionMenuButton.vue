<script lang="ts" setup>
import type { ButtonViewReturnComponentProps } from '@/types'

interface Props {
  icon?: any
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcuts?: string[]
  color?: string
  loading?: boolean
  action?: ButtonViewReturnComponentProps['action'],
  isActive?: ButtonViewReturnComponentProps['isActive']
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false
})
</script>

<template>
  <UButton
    :color="isActive?.() ? 'primary' : 'neutral'" :disabled="disabled" :label="title"
    :variant="isActive?.() ? 'soft' : 'ghost'" @click="action"
  >
    <slot />
    <template #leading>
      <div v-if="loading">
        <UIcon class="animate-spin" name="i-lucide-loader-circle" />
      </div>
      <UTooltip v-else :text="tooltip">
        <div class="flex gap-1 items-center">
          <UIcon v-if="icon" :name="icon" dynamic />
          <slot name="icon" />
        </div>
      </UTooltip>
    </template>
  </UButton>
</template>
