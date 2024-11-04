<script setup lang="ts">
interface MenuItem {
  label: string
  isHovered?: boolean
  children?: MenuItem[]
}

defineProps<{
  items: MenuItem[]
}>()
const emit = defineEmits<{
  (e: 'itemClick', item: MenuItem): void
}>()

const hoveredState = ref<Record<string, boolean>>({})

const handleMouseEnter = (label: string) => {
  hoveredState.value[label] = true
}

const handleMouseLeave = (label: string) => {
  hoveredState.value[label] = false
}

const handleClick = (item: MenuItem) => {
  if (item.children) {
    return
  }
  emit('itemClick', item)
}
</script>

<template>
  <div class="p-1 shadow-md rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 max-w-fit">
    <div v-for="item in items" :key="item.label" class="relative" @mouseenter="handleMouseEnter(item.label)" @mouseleave="handleMouseLeave(item.label)" @click="handleClick(item)">
      <UButton class="w-full" :label="item.label" variant="ghost" color="white" size="xs">
        <template v-if="item.children" #trailing>
          <UIcon name="i-heroicons-chevron-right-20-solid" class="ml-auto" />
        </template>
      </UButton>

      <div v-if="item.children && hoveredState[item.label]" class="absolute left-full top-0 p-1 flex flex-col shadow-md rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 min-w-max">
        <UButton v-for="subItem in item.children" :key="subItem.label" @click="handleClick(subItem)" :label="subItem.label" variant="ghost" color="white" size="xs" />
      </div>
    </div>
  </div>
</template>
