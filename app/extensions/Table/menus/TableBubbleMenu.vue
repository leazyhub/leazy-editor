<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import type { CellSelection } from '@tiptap/pm/tables'
import TableCellMenu from './TableCell'
import TableRowMenu from './TableRow'
import TableColumnMenu from './TableColumn'

interface Props {
  editor: Editor
}

const props = withDefaults(defineProps<Props>(), {})

function onDeleteTable() {
  props.editor.chain().focus().deleteTable().run()
}

function onSetCellBackground(color: string) {
  props.editor.chain().focus().setTableCellBackground(color).run()
}

function onMergeCell() {
  props.editor.chain().focus().mergeCells().run()
}

function onSplitCell() {
  const posQueue: Array<number> = []
  ;(props.editor.state.selection as CellSelection).forEachCell((cell, pos) => {
    if (cell.attrs.colspan > 1 || cell.attrs.rowspan > 1) {
      posQueue.push(pos)
    }
  })
  let chain = props.editor.chain()
  posQueue
    .sort((x, y) => y - x)
    .forEach(pos => {
      chain = chain.setCellSelection({ anchorCell: pos }).splitCell()
    })
  chain.run()
}
</script>
<template>
  <TableCellMenu
    :editor="editor"
    @on-delete-table="onDeleteTable"
    @on-split-cell="onSplitCell"
    @on-merge-cell="onMergeCell"
    @set-cell-background="onSetCellBackground"
  />
  <TableColumnMenu
    :editor="editor"
    @on-split-cell="onSplitCell"
    @on-merge-cell="onMergeCell"
    @set-cell-background="onSetCellBackground"
  />
  <TableRowMenu
    :editor="editor"
    @on-split-cell="onSplitCell"
    @on-merge-cell="onMergeCell"
    @set-cell-background="onSetCellBackground"
  />
</template>
