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

withDefaults(defineProps<Props>(), {
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
  <UButton
    :class="customClass" :color="isActive?.() ? 'primary' : 'neutral'" :disabled="disabled" :variant="isActive?.() ? 'soft' : 'ghost'"
    square @click="action"
  >
    <slot />
    
    <template #leading>
      <div v-if="loading">
        <Suspense>
          <UIcon class="animate-spin" name="i-lucide-loader-circle" />
        </Suspense>
      </div>
      <div v-else class="flex gap-1 items-center">
        <Suspense>
          <UTooltip :text="tooltip">
            <UIcon v-if="icon" :name="icon" dynamic />
          </UTooltip>
        </Suspense>
        <slot name="icon" />
      </div>
    </template>
  </UButton>
</template>
