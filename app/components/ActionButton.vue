<script lang="ts" setup>
import type { ButtonViewReturnComponentProps } from '../types'

type IconType = string | (() => string)

interface Props {
  icon?: IconType
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcuts?: string[]
  customClass?: string
  loading?: boolean
  color?: string
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  title: undefined,
  tooltip: undefined,
  disabled: false,
  customClass: '',
  color: undefined,
  loading: false,
  shortcuts: undefined,
  action: undefined,
  isActive: undefined,
})

const resolvedIcon = computed(() => {
  return typeof props.icon === 'function' ? props.icon() : props.icon
})
</script>

<template>
  <UButton
    :label="title"
    :class="customClass"
    :color="isActive?.() ? 'primary' : 'neutral'"
    :disabled="disabled"
    :variant="isActive?.() ? 'soft' : 'ghost'"
    square @click="action"
  >
    <slot />
    
    <template #leading>
      <div v-if="loading">
        <UIcon class="animate-spin" name="i-lucide-loader-circle" />
      </div>
      <UTooltip v-else :text="$t(tooltip)">
        <div class="flex gap-1 items-center">
          <UIcon v-if="resolvedIcon" :name="resolvedIcon" dynamic />
          <slot name="icon" />
        </div>
      </UTooltip>
    </template>
  </UButton>
</template>
