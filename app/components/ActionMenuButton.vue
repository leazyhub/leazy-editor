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
  <UButton
    :color="isActive?.() ? 'primary' : 'neutral'" :disabled="disabled" :label="title"
    :variant="isActive?.() ? 'soft' : 'ghost'" @click="action"
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
          <UIcon v-if="icon" :name="icon" dynamic />
        </Suspense>
        <slot name="icon" />
      </div>
    </template>
  </UButton>
</template>
