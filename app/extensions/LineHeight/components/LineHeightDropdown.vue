<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'
import type { ButtonViewReturnComponentProps } from '../../../types'

const { t } = useI18n()

function percentageToDecimal(percentageString) {
  // Remove percentage sign
  const percentage = parseFloat(percentageString.replace('%', ''))
  // Convert percentage to decimal
  return percentage / 100
}
const LineHeights = computed(() => {
  const lineHeightOptions = props.editor.extensionManager.extensions.find(e => e.name === 'lineHeight')!.options
  const a = lineHeightOptions.lineHeights
  const b = a.map(item => ({
    label: percentageToDecimal(item),
    value: item,
  }))

  b.unshift({
    label: unref(t)('editor.default'),
    value: 'default',
  })
  return b
})

const value = ref('default')
interface Props {
  editor: Editor
  icon?: any
  tooltip?: string
  disabled?: boolean
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  tooltip: undefined,
  disabled: false,
  action: undefined,
  isActive: undefined,
})

function toggleLightheight(key: string) {
  if (key === 'default') {
    props.editor.commands.unsetLineHeight()
  } else {
    props.editor.commands.setLineHeight(key)
  }
  value.value = key
}
</script>

<template>
  <UPopover>
    <ActionButton custom-class="w-12" icon="i-fluent-text-line-spacing-24-regular" :tooltip="tooltip">
      <UIcon class="w-3 h-3 text-zinc-500 ml-1" name="i-heroicons-chevron-down-20-solid" />
    </ActionButton>

    <template #panel>
      <div class="flex flex-col min-w-24">
        <UButton v-for="(item, index) in LineHeights" :key="index" :variant="item.value === value ? 'soft' : 'ghost'" :color="item.value === value ? 'primary' : 'gray'" :label="item.label" :class="{ 'bg-zinc-100': item.value === value }" @click="toggleLightheight(item.value)" />
      </div>
    </template>
  </UPopover>
</template>
