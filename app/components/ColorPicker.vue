<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { COLORS_LIST, DEFAULT_COLOR } from '@/constants'

interface Props {
  modelValue?: string
  highlight?: boolean
}

interface Emits {
  (event: 'update:modelValue', color: string | undefined): void
  
  (event: 'change', color: string | undefined): void
}

// Convert colors array to chunked array
const colorsArray = COLORS_LIST
const chunkedColors: any = []
for (let i = 0; i < colorsArray.length; i += 10) {
  chunkedColors.push(colorsArray.slice(i, i + 10))
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  highlight: false,
})
const html5Color = ref<HTMLInputElement | null>(null)

const recentColorsStore = useLocalStorage<string[]>(props.highlight ? 'recentColorsHighlight' : 'recentColors', [])

const emit = defineEmits<Emits>()

function setRecentColor(color: string) {
  const index = recentColorsStore.value.indexOf(color)
  if (index !== -1) {
    recentColorsStore.value.splice(index, 1)
  }
  recentColorsStore.value.unshift(color)
  if (recentColorsStore.value.length > 10) {
    recentColorsStore.value.pop()
  }
}

function setColor(color: string | undefined) {
  if (color === undefined) {
    // clear color
    emit('update:modelValue', color)
    emit('change', color)
    return
  }
  // check if color is correct
  const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(color)
  if (isCorrectColor) {
    emit('update:modelValue', color)
    emit('change', color)
    setRecentColor(color)
  }
}

const triggerHtml5Color = () => {
  html5Color.value?.click()
}
</script>
<template>
  <UPopover :ui="{ container: 'z-100' }">
    <slot />
    
    <template #content>
      <div class="flex flex-col p-2 w-full h-full">
        <!-- Hightlight -->
        <div
          v-if="highlight" class="flex items-center p-1 rd-1 cursor-pointer hover:bg-neutral-100 hover:dark:bg-neutral-700 rounded-md"
          @click="setColor(undefined)"
        >
          <span
            class="w-6 h-6 p-0.5 inline-block rounded-sm border cursor-pointer hover:border-border hover:shadow-sm relative after:border-b-2 after:border-b-red-500 after:top-[10px] after:h-0 after:left-0 after:w-6 after:absolute after:block after:rotate-[45deg]"
          >
            <span style="background-color: transparent">
              <svg style="fill: rgba(0, 0, 0, 0.4); display: none" viewBox="0 0 18 18">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
              </svg>
            </span>
          </span>
          <span class="text-sm ml-1">{{ $t('editor.nofill') }}</span>
        </div>
        
        <!-- Color -->
        <div v-else class="flex items-center p-1 rd-1 cursor-pointer hover:bg-accent" @click="setColor(undefined)">
          <span class="w-6 h-6 p-0.5 inline-block rounded-sm border border-transparent cursor-pointer">
            <span
              :style="{ backgroundColor: DEFAULT_COLOR }"
              class="relative w-[18px] h-[18px] block rounded-[2px] border-transparent"
            >
              <svg style="fill: rgb(255, 255, 255); display: none" viewBox="0 0 18 18">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
              </svg>
            </span>
          </span>
          <span class="text-sm ml-1">{{ $t('editor.default') }}</span>
        </div>
        
        <span v-for="(items, index) in chunkedColors" :key="index" class="flex p-0 w-full h-auto relative last:pb-2">
          <span
            v-for="(item, index) in items"
            :key="index"
            class="w-6 h-6 p-0.5 inline-block rounded-sm border border-transparent flex-[0 0 auto] cursor-pointer hover:border-border hover:shadow-sm"
            @click="setColor(item)"
          >
            <span
              :style="{ backgroundColor: item }"
              class="relative w-[18px] h-[18px] block rounded-[2px] border-transparent"
            >
              <svg v-if="item !== modelValue" style="fill: rgb(255, 255, 255); display: none" viewBox="0 0 18 18">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
              </svg>
              <svg
                v-else class="absolute top-[-1px] left-[1px] w-3 h-3" style="fill: rgb(255, 255, 255); display: block"
                viewBox="0 0 18 18"
              >
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
              </svg>
            </span>
          </span>
        </span>
        
        <div>
          <div class="text-sm my-1">{{ $t('editor.recent') }}</div>
          <span class="flex p-0 w-full h-auto relative last:pb-2">
            <span
              v-for="(item, index) in recentColorsStore"
              :key="index"
              class="w-6 h-6 p-0.5 inline-block rounded-sm border border-transparent flex-[0 0 auto] cursor-pointer hover:border-border hover:shadow-sm"
              @click="setColor(item)"
            >
              <span
                :style="{ backgroundColor: item }"
                class="relative w-[18px] h-[18px] block rounded-[2px] border-transparent"
              >
                <svg style="fill: rgb(255, 255, 255); display: none" viewBox="0 0 18 18">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
                </svg>
              </span>
            </span>
          </span>
        </div>
        
        <div class="relative">
          <div
            class="text-sm hover:cursor-pointer hover:bg-neutral-100 hover:dark:bg-neutral-700 rounded-md py-1.5 px-1.5"
            @click="triggerHtml5Color"
          >
            {{ $t('editor.color.more') }}...
          </div>
          <input
            ref="html5Color"
            class="absolute left-0 top-4"
            style="visibility: hidden"
            type="color"
            @change="(e: any) => { setColor(e.target.value) }"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
