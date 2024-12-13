<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'
import LinkEditBlock from './LinkEditBlock.vue'
import type { ButtonViewReturnComponentProps } from '../../../types'

interface Props {
  editor: Editor
  icon?: any
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcuts?: string[]
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  title: undefined,
  tooltip: undefined,
  disabled: false,
  shortcuts: undefined,
  action: undefined,
  isActive: undefined,
})

function onSetLink(link: string, text?: string, openInNewTab?: boolean) {
  if (props.action) {
    props.action({ link, text, openInNewTab })
  }
}
</script>

<template>
  <UPopover>
    <ActionButton :disabled="disabled" :icon="icon" :is-active="isActive" :tooltip="tooltip" />
    
    <template #content>
      <LinkEditBlock :editor="editor" @onSetLink="onSetLink" />
    </template>
  </UPopover>
</template>
