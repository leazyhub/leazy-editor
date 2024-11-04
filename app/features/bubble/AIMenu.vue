<script setup lang="ts">
import { BubbleMenu, type Editor } from '@tiptap/vue-3'
import { useFocus, useDebounceFn } from '@vueuse/core'
import AiCompletion from './AiCompletion.vue'
import Menu from './Menu.vue'

interface Props {
  editor: Editor
  disabled: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const store = useTiptapStore()
const result = ref<string>('')
const status = ref<'init' | 'generating' | 'completed'>('init')
const prompt = ref<string>('')
const cachedPrompt = ref<any>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const { focused } = useFocus(inputRef)
const resultContainer = ref<HTMLElement | null>(null)
const isShaking = ref<boolean>(false)
const toast = useToast()
const tippyInstance = ref<any>(null)

const getSelectionText = (editor: Editor) => {
  const { from, to, empty } = editor.state.selection
  if (empty) return ''
  return editor.state.doc.textBetween(from, to, '')
}

const scrollToBottom = useDebounceFn(() => {
  if (resultContainer.value) {
    resultContainer.value.scrollTop = resultContainer.value.scrollHeight
  }
}, 100, { maxWait: 200 })

const handleGenerate = async (e) => {
  e.preventDefault()
  status.value = 'generating'
  result.value = ''
  await handleCompletion(getSelectionText(props.editor), prompt.value)
}

const handleCompletion = async (context: string, prompt_: string) => {
  status.value = 'generating'
  result.value = ''
  const AIOptions = props.editor.extensionManager.extensions.find(e => e.name === 'Ai')?.options
  try {
    const stream = await AIOptions.completions(prompt_, context)
    if (!stream) {
      throw new Error('Failed to create stream')
    }
    for await (const chunk of stream) {
      result.value += chunk.choices[0]?.delta?.content || ''
      await nextTick()
      await scrollToBottom()
    }
    cachedPrompt.value = {
      context,
      prompt: prompt_
    }
    status.value = 'completed'
    prompt.value = ''
    await nextTick()
    focused.value = true
    await scrollToBottom()
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'red',
    })
    handleClose()
  }
}

const tippyOptions = reactive<Record<string, unknown>>({
  maxWidth: 600,
  zIndex: 99,
  appendTo: 'parent',
  placement: 'bottom-start',
  onShow(instance) {
    tippyInstance.value = instance
    setTimeout(() => {
      focused.value = true
    }, 30)
  },
  onHide() {
    handleClose()
    props.editor.chain().unsetHighlight().run()
  },
  onDestroy() {
    tippyInstance.value = null
  }
})

const shouldShow: any = computed(() => store?.state.AIMenu)

const handleClose = () => {
  store!.state.AIMenu = false
  prompt.value = ''
  result.value = ''
  status.value = 'init'
}

const handleReGenerate = () => {
  handleCompletion(cachedPrompt.value?.context, cachedPrompt.value?.prompt)
}

const handleOverlayClick = () => {
  if (status.value === 'init' && prompt.value === '') {
    handleClose()
    return
  }
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 820)
}

const shortcutClick = (item) => {
  const selectionText = getSelectionText(props.editor)
  handleCompletion(selectionText, item.prompt)
}

const shortcutMenus = computed(() => {
  const shortcuts = props.editor.extensionManager.extensions.find(e => e.name === 'Ai')?.options?.shortcuts
  if (shortcuts && shortcuts.length) {
    return shortcuts
  } else {
    return []
  }
})
</script>

<template>
  <div class="absolute left-0 right-0 top-0 bottom-0 z-[98]" v-show="shouldShow" @click="handleOverlayClick">
    <BubbleMenu plugin-key="AIMenu" :update-delay="0" v-show="shouldShow" :editor="editor" :tippy-options="tippyOptions">
      <div class="relative w-[450px] z-[99]" :class="{ 'shake-animation': isShaking }">
        <div
          class="shadow-md rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
          v-show="(status === 'generating' || status === 'completed') && result"
        >
          <div ref="resultContainer" class="p-4 line-height-none block overflow-y-auto" style="max-height: 270px;">
            <div class="text-sm text-foreground line-height-snug" v-html="result" />
          </div>
        </div>
        <form
          @submit="handleGenerate"
          class="relative w-full items-center flex mt-3 shadow-md rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <UInput
            v-model="prompt"
            ref="inputRef"
            placeholder="Demandez à l'IA..."
            variant="none"
            icon="i-heroicons-sparkles"
            :loading="status === 'generating'"
            size="md"
            class="w-full"
          >
            <template #trailing>
              <UButton
                v-if="status === 'generating'"
                @click="handleClose"
                size="xs"
                square
              >
                Stop
              </UButton>
              <UButton
                :disabled="!prompt"
                v-else
                @click="handleGenerate"
                size="xs"
                square
              >
                <UIcon name="i-heroicons-chevron-right" />
              </UButton>
            </template>
          </UInput>
        </form>
        <div class="mt-3 max-w-56" v-show="status === 'init' && shortcutMenus.length && !prompt">
          <Menu :items="shortcutMenus" @item-click="shortcutClick" />
        </div>
        <AiCompletion
          @close="handleClose"
          @generate="handleReGenerate"
          v-if="status === 'completed' && prompt === ''"
          :editor="editor"
          :completion="result"
        />
      </div>
    </BubbleMenu>
  </div>
</template>

<style lang="scss" scoped>
@keyframes text-loading {
  0% {
    content: '·';
  }
  33% {
    content: '··';
  }
  66% {
    content: '···';
  }
}

.text_loading_animation::after {
  content: '·';
  margin-left: 8px;
  animation: text-loading 2s infinite;
}
.shake-animation {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
