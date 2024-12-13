<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps({
  ...nodeViewProps,
})

const link = ref<string>('')
const loading = ref<boolean>(false)
const fileInput = ref()
const { t } = useI18n()

function handleFile(event) {
  loading.value = true
  const files = event?.target?.files
  if (!props.editor || props.editor.isDestroyed || files.length === 0) return
  const file = files[0]
  const uploadOptions = props.editor.extensionManager.extensions.find(
    extension => extension.name === 'videoUpload'
  )?.options
  uploadOptions?.upload([file]).then(res => {
    props.editor
      .chain()
      .setVideo({ src: res[0].src, width: '100%' })
      .deleteRange({ from: props.getPos(), to: props.getPos() })
      .focus()
      .run()
    loading.value = false
  })
}

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
  <NodeViewWrapper class="p-0 m-0" data-drag-handle>
    <UPopover :ui="{ base: 'flex flex-col gap-2 p-1' }">
      <div
        class="flex items-center w-full p-3 my-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-border border-neutral-200 dark:border-neutral-700 cursor-pointer rounded-lg transition-all"
      >
        <div v-if="loading" class="flex justify-center items-center gap-3 text-s">
          <Suspense>
            <UIcon class="animate-spin w-6 h-6" name="i-lucide-loader-circle" />
          </Suspense>
          <span>{{ t('editor.video.dialog.uploading') }}...</span>
        </div>
        <div v-else class="flex justify-between items-center w-full">
          <div class="flex justify-center items-center gap-3">
            <Suspense>
              <UIcon class="w-6 h-6" name="i-lucide-video" />
            </Suspense>
            <span class="text-sm">{{ t('editor.video.dialog.title') }}</span>
          </div>
          <Suspense>
            <UIcon class="text-red-500" name="i-heroicons-trash" @click.stop="handleDelete" />
          </Suspense>
        </div>
      </div>
      
      <template #content>
        <div>
          <UButton
            :label="t('editor.video.dialog.tab.upload')" block icon="i-heroicons-arrow-up-tray" size="xs"
            @click="handleClick"
          />
          <input ref="fileInput" accept="video/*" multiple style="display: none" type="file" @change="handleFile" />
        </div>
        
        <div class="flex items-center align-center text-center w-full flex-row">
          <div class="flex border-neutral-200 dark:border-neutral-800 w-full border-t border-solid" />
          <div class="font-medium text-neutral-700 dark:text-neutral-200 flex mx-3 whitespace-nowrap">
            <span class="text-sm">ou</span>
          </div>
          <div class="flex border-neutral-200 dark:border-neutral-800 w-full border-t border-solid" />
        </div>
        
        <UForm class="flex items-center gap-1" @submit="handleLink">
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
