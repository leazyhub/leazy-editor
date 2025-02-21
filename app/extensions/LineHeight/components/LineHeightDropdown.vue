<script lang="ts" setup>
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
    <ActionButton :tooltip="tooltip" custom-class="w-12" icon="i-lucide-list-plus">
      <Suspense>
        <UIcon name="i-lucide-chevron-down" />
      </Suspense>
    </ActionButton>
    
    <template #content>
      <div class="flex flex-col min-w-24">
        <UButton
          v-for="(item, index) in LineHeights"
          :key="index"
          :class="{ 'bg-zinc-100': item.value === value }"
          :color="item.value === value ? 'primary' : 'neutral'"
          :label="item.label"
          :variant="item.value === value ? 'soft' : 'ghost'"
          @click="toggleLightheight(item.value)"
        />
      </div>
    </template>
  </UPopover>
</template>
