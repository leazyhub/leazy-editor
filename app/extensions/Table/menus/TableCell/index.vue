<script setup lang="ts">
import { BubbleMenu, type Editor } from '@tiptap/vue-3'
import { Editor as CoreEditor } from '@tiptap/core'
import { EditorState, type NodeSelection } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { CellSelection } from '@tiptap/pm/tables'
import { analyzeCellSelection, isTableCellSelected, isTableSelected } from '../../utils'
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
export interface Emits {
  (event: 'onDeleteTable'): void
  (event: 'onMergeCell'): void
  (event: 'onSplitCell'): void
  (event: 'setCellBackground', value: string): void
}
const emits = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {})

const shouldShow = ({ view, state, from }: ShouldShowProps) => {
  if (!state) {
    return false
  }
  return isTableCellSelected({
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
</script>

<template>
  <BubbleMenu
    :editor="editor"
    pluginKey="tableCellMenu"
    :updateDelay="0"
    :should-show="shouldShow"
    :tippy-options="{
      appendTo: 'parent',
      offset: [0, 15],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
    }"
  >
    <div class="flex flex-row h-full leading-none gap-0.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-border border-gray-200 dark:border-gray-700">
      <ActionButton
        v-if="Selection?.cellCount! > 1"
        tooltip="Merge Cells"
        icon="i-lucide-table-cells-merge"
        :action="() => emits('onMergeCell')"
        :tooltip-options="{
          sideOffset: 15,
        }"
      />

      <ActionButton
        v-if="Selection?.mergedCellCount! > 0"
        tooltip="Split Cell"
        icon="i-lucide-table-cells-split"
        :action="() => emits('onSplitCell')"
        :tooltip-options="{
          sideOffset: 15,
        }"
      />
      <ActionButton
        v-if="isTableSelected(props.editor.state.selection)"
        tooltip="Delete Table"
        icon="i-heroicons-trash"
        :action="() => emits('onDeleteTable')"
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
