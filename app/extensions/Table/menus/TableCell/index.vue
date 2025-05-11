<script lang="ts" setup>
import { BubbleMenu, type Editor } from '@tiptap/vue-3'
import { offset } from '@floating-ui/dom'
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

const selection = computed(() => {
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
    :should-show="shouldShow"
    :options="{
      middleware: [offset(15)]
    }"
    :updateDelay="0"
    pluginKey="tableCellMenu"
  >
    <div
      class="flex flex-row h-full leading-none gap-0.5 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-border border-default"
    >
      <ActionButton
        v-if="selection?.cellCount! > 1"
        :action="() => emits('onMergeCell')"
        :tooltip-options="{
          sideOffset: 15,
        }"
        icon="i-lucide-table-cells-merge"
        :tooltip="$t('editor.table.menu.merge_cells')"
      />
      
      <ActionButton
        v-if="selection?.mergedCellCount! > 0"
        :action="() => emits('onSplitCell')"
        :tooltip-options="{
          sideOffset: 15,
        }"
        icon="i-lucide-table-cells-split"
        :tooltip="$t('editor.table.menu.split_cells')"
      />
      <ActionButton
        v-if="isTableSelected(props.editor.state.selection)"
        :action="() => emits('onDeleteTable')"
        :tooltip-options="{
          sideOffset: 15,
        }"
        icon="i-lucide-trash-2"
        :tooltip="$t('editor.table.menu.delete_table')"
      />
      
      <HighlightActionButton
        :action="color => emits('setCellBackground', color as string)"
        :editor="editor"
        :tooltip-options="{
          sideOffset: 15,
        }"
        :tooltip="$t('editor.table.menu.cell_background_color')"
      />
    </div>
  </BubbleMenu>
</template>
