<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'
import type { ButtonViewReturnComponentProps } from '../../../types'
import { getShortcutKeys } from '../../../utils/plateform'

export interface Item {
  title: string
  icon?: string
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
</script>

<template>
  <UPopover :popper="{ placement: 'bottom' }">
    <ActionButton :icon="icon" :tooltip="tooltip">
      <template #icon>
        <UIcon name="i-heroicons-chevron-down-20-solid" />
      </template>
    </ActionButton>

    <template #panel>
      <UButton v-for="(item, index) in props.items" size="xs" :key="index" :disabled="disabled" @click="item.action" :variant="active.title === item.title ? 'soft' : 'ghost'" :color="active.title === item.title ? 'primary' : 'gray'">
        <div class="flex items-center justify-between gap-2">
          <UIcon v-if="item.icon" :name="item.icon" dynamic />
          <template v-if="item.shortcuts">
            <UKbd size="2xs" v-for="shortcut in getShortcutKeys(item.shortcuts)" :value="shortcut" />
          </template>
        </div>
      </UButton>
    </template>
  </UPopover>
</template>
