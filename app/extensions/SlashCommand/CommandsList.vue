<script lang="ts" setup>
import type { MenuListProps } from './types'

// Selected index
const selectedCommandIndex = ref(0)
const selectedGroupIndex = ref(0)

// Refs
const commandListContainer = ref<HTMLDivElement | null>(null)

const activeItemRef = ref<VNodeRef | null>(null)
const props = withDefaults(defineProps<MenuListProps>(), {
  items: undefined,
  command: undefined,
})

function onKeyDown({ event }) {
  if (event.key === 'ArrowUp') {
    upHandler()
    scrollToSelected()
    return true
  }
  
  if (event.key === 'ArrowDown') {
    downHandler()
    scrollToSelected()
    return true
  }
  
  if (event.key === 'Enter') {
    enterHandler()
    return true
  }
  
  return false
}

function upHandler() {
  if (!props.items.length) {
    return false
  }
  let newCommandIndex = selectedCommandIndex.value - 1
  let newGroupIndex = selectedGroupIndex.value
  
  if (newCommandIndex < 0) {
    newGroupIndex = selectedGroupIndex.value - 1
    newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0
  }
  
  if (newGroupIndex < 0) {
    newGroupIndex = props.items.length - 1
    newCommandIndex = props.items[newGroupIndex].commands.length - 1
  }
  
  selectedCommandIndex.value = newCommandIndex
  selectedGroupIndex.value = newGroupIndex
}

function downHandler() {
  if (!props.items.length) {
    return false
  }
  const commands = props.items[selectedGroupIndex.value].commands
  let newCommandIndex = selectedCommandIndex.value + 1
  let newGroupIndex = selectedGroupIndex.value
  
  if (commands.length - 1 < newCommandIndex) {
    newCommandIndex = 0
    newGroupIndex = selectedGroupIndex.value + 1
  }
  if (props.items.length - 1 < newGroupIndex) {
    newGroupIndex = 0
  }
  selectedCommandIndex.value = newCommandIndex
  selectedGroupIndex.value = newGroupIndex
}

function enterHandler() {
  if (!props.items.length || selectedGroupIndex.value === -1 || selectedCommandIndex.value === -1) {
    return false
  }
  
  selectItem(selectedGroupIndex.value, selectedCommandIndex.value)
}

function selectItem(groupIndex: number, commandIndex: number) {
  const command = props.items[groupIndex].commands[commandIndex]
  props.command(command)
}

function createCommandClickHandler(groupIndex: number, commandIndex: number) {
  selectItem(groupIndex, commandIndex)
}

const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight
  const itemHeight = item ? item.offsetHeight : 0
  
  const top = item.offsetTop
  const bottom = top + itemHeight
  
  if (top < container.scrollTop) container.scrollTop -= container.scrollTop - top + 5
  else if (bottom > containerHeight + container.scrollTop) container.scrollTop += bottom - containerHeight - container.scrollTop + 5
}

const scrollToSelected = () => {
  const container = commandListContainer.value
  const item = container?.children[selectedGroupIndex.value]?.children[selectedCommandIndex.value + 1] as HTMLElement
  
  if (container && item) updateScrollView(container, item)
}

defineExpose({ onKeyDown })
</script>

<template>
  <div
    v-if="items?.length"
    ref="commandListContainer"
    class="flex flex-col z-50 h-full max-h-[330px] w-60 overflow-y-auto rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-1 gap-1 shadow-md transition-all"
  >
    <div v-for="(group, groupIndex) in items" :key="group.title" class="flex flex-col">
      <div
        class="text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-2 font-semibold tracking-wider pointer-events-none select-none uppercase first:mt-0.5"
      >{{ $t(group.title) }}
      </div>
      <UButton
        v-for="(command, commandIndex) in group.commands"
        :key="commandIndex"
        :ref="selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex ? 'activeItemRef' : ''"
        :active="selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex"
        :color="selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex ? 'primary' : 'white'"
        :variant="selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex ? 'soft' : 'ghost'"
        @click="createCommandClickHandler(groupIndex, commandIndex)"
      >
        <template v-if="command?.iconName" #leading>
          <div
            class="flex items-center justify-center p-px font-medium border rounded-sm border-gray-200 dark:border-gray-700"
          >
            <Suspense>
              <UIcon :name="command.iconName" class="w-3.5 h-3.5 text-lg" dynamic />
            </Suspense>
          </div>
        </template>
        
        <div class="flex flex-1 items-center justify-between">
          <span>{{ $t(command.label) }}</span>
          <div v-if="command.shortcuts?.length" class="flex items-center gap-0.5 ml-auto">
            <UKbd v-for="(shortcut, index) in command.shortcuts" :key="index" :value="shortcut" size="xs" />
          </div>
        </div>
      </UButton>
    </div>
  </div>
</template>
