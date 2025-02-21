<script lang="ts" setup>
import { TABLE_DEFAULT_SELECTED_GRID_SIZE, TABLE_INIT_GRID_SIZE, TABLE_MAX_GRID_SIZE } from '../../../constants'
import { isMobile } from '../../../utils/is-mobile'

export interface GridSize {
  rows: number
  cols: number
}

export interface CreateTablePayload extends GridSize {
  withHeaderRow: boolean
}

interface Emits {
  (event: 'create-table', payload: CreateTablePayload): void
}

defineProps({
  disabled: {
    default: false,
  },
})
const emit = defineEmits<Emits>()

const menu = ref<boolean>(false)
const withHeaderRow = ref<boolean>(true)
const tableGridSize = reactive<GridSize>({
  rows: isMobile() ? TABLE_MAX_GRID_SIZE : TABLE_INIT_GRID_SIZE,
  cols: isMobile() ? TABLE_MAX_GRID_SIZE : TABLE_INIT_GRID_SIZE,
})

const selectedTableGridSize: GridSize = reactive<GridSize>({
  rows: TABLE_DEFAULT_SELECTED_GRID_SIZE,
  cols: TABLE_DEFAULT_SELECTED_GRID_SIZE,
})

function selectTableGridSize(rows: number, cols: number): void {
  if (rows === tableGridSize.rows) {
    tableGridSize.rows = Math.min(rows + 1, TABLE_MAX_GRID_SIZE)
  }
  
  if (cols === tableGridSize.cols) {
    tableGridSize.cols = Math.min(cols + 1, TABLE_MAX_GRID_SIZE)
  }
  
  selectedTableGridSize.rows = rows
  selectedTableGridSize.cols = cols
}

function onMouseDown(rows: number, cols: number) {
  emit('create-table', { rows, cols, withHeaderRow: unref(withHeaderRow) })
  resetTableGridSize()
}

function resetTableGridSize(): void {
  menu.value = false
  withHeaderRow.value = false
  
  tableGridSize.rows = TABLE_INIT_GRID_SIZE
  tableGridSize.cols = TABLE_INIT_GRID_SIZE
  
  selectedTableGridSize.rows = TABLE_DEFAULT_SELECTED_GRID_SIZE
  selectedTableGridSize.cols = TABLE_DEFAULT_SELECTED_GRID_SIZE
}
</script>

<template>
  <UPopover>
    <UButton :disabled="disabled" :padded="false" color="neutral" variant="ghost">
      <slot name="trigger" />
    </UButton>
    
    <template #content>
      <div class="table-grid-size-editor p-2">
        <div class="flex flex-col flex-wrap gap-1 justify-between">
          <div v-for="row in tableGridSize.rows" :key="'r' + row" class="flex gap-1">
            <div
              v-for="col in tableGridSize.cols"
              :key="'c' + col"
              :class="[
                col <= selectedTableGridSize.cols && row <= selectedTableGridSize.rows && 'bg-neutral-700 dark:bg-white border-border',
                'cursor-pointer',
              ]"
              class="pa-1"
              @mousedown="onMouseDown(row, col)"
              @mouseover="selectTableGridSize(row, col)"
            >
              <div class="w-4 h-4 p-1 border rounded-[2px] box-border"></div>
            </div>
          </div>
        </div>
        <div class="text-center text-sm text-zinc-600 mt-2">
          {{ selectedTableGridSize.rows }} x {{ selectedTableGridSize.cols }}
        </div>
      </div>
    </template>
  </UPopover>
</template>
