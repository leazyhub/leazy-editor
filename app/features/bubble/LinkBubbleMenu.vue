<script lang="ts" setup>
import { BubbleMenu, type Editor } from '@tiptap/vue-3'
import LinkEditBlock from '../../extensions/Link/components/LinkEditBlock'
import LinkViewBlock from '../../extensions/Link/components/LinkViewBlock'

interface Props {
  editor: Editor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const showEdit = ref(false)
const link = computed(() => {
  const { href: link } = props.editor.getAttributes('link')
  return link
})
const shouldShow: any = computed(() => {
  const isActive = props.editor.isActive('link')
  return isActive
})

function onSetLink(url: string, text?: string, openInNewTab?: boolean) {
  props.editor
    .chain()
    .extendMarkRange('link')
    .insertContent({
      type: 'text',
      text: text,
      marks: [
        {
          type: 'link',
          attrs: {
            href: url,
            target: openInNewTab ? '_blank' : '',
          },
        },
      ],
    })
    .setLink({ href: url })
    .focus()
    .run()
  showEdit.value = false
}

function unSetLink() {
  props.editor.chain().extendMarkRange('link').unsetLink().focus().run()
  showEdit.value = false
}
</script>

<template>
  <BubbleMenu
    v-show="shouldShow"
    :editor="editor"
    :tippy-options="{
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      placement: 'bottom-start',
      offset: [-2, 16],
      zIndex: 9999,
      onHidden: () => {
        showEdit = false
      },
    }"
  >
    <LinkEditBlock v-if="showEdit" :editor="editor" @onSetLink="onSetLink" />
    <LinkViewBlock v-else :editor="editor" :link="link" @clear="unSetLink" @edit="showEdit = true" />
  </BubbleMenu>
</template>
