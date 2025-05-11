<script lang="ts" setup>
import { BubbleMenu, type Editor } from '@tiptap/vue-3'
import { offset } from '@floating-ui/dom'
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
    :should-show="shouldShow"
    :options="{
      middleware: [offset(15)]
    }"
    :updateDelay="150"
    pluginKey="tableColumnMenu"
  >
    <div
      class="min-w-32 flex flex-row h-full leading-none gap-0.5 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-border border-default"
    >
      <ActionButton
        :action="onAddColumnBefore"
        :tooltip-options="{
          sideOffset: 15,
        }"
        icon="i-lucide-between-horizontal-end"
        :tooltip="$t('editor.table.menu.add_column_before')"
      />
      <ActionButton
        :action="onAddColumnAfter"
        :tooltip-options="{
          sideOffset: 15,
        }"
        icon="i-lucide-between-horizontal-start"
        :tooltip="$t('editor.table.menu.add_column_after')"
      />
      
      <ActionButton
        :action="onDeleteColumn"
        :tooltip-options="{
          sideOffset: 15,
        }"
        icon="i-lucide-trash-2"
        :tooltip="$t('editor.table.menu.delete_column')"
      />
      <ActionButton
        v-if="Selection?.cellCount! > 1"
        :action="() => emits('onMergeCell')"
        :tooltip-options="{
          sideOffset: 15,
        }"
        icon="i-lucide-table-cells-merge"
        :tooltip="$t('editor.table.menu.merge_cells')"
      />
      <ActionButton
        v-if="Selection?.mergedCellCount! > 0"
        :action="() => emits('onSplitCell')"
        :tooltip-options="{
          sideOffset: 15,
        }"
        icon="i-lucide-table-cells-split"
        :tooltip="$t('editor.table.menu.split_cells')"
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
