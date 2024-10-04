<script setup lang="ts">
import { BubbleMenu, type Editor } from '@tiptap/vue-3'

interface Props {
  editor: Editor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const { t } = useI18n()
const tippyOptions = reactive<Record<string, unknown>>({
  maxWidth: 'auto',
  zIndex: 20,
  appendTo: 'parent',
  moveTransition: 'transform 0.15s ease-out',
})
</script>
<template>
  <BubbleMenu :editor="editor" :tippy-options="tippyOptions">
    <div class="leazy-editor-editor__menu-bubble">
      <div class="leazy-editor-editor__menu-bubble__content bg-background">
        <div class="leazy-editor-editor__menu-bubble__container">12321</div>
      </div>
    </div>
  </BubbleMenu>
</template>
