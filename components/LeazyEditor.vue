<script setup lang="ts">
import type { AnyExtension, Editor } from '@tiptap/core'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { differenceBy, getCssUnitWithDefault, isEqual } from '@/utils'
import BubbleMenu from '@/features/bubble/BubbleMenu.vue'
import LinkBubbleMenu from '@/features/bubble/LinkBubbleMenu.vue'
import TableBubbleMenu from '@/extensions/Table/menus/TableBubbleMenu.vue'
import ContentMenu from '@/features/bubble/ContentMenu.vue'
import ColumnsMenu from '@/extensions/MultiColumn/menus/ColumnsMenu.vue'
import AlertMenu from '@/extensions/Alert/menus/AlertMenus.vue'
import type { LeazyEditorOnChange } from '@/types'

import { BaseKit } from '@/extensions'

// type HandleKeyDown = NonNullable<EditorOptions['editorProps']['handleKeyDown']>
// type OnUpdate = NonNullable<EditorOptions['onUpdate']>

interface Props {
  modelValue?: string | object
  output?: 'html' | 'json' | 'text'
  dense?: boolean
  disabled?: boolean
  label?: string
  hideToolbar?: boolean
  disableBubble?: boolean
  hideBubble?: boolean
  removeDefaultWrapper?: boolean
  maxWidth?: string | number
  minHeight?: string | number
  maxHeight?: string | number
  extensions?: AnyExtension[]
  editorClass?: string | string[] | Record<string, any>
  contentClass?: string | string[] | Record<string, any>
}

interface Emits {
  (event: 'enter'): void
  (event: 'change', value: LeazyEditorOnChange): void
  (event: 'update:modelValue', value: Props['modelValue']): void
}

// const value = defineModel<string>('value')

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  output: 'html',
  dense: false,
  disabled: false,
  label: undefined,
  hideToolbar: false,
  disableBubble: false,
  hideBubble: false,
  removeDefaultWrapper: false,
  maxWidth: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  extensions: () => [BaseKit],
  editorClass: undefined,
  contentClass: undefined,
})

const emit = defineEmits<Emits>()

const attrs = useAttrs()

const { state, isFullscreen } = useProvideTiptapStore()

const sortExtensions = computed<AnyExtension[]>(() => {
  const diff = differenceBy(props.extensions, state.extensions, 'name')
  const exts = state.extensions.map((k, i) => {
    const find = props.extensions.find(ext => ext.name === k.name)
    if (!find) return k
    return k.configure(find.options)
  })
  return [...exts, ...diff].map((k, i) => k.configure({ sort: i }))
})

const editor = useEditor({
  content: props.modelValue,
  editorProps: {
    handleKeyDown: (view, event) => {
      if (event.key === 'Enter' && attrs.enter && !event.shiftKey) {
        emit('enter')
        return true
      }

      return false
    },
  },
  onUpdate: ({ editor }) => {
    const output = getOutput(editor, props.output as any)
    emit('update:modelValue', output)
    emit('change', { editor, output })
  },
  extensions: unref(sortExtensions),
  autofocus: false,
  editable: !props.disabled,
  injectCSS: true,
})

const contentDynamicStyles = computed(() => {
  const maxWidth = getCssUnitWithDefault(props.maxWidth)

  const maxHeightStyle = {
    maxWidth: maxWidth,
    width: !maxWidth ? undefined : '100%',
    margin: !maxWidth ? undefined : '8px auto',
  }
  if (unref(isFullscreen)) return { height: '100%', ...maxHeightStyle }

  const minHeight = getCssUnitWithDefault(props.minHeight)
  const maxHeight = getCssUnitWithDefault(props.maxHeight)

  return {
    minHeight,
    maxHeight,
    ...maxHeightStyle,
  }
})

function getOutput(editor: Editor, output: Props['output']) {
  if (props.removeDefaultWrapper) {
    if (output === 'html') return editor.isEmpty ? '' : editor.getHTML()
    if (output === 'json') return editor.isEmpty ? {} : editor.getJSON()
    if (output === 'text') return editor.isEmpty ? '' : editor.getText()
    return ''
  }

  if (output === 'html') return editor.getHTML()
  if (output === 'json') return editor.getJSON()
  if (output === 'text') return editor.getText()
  return ''
}

const onValueChange = (val: NonNullable<Props['modelValue']>) => {
  if (!editor) return

  const output = getOutput(editor, props.output as any)

  if (isEqual(output, val)) return

  const { from, to } = editor.state.selection
  editor.commands.setContent(val, false)
  editor.commands.setTextSelection({ from, to })
}

const onDisabledChange = (val: boolean) => editor?.setEditable(!val)

defineExpose({ editor })
</script>

<template>
  <div v-if="editor" class="leazy-editor flex flex-col z-0" :class="[editorClass, dense ? 'dense' : '']">
    <ContentMenu :editor="editor" />
    <LinkBubbleMenu :editor="editor" />
    <ColumnsMenu :editor="editor" />
    <AlertMenu :editor="editor" />
    <TableBubbleMenu :editor="editor" />
    <BubbleMenu v-if="!hideBubble" :editor="editor" :disabled="disableBubble" />
    <div class="flex flex-col w-full flex-1" :class="[isFullscreen && 'fixed bg-background inset-0 z-[200] w-full h-full m-0 rounded-none']">
      <Toolbar v-if="!hideToolbar && !disabled" :editor="editor" :style="contentDynamicStyles" class="z-10 px-[25px] sticky top-4 left-0" />
      <EditorContent :editor="editor" class="flex-1" :class="contentClass" :style="contentDynamicStyles" suppressContentEditableWarning />
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/css/index.scss';
</style>
