<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import ActionButton from '../../../components/ActionButton.vue'
import { useTiptapStore } from '../../../composables/useStore'
import type { ButtonViewReturnComponentProps } from '../../../types'

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  color: undefined,
  isActive: undefined,
  useWindow: false,
})
const { t } = useI18n()

const { toggleFullscreen } = useTiptapStore()!
const { isFullscreen, toggle } = useFullscreen()

interface Props {
  disabled?: boolean
  color?: string
  isActive?: ButtonViewReturnComponentProps['isActive']
  useWindow?: boolean
}

watch(
    () => isFullscreen.value,
    (val, oldVal) => {
      if (val !== oldVal) {
        toggleFullscreen()
      }
    }
)

const text = computed(() => {
  const tooltip = isFullscreen.value ? 'editor.fullscreen.tooltip.exit' : 'editor.fullscreen.tooltip.fullscreen'
  if (!tooltip) return undefined
  return unref(t)(tooltip)
})

const icon = computed(() => {
  const _icon = isFullscreen.value ? 'i-lucide-minimize' : 'i-lucide-maximize'
  return _icon
})

function onAction(_useWindow: boolean = false) {
  toggle()
}
</script>

<template>
  <ActionButton :action="onAction" :icon="icon" :tooltip="text"/>
</template>
