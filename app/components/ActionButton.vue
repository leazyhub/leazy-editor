<script lang="ts" setup>
import type { ButtonViewReturnComponentProps } from '../types'

interface Props {
  icon?: string
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
</script>

<template>
  <UTooltip :text="tooltip" :popper="{ placement: 'bottom' }" :shortcuts="shortcuts">
    <UButton square :variant="isActive?.() ? 'soft' : 'ghost'" :color="isActive?.() ? 'primary' : 'gray'" @click="action" :class="customClass" :disabled="disabled">
      <slot />
      <template #leading>
        <div v-if="loading">
          <UIcon class="animate-spin" name="i-lucide-loader-circle" />
        </div>
        <div class="flex gap-1 items-center" v-else>
          <UIcon v-if="icon" :name="icon" dynamic />
          <slot name="icon" />
        </div>
      </template>
    </UButton>
  </UTooltip>
</template>
