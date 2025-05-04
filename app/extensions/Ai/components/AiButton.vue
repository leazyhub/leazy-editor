<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import type { ButtonViewReturnComponentProps } from '../../../types'
import ActionButton from '../../../components/ActionButton.vue'

interface Props {
  editor: Editor,
  icon?: string
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcuts?: string[]
  customClass?: string
  loading?: boolean
  tooltipOptions?: object
  color?: string
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
}

const props = withDefaults(defineProps<Props>(), {
  editor: undefined,
  icon: undefined,
  title: undefined,
  tooltip: undefined,
  disabled: false,
  customClass: '',
  color: undefined,
  loading: false,
  shortcuts: undefined,
  tooltipOptions: undefined,
  action: undefined,
  isActive: undefined,
})

const store = useTiptapStore()
const toast = useToast()

const handleOpen = () => {
  const completionsFunc = props.editor.extensionManager.extensions.find(e => e.name === 'Ai')?.options?.completions
  if (typeof completionsFunc !== 'function') {
    toast.add({
      title: 'AI completions method is not set or is not a valid function',
      color: 'error',
    })
    return
  }

  if (completionsFunc.constructor.name !== 'AsyncFunction') {
    toast.add({
      title: 'AI completions method must be an async function',
      color: 'error',
    })
    return
  }

  store!.state.AIMenu = true
  props.editor?.commands.focus()
}
</script>

<template>
  <ActionButton :action="handleOpen" :disabled="disabled" :icon="icon" :tooltip="tooltip" title="AI"/>
</template>
