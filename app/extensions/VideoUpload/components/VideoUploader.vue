<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps({
  ...nodeViewProps,
})

const link = ref<string>('')
const loading = ref<boolean>(false)
const fileInput = ref()
const { t } = useI18n()

function handleLink() {
  props.editor
    .chain()
    .setVideo({
      src: link.value,
      width: '100%',
    })
    .deleteRange({ from: props.getPos(), to: props.getPos() })
    .focus()
    .run()
}

function handleDelete() {
  props.deleteNode()
}

function handleClick() {
  fileInput.value?.click()
}
</script>

<template>
  <NodeViewWrapper class="m-0" data-drag-handle>
    <UPopover>
      <div
        class="flex items-center w-full p-3 my-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-border border-neutral-200 dark:border-neutral-700 cursor-pointer rounded-lg transition-all"
      >
        <div v-if="loading" class="flex justify-center items-center gap-3 text-s">
          <UIcon class="animate-spin w-6 h-6" name="i-lucide-loader-circle" />
          <span>{{ t('editor.video.dialog.uploading') }}...</span>
        </div>
        <div v-else class="flex justify-between items-center w-full">
          <div class="flex justify-center items-center gap-3">
            <UIcon class="w-6 h-6" name="i-lucide-video" />
            <span class="text-sm">{{ t('editor.video.dialog.title') }}</span>
          </div>
          <UIcon class="text-error" name="i-lucide-trash-2" @click.stop="handleDelete" />
        </div>
      </div>
      
      <template #content>
        <UForm class="flex items-center gap-1 p-1" @submit="handleLink">
          <UInput
            v-model="link"
            :placeholder="t('editor.video.dialog.placeholder')"
            autofocus
            required
            size="xs"
            type="url"
          />
          <UButton :label="t('editor.video.dialog.button.apply')" size="xs" type="submit" />
        </UForm>
      </template>
    </UPopover>
  </NodeViewWrapper>
</template>
