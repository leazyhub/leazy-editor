<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import ActionMenuButton from '../../../components/ActionMenuButton.vue'
import type { ButtonViewReturnComponentProps } from '../../../types'
import { getShortcutKey } from '../../../utils/plateform'

export interface Item {
  title: string
  icon?: any
  level?: number
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
  shortcuts?: string[]
  maxHeight?: string | number
  tooltip?: string
  items?: Item[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  color: undefined,
  maxHeight: undefined,
  tooltip: '',
  shortcuts: undefined,
  items: () => [],
})

const active = computed(() => {
  const find: any = props.items.find((k: any) => k.isActive())
  if (find && !find.default) {
    return {
      ...find,
    }
  }
  const item: Item = {
    title: props.tooltip,
    level: 0,
    isActive: () => false,
  }
  return item
})
</script>

<template>
  <UPopover>
    <ActionMenuButton :title="active.title" :tooltip="tooltip" />

    <template #panel>
      <div class="flex flex-col">
        <UButton v-for="(item, index) in props.items" :key="index" :variant="active.title === item.title ? 'soft' : 'ghost'" :color="active.title === item.title ? 'primary' : 'gray'" @click="item.action">
          <div class="ml-1 h-full" :class="`heading-` + item.level">{{ item.title }}</div>
          <UKbd class="ml-auto" :value="item.shortcuts?.map(item => getShortcutKey(item)).join(' ')" />
        </UButton>
      </div>
    </template>
  </UPopover>
</template>
