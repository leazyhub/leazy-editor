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
    <ActionButton :icon="icon" :tooltip="tooltip" dropdown enable-tooltip>
      <template #icon>
        <Suspense>
          <UIcon name="i-lucide-chevron-down" />
        </Suspense>
      </template>
    </ActionButton>
    
    <template #content>
      <div class="flex items-center">
        <UTooltip v-for="(item, index) in props.items" :key="index" :shortcuts="item.shortcuts" :text="item.title">
          <UButton
            :color="active.title === item.title ? 'primary' : 'neutral'" :disabled="item.disabled" :icon="item.icon" :style="item.style"
            :variant="active.title === item.title ? 'soft' : 'ghost'"
            size="xs" @click="item.action"
          />
        </UTooltip>
      </div>
    </template>
  </UPopover>
</template>
