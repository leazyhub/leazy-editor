<script setup lang="ts">
// import * as Y from 'yjs'
// import {WebsocketProvider} from 'y-websocket'
import type { AnyExtension, Editor } from '@tiptap/core'
import {EditorContent, useEditor} from '@tiptap/vue-3'
import {differenceBy, getCssUnitWithDefault, /* getRandomUser */} from '@/utils'
import BubbleMenu from '@/features/bubble/BubbleMenu.vue'
import LinkBubbleMenu from '@/features/bubble/LinkBubbleMenu.vue'
import AIMenu from '@/features/bubble/AIMenu.vue'
import TableBubbleMenu from '@/extensions/Table/menus/TableBubbleMenu.vue'
import ContentMenu from '@/features/bubble/ContentMenu.vue'
import ColumnsMenu from '@/extensions/MultiColumn/menus/ColumnsMenu.vue'
import AlertMenu from '@/extensions/Alert/menus/AlertMenus.vue'
import {BaseKit} from '@/extensions'
import type {LeazyEditorOnChange} from '@/types'

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
  (event: 'enter' | 'blur' | 'destroy'): void

  (event: 'change', value: LeazyEditorOnChange): void

  (event: 'selectionUpdate', value: Editor): void

  (event: 'update:modelValue', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  output: 'html',
  dense: false,
  disabled: false,
  hideToolbar: false,
  disableBubble: false,
  hideBubble: false,
  removeDefaultWrapper: false,
  maxWidth: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  extensions: () => [],
  editorClass: undefined,
  contentClass: undefined,
})

const emit = defineEmits<Emits>()
// const status = ref('connecting')
// const currentUser = ref(getRandomUser())
const attrs = useAttrs()
const { state, isFullscreen } = useProvideTiptapStore()

// Configuration dynamique des extensions
// let provider
// const ydoc = new Y.Doc()

// if (process.client) { provider = new WebsocketProvider(useRuntimeConfig().public.WEBSOCKET_URL, 'leazy_lesson', ydoc) }

// const statusHandler = (event: { status: string }) => {
//   console.log('status', event.status)
//   status.value = event.status;
// };
// provider?.on("status", statusHandler);

const sortExtensions = computed(() => {
  const baseExtensions = [
    ...props.extensions,
    BaseKit.configure({
      collaboration: false,
      collaborationCursor: false,
      // collaboration: {
      //   document: ydoc
      // },
      // collaborationCursor: {
      //   provider
      // },
      // history: false
    })
  ]

  const diff = differenceBy(baseExtensions, state.extensions, 'name')
  const exts = state.extensions.map(k => {
    const find = baseExtensions.find(ext => ext.name === k.name)
    return find ? k.configure(find.options) : k
  })
  return [...exts, ...diff]
})

// Utilisation de `useEditor` pour initialiser l'éditeur
const editor = useEditor({
  content: props.modelValue,
  extensions: sortExtensions.value,
  editorProps: {
    handleKeyDown: (view, event) => {
      if (event.key === 'Enter' && attrs.enter && !event.shiftKey) {
        emit('enter')
        return true
      }
      return false
    },
  },
  onUpdate: ({editor}) => {
    const output = getOutput(editor, props.output as any)
    emit('update:modelValue', output)
    emit('change', {editor, output})
  },
  onSelectionUpdate: ({editor}) => emit('selectionUpdate', editor),
  onBlur: () => emit('blur'),
  onDestroy: () => emit('destroy'),
  autofocus: false,
  editable: !props.disabled,
  injectCSS: true,
})

// watch(currentUser, async () => {
//   await nextTick()
//   if (editor.value && currentUser.value) {
//     localStorage.setItem("currentUser", JSON.stringify(currentUser.value));
//     editor.value.chain().focus().updateUser(currentUser.value).run()
//   }
// }, { immediate: true, deep: true })

const contentDynamicStyles = computed(() => {
  const maxWidth = getCssUnitWithDefault(props.maxWidth)
  return {
    maxWidth: maxWidth,
    minHeight: getCssUnitWithDefault(props.minHeight),
    maxHeight: getCssUnitWithDefault(props.maxHeight),
    margin: maxWidth ? '8px auto' : undefined,
  }
})

function getOutput(editor, output) {
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

// onUnmounted(() => {
//   if (provider) {
//     provider.off('status', statusHandler)
//     provider.disconnect()
//     provider.destroy()
//   }
//   ydoc?.destroy()
// })

defineExpose({ editor })
</script>

<template>
  <div v-if="editor" class="leazy-editor flex flex-col z-0" :class="[editorClass, dense ? 'dense' : '']">
    <ContentMenu :editor="editor" />
    <LinkBubbleMenu :editor="editor" />
    <ColumnsMenu :editor="editor" />
    <AlertMenu :editor="editor" />
    <AIMenu :editor="editor" />
    <TableBubbleMenu :editor="editor" />
    <BubbleMenu v-if="!hideBubble" :editor="editor" :disabled="disableBubble" />
    <div class="flex flex-col w-full flex-1" :class="[isFullscreen && 'fixed bg-background inset-0 z-[200] w-full h-full m-0 rounded-none']">
      <Toolbar v-if="!hideToolbar && !disabled" :editor="editor" :style="contentDynamicStyles" class="z-10 px-[25px] sticky top-4 left-0" />
      <EditorContent :editor="editor" class="flex-1 w-full" :class="contentClass" :style="contentDynamicStyles" suppressContentEditableWarning />
    </div>
  </div>
</template>

<style lang="scss">
  @use '../assets/css/index';
</style>
