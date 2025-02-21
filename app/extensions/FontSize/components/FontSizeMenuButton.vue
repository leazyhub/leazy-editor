<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import ActionMenuButton from '../../../components/ActionMenuButton.vue'
import type { ButtonViewReturnComponentProps } from '../../../types'

export interface Item {
  title: string
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: CSSStyleValue
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
  icon: undefined,
  tooltip: '',
  shortcuts: undefined,
  items: () => [],
})
const { t } = useI18n()

const active = computed(() => {
  const find: any = props.items.find((k: any) => k.isActive())
  if (find) {
    return find
  }
  const item: Item = {
    title: t('editor.fontSize.default.tooltip'),
    isActive: () => false,
  }
  return item
})
</script>

<template>
  <UPopover>
    <ActionMenuButton :title="active.title" :tooltip="tooltip"/>

    <template #content>
      <div class="flex flex-col overflow-y-auto max-h-96">
        <template v-for="(item, index) in props.items" :key="index">
          <UButton :color="active.title === item.title ? 'primary' : 'neutral'" :label="item.title" :variant="active.title === item.title ? 'soft' : 'ghost'"
                   @click="item.action"/>
        </template>
      </div>
    </template>
  </UPopover>
</template>
