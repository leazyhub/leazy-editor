<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import AiCompletion from './AiCompletion.vue'

const props = defineProps({
  ...nodeViewProps,
})
const status = ref<string>('idle')
const result = ref('')
const messageList = ref<string[]>([])
const showDropdown = ref(true)
const inputRef = ref()

const options: any = [
  {
    label: 'IA completion',
    icon: 'i-lucide-wand-sparkles',
    key: 'jay gatsby',
  },
  {
    label: 'IA Modfication',
    icon: 'i-lucide-wand-sparkles',
    key: 'runse',
    children: [
      {
        label: 'Plus de détails',
        icon: 'i-lucide-wand-sparkles',
        key: 'xiangxi',
      },
      {
        icon: 'i-lucide-wand-sparkles',
        label: 'Plus de rationnalité',
        key: 'jingjian',
      },
      {
        icon: 'i-lucide-wand-sparkles',
        label: 'Plus formel',
        key: 'zhengshi',
      },
      {
        label: 'Plus cohérent',
        icon: 'i-lucide-wand-sparkles',
        key: 'lianguan',
      },
      {
        icon: 'i-lucide-wand-sparkles',
        label: 'Plus vif',
        key: 'shengdong',
      },
    ],
  },
  {
    label: 'Relécture par l\'IA',
    key: 'jiaoyue',
    icon: 'i-lucide-wand-sparkles',
  },
  {
    label: 'Traduction par l\'IA',
    icon: 'i-lucide-languages',
    key: 'nick carraway',
    children: [
      {
        label: 'Français',
        icon: 'i-lucide-languages',
        key: 'jordan baker',
      },
      {
        label: 'Anglais',
        icon: 'i-lucide-languages',
        key: 'jordan baker',
      },
    ],
  },
]
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})

function handleMaskClick() {
  if (result.value) {
    dialog.warning({
      title: 'Quitter la création ?',
      content: 'Si vous quittez la création, les données non sauvegardées seront perdues.',
      positiveText: 'Quitter',
      negativeText: 'Annuler',
      onPositiveClick: () => {
        props.deleteNode();
      },
    });
  } else {
    props.deleteNode()
  }
}
async function handleSelect() {
  status.value = 'loading'
  const selectionText = props.node.attrs.selectionText
  const stream = await props.extension.options.completions(selectionText)
  status.value = 'generating'
  for await (const chunk of stream) {
    messageList.value.push(chunk.choices[0]?.delta?.content || '')
    result.value += chunk.choices[0]?.delta?.content || ''
  }
  status.value = 'completed'
}

function handleStop() {
  status.value = 'idle'
}

function handleReplace() {
  props.deleteNode()
  const range = {
    from: Number(props.node.attrs.selectionFrom),
    to: Number(props.node.attrs.selectionTo),
  }
  props.editor.chain().focus().setTextSelection(range).deleteSelection().insertContent(result.value).run()
}
function insetBottom() {
  // Insert the content at the bottom of the editor
  props.editor.commands.insertContent(result.value)
}

function copy(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('copy success')
  })
}

function handleDelete() {
  props.deleteNode()
}
</script>
<template>
  <NodeViewWrapper data-drag-handle class="relative">
<!--    <div class="fixed z-[100] h-full inset-0" @click="handleMaskClick" />-->
    <div class="z-[1001] min-h-12 w-[350px] ai-modal-main-container py-2 px-4">
      <div v-if="status === 'loading'" class="flex items-center flex-row w-full select-none">
        <div class="ai_modal_writing_tips_loading_wrapper" style="width: 24px">
          <div class="flex itemscenter flex-row rounded-sm" style="width: 24px; height: 24px">
            <NuxtImg
              src="https://docs.gtimg.com/docs-design-resources/icon/desktop/png@3x/ai-assistant_fill_motion_loop_24@3x-00b564ad53.png"
              width="24"
              height="24"
              draggable="false"
            />
          </div>
        </div>
        <div class="text-sm px-1 py-2 flex-grow-[1]">Création en cours...</div>
        <div class="flex flex-col justify-center items-center">
          <UButton size="sm" @click="handleStop">Stop</UButton>
        </div>
      </div>
      <div class="w-full overflow-hidden px-0.5 flex flex-row" v-if="status === 'idle'">
        <div class="w-6">
          <div class="flex itemscenter flex-row rounded-sm w-6 h-6">
            <NuxtImg
              src="https://docs.gtimg.com/docs-design-resources/icon/desktop/png@3x/ai-assistant_fill_motion_once_24@3x-23803ec719.png"
              width="24"
              height="24"
              draggable="false"
            />
          </div>
        </div>
        <div
          class="ai_modal_input_area"
          contenteditable="true"
          ref="inputRef"
          spellcheck="false"
          placeholder="Aide de l'IA..."
        />
        <div class="min-w-6 flex flex-col-reverse">
          <div
            class="dui-trigger dui-tooltip dui-tooltip-wrapper"
            data-dui-1-3-5="dui-trigger dui-tooltip dui-tooltip-wrapper"
          >
            <div
              @click="handleSelect"
              class="ai_modal_input_submit_button ai_modal_input_submit_button_active"
            ></div>
          </div>
        </div>
      </div>
      <div v-if="status === 'generating' || status === 'completed'" class="select-none">
        <div class="flex justify-between flex-row px-1 text-xs h-8 text-gray-500 dark:text-gray-100">
          <div>Générer des résultats</div>
          <div>
            <UButton @click="handleDelete" variant="ghost" size="sm" icon="i-heroicons-x-mark" />
          </div>
        </div>
        <div class="ai_modal_message_board select-none">
          {{ result }}
        </div>
        <AiCompletion :editor="editor" :completion="result" />
      </div>
    </div>
  </NodeViewWrapper>
</template>
