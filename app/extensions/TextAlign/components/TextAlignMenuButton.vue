<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'
import type { ButtonViewReturnComponentProps } from '../../../types'

export interface Item {
  title: string
  icon?: keyof typeof icons
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: StyleValue
  shortcuts?: string[]
  disabled?: boolean
  divider?: boolean
  default?: boolean
}
interface Props {
  editor: Editor
  disabled?: boolean
  color?: string
  maxHeight?: string | number
  icon?: any
  tooltip?: string
  items?: Item[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  color: undefined,
  maxHeight: undefined,
  icon: undefined,
  tooltip: '',
  items: () => [],
})

const active = computed(() => {
  const find: any = props.items.find((k: any) => k.isActive())
  if (find && !find.default) {
    return {
      ...find,
      icon: find.icon ? find.icon : props.icon,
    }
  }
  const item: Item = {
    title: props.tooltip,
    icon: props.icon,
    isActive: () => false,
  }

  return item
})
const showPopover = ref(false)

function toggleHeading(key: string, item: any) {
  item.action()
  showPopover.value = false
}

function togglePop() {
  showPopover.value = !showPopover.value
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom' }">
    <ActionButton enable-tooltip :icon="icon" dropdown :tooltip="tooltip">
      <template #icon>
        <UIcon name="i-heroicons-chevron-down-20-solid" />
      </template>
    </ActionButton>

    <template #panel>
      <div class="flex items-center">
        <UTooltip v-for="(item, index) in props.items" :key="index" :text="item.title" :shortcuts="item.shortcuts">
          <UButton size="xs" :disabled="item.disabled" :style="item.style" :icon="item.icon" :variant="active.title === item.title ? 'soft' : 'ghost'" :color="active.title === item.title ? 'primary' : 'gray'" @click="item.action" />
        </UTooltip>
      </div>
    </template>
  </UPopover>
</template>
