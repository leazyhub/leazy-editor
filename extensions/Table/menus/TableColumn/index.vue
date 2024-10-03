<script setup lang="ts">
import { BubbleMenu, type Editor } from '@tiptap/vue-3'
import { Editor as CoreEditor } from '@tiptap/core'
import { EditorState, type NodeSelection } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { CellSelection } from '@tiptap/pm/tables'
import { analyzeCellSelection, isColumnGripSelected } from '../../utils'
import ActionButton from '../../../../components/ActionButton.vue'
import HighlightActionButton from '../../../Highlight/components/HighlightActionButton.vue'

interface Props {
  editor: Editor
}
export interface ShouldShowProps {
  editor?: CoreEditor
  view: EditorView
  state?: EditorState
  oldState?: EditorState
  from?: number
  to?: number
}

const props = withDefaults(defineProps<Props>(), {})

export interface Emits {
  (event: 'onMergeCell'): void
  (event: 'onSplitCell'): void
  (event: 'setCellBackground', value: string): void
}
const emits = defineEmits<Emits>()

const shouldShow = ({ view, state, from }: ShouldShowProps) => {
  if (!state) {
    return false
  }
  return isColumnGripSelected({
    editor: props.editor,
    view,
    state,
    from: from || 0,
  })
}

const Selection = computed(() => {
  const NodeSelection = props.editor.state.selection as NodeSelection
  const isCell = NodeSelection instanceof CellSelection
  if (isCell) {
    return analyzeCellSelection(props.editor)
  }
  {
    return null
  }
})

function onAddColumnBefore() {
  props.editor.chain().focus().addColumnBefore().run()
}

function onAddColumnAfter() {
  props.editor.chain().focus().addColumnAfter().run()
}

function onDeleteColumn() {
  props.editor.chain().focus().deleteColumn().run()
}
</script>

<template>
  <BubbleMenu
    :editor="editor"
    pluginKey="tableColumnMenu"
    :updateDelay="150"
    :should-show="shouldShow"
    :tippy-options="{
      appendTo: 'parent',
      offset: [0, 15],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: true }],
      },
    }"
  >
    <div
      class="min-w-32 flex flex-row h-full leading-none gap-0.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-border border-gray-200 dark:border-gray-700"
    >
      <ActionButton
        icon="i-lucide-between-horizontal-end"
        :action="onAddColumnBefore"
        tooltip="Insert Column Before"
        :tooltip-options="{
          sideOffset: 15,
        }"
      />
      <ActionButton
        icon="i-lucide-between-horizontal-start"
        :action="onAddColumnAfter"
        tooltip="Insert Column After"
        :tooltip-options="{
          sideOffset: 15,
        }"
      />

      <ActionButton
        icon="i-heroicons-trash"
        :action="onDeleteColumn"
        tooltip="Delete Column"
        :tooltip-options="{
          sideOffset: 15,
        }"
      />
      <ActionButton
        v-if="Selection?.cellCount! > 1"
        icon="i-lucide-table-cells-merge"
        :action="() => emits('onMergeCell')"
        tooltip="Merge Cells"
        :tooltip-options="{
          sideOffset: 15,
        }"
      />
      <ActionButton
        v-if="Selection?.mergedCellCount! > 0"
        icon="i-lucide-table-cells-split"
        :action="() => emits('onSplitCell')"
        tooltip="Split Cell"
        :tooltip-options="{
          sideOffset: 15,
        }"
      />
      <HighlightActionButton
        :editor="editor"
        tooltip="Set Cell Background"
        :action="color => emits('setCellBackground', color as string)"
        :tooltip-options="{
          sideOffset: 15,
        }"
      />
    </div>
  </BubbleMenu>
</template>
