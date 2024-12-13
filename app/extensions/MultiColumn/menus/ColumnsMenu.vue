<script lang="ts" setup>
import { sticky } from 'tippy.js'
import { BubbleMenu, type Editor, isActive } from '@tiptap/vue-3'
import ActionButton from '../../../components/ActionButton.vue'
import { ColumnLayout } from '../Columns'
import { getRenderContainer } from '../../../utils/get-render-container'

interface Props {
  editor: Editor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const shouldShow = ({ editor }) => {
  return isActive(editor.view.state, 'columns')
}
// Get the reference client rect for the bubble menu
const getReferenceClientRect = () => {
  const renderContainer = getRenderContainer(props.editor, 'columns')
  const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
  
  return rect
}

const onColumnLeft = () => {
  props.editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
}

const onColumnRight = () => {
  props.editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
}

const onColumnTwo = () => {
  props.editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
}
</script>

<template>
  <BubbleMenu
    :editor="editor"
    :shouldShow="shouldShow"
    :tippy-options="{
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      getReferenceClientRect,
      plugins: [sticky],
      sticky: 'popper',
    }"
    :updateDelay="0"
    pluginKey="columns"
  >
    <div class="bg-white rounded-lg dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
      <div class="flex gap-1 items-center">
        <ActionButton
          :action="onColumnLeft"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.SidebarLeft })"
          :tooltip-options="{ sideOffset: 15 }"
          icon="i-lucide-panel-left"
          title="ok"
          tooltip="Panel Left"
        />
        <ActionButton
          :action="onColumnTwo"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.TwoColumn })"
          :tooltip-options="{ sideOffset: 15 }"
          icon="i-lucide-columns-2"
          title="ok"
          tooltip="Two Columns"
        />
        <ActionButton
          :action="onColumnRight"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.SidebarRight })"
          :tooltip-options="{ sideOffset: 15 }"
          icon="i-lucide-panel-right"
          title="ok"
          tooltip="Panel Right"
        />
      </div>
    </div>
  </BubbleMenu>
</template>
