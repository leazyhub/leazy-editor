<script lang="ts" setup>
import { BubbleMenu, type Editor, isActive } from '@tiptap/vue-3'
import { offset } from '@floating-ui/dom'
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
    :option="{
      middleware: [offset(8)]
    }"
    :updateDelay="0"
    pluginKey="columns"
  >
    <div class="bg-white rounded-lg dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
      <div class="flex gap-1 items-center">
        <ActionButton
          :action="onColumnLeft"
          :is-active="() => editor.isActive('columns', { layout: ColumnLayout.SidebarLeft })"
          :tooltip-options="{ sideOffset: 15 }"
          icon="i-lucide-panel-left"
          tooltip="30/70"
        />
        <ActionButton
          :action="onColumnTwo"
          :is-active="() => editor.isActive('columns', { layout: ColumnLayout.TwoColumn })"
          :tooltip-options="{ sideOffset: 15 }"
          icon="i-lucide-columns-2"
          tooltip="50/50"
        />
        <ActionButton
          :action="onColumnRight"
          :is-active="() => editor.isActive('columns', { layout: ColumnLayout.SidebarRight })"
          :tooltip-options="{ sideOffset: 15 }"
          icon="i-lucide-panel-right"
          tooltip="70/30"
        />
      </div>
    </div>
  </BubbleMenu>
</template>
