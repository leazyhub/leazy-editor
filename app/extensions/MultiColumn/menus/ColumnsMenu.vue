<script setup lang="ts">
import { sticky } from 'tippy.js'
import { BubbleMenu, isActive, type Editor } from '@tiptap/vue-3'
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
    pluginKey="columns"
    :shouldShow="shouldShow"
    :updateDelay="0"
    :tippy-options="{
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      getReferenceClientRect,
      plugins: [sticky],
      sticky: 'popper',
    }"
  >
    <div class="bg-white rounded-lg dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex gap-1 items-center">
        <ActionButton
          title="ok"
          icon="i-lucide-panel-left"
          tooltip="Panel Left"
          :action="onColumnLeft"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.SidebarLeft })"
          :tooltip-options="{ sideOffset: 15 }"
        />
        <ActionButton
          title="ok"
          icon="i-lucide-columns-2"
          tooltip="Two Columns"
          :action="onColumnTwo"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.TwoColumn })"
          :tooltip-options="{ sideOffset: 15 }"
        />
        <ActionButton
          title="ok"
          icon="i-lucide-panel-right"
          tooltip="Panel Right"
          :action="onColumnRight"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.SidebarRight })"
          :tooltip-options="{ sideOffset: 15 }"
        />
      </div>
    </div>
  </BubbleMenu>
</template>
