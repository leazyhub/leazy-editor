<template>
  <div
      v-if="items.length"
      class="items z-50 flex flex-col h-auto max-h-[330px] w-28 overflow-y-auto rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-1 gap-1 shadow-md transition-all">
    <UButton
        v-for="(item, index) in items"
        :key="index"
        :active="index === selectedIndex"
        :color="index === selectedIndex ? 'primary' : 'gray'"
        :variant="index === selectedIndex ? 'soft' : 'ghost'"
        size="xs"
        @click="selectItem(index)"
    >
      <template #leading>
        <div
            class="flex items-center justify-center p-px font-medium border rounded-sm border-gray-200 dark:border-gray-700">
          <img v-if="item.fallbackImage" :alt="item.name" :src="item.fallbackImage" align="absmiddle" class="w-4">
        </div>
      </template>

      <span>:{{ item.name }}:</span>
    </UButton>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },

    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command({ name: item.name })
      }
    }
  }
}
</script>
