<script lang="ts" setup>
import type { ButtonViewReturnComponentProps } from '../../types'

interface Props {
  icon?: string
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcuts?: string[]
  customClass?: string
  loading?: boolean
  tooltipOptions?: object
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
  tooltipOptions: undefined,
  action: undefined,
  isActive: undefined,
})
const open = ref(false)
</script>

<template>
  <UButton square :variant="isActive?.() ? 'soft' : 'ghost'" :color="isActive?.() ? 'primary' : 'gray'" :disabled="disabled" :class="customClass" @click="open = true">
    <UIcon v-if="loading" class="animate-spin" name="i-lucide-loader-circle" />
    <div v-else class="flex gap-1 items-center">
      <UIcon v-if="icon" :name="icon" />
      <slot name="icon" />
    </div>
    <slot />
  </UButton>
</template>
