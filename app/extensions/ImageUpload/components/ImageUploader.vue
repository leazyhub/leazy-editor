<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { useDebounce } from '@vueuse/core'

const props = defineProps({
  ...nodeViewProps,
})

const link = ref<string>('')
const loading = ref<boolean>(false)
const fileInput = ref()
const results = ref([])
const currentProvider = ref('unsplash')
const searchQuery = ref('')
const debounced = useDebounce(searchQuery, 1000)

function handleFile(event) {
  loading.value = true
  const files = event?.target?.files
  if (!props.editor || props.editor.isDestroyed || files.length === 0) return
  const file = files[0]
  const uploadOptions = props.editor.extensionManager.extensions.find(
    extension => extension.name === 'imageUpload'
  )?.options
  uploadOptions?.upload([file]).then(res => {
    props.editor
      .chain()
      .setImage({ src: res[0].src })
      .deleteRange({ from: props.getPos(), to: props.getPos() })
      .focus()
      .run()
    loading.value = false
  })
}
function handleLink(url = null) {
  props.editor
    .chain()
    .setImage({ src: url ? url : link.value })
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

watch(debounced, async () => {
  loading.value = true
  const { results: resultsQuery } = await useSearchMedia(currentProvider.value, searchQuery.value, null)
  console.log('after compsable')
  results.value = resultsQuery.value
  loading.value = false
})

const handleProvider = async (provider) => {
  currentProvider.value = provider
  if (searchQuery.value !== '') {
    loading.value = true
    const { results: resultsQuery } = await useSearchMedia(provider, searchQuery.value, null)
    results.value = resultsQuery.value
    loading.value = false
  }
}

const getImageSource = (item) => {
  if (currentProvider.value === 'unsplash') {
    return { preview: item?.urls?.thumb, src: item?.urls?.full, label: item?.alt_description, label: item?.alt_description, author: { url: item?.user?.links?.html, name: item?.user?.name } }
  } else if (currentProvider.value === 'pexels') {
    return { preview: item?.src?.tiny, src: item?.src?.original, label: item?.alt, label: item?.alt, author: { url: item?.photographer_url, name: item?.photographer } }
  } else if (currentProvider.value === 'pixabay') {
    return { preview: item?.previewURL, src: item?.largeImageURL, label: item?.tags, author: { url: item?.pageURL, name: item?.user } }
  } else if (currentProvider.value === 'giphy') {
    return { preview: item?.images?.preview_gif?.url, src: item?.images?.original?.url, label: item?.title, author: { url: item?.user?.profile_url, name: item?.user?.username } }
  }
}

const tabs = [
  { label: 'Unsplash', value: 'unsplash', icon: 'i-simple-icons-unsplash', click: () => handleProvider('unsplash')},
  { label: 'Pexels', value: 'pexels', icon: 'i-simple-icons-pexels', click: () => handleProvider('pexels')},
  { label: 'Pixabay', value: 'pixabay', icon: 'i-simple-icons-pixabay', click: () => handleProvider('pixabay')},
  { label: 'Giphy', value: 'giphy', icon: 'i-simple-icons-giphy', click: () => handleProvider('giphy')}
]
</script>

<template>
  <NodeViewWrapper class="p-0 m-0" data-type="imageUpload" data-drag-handle>
    <div class="flex flex-col items-end justify-between border border-neutral-200 dark:border-neutral-700 rounded-md p-4">
      <UCard :ui="{ body: { padding: 'py-3 sm:p-3' } }" class="w-full">
        <div class="flex flex-col h-[350px] -p-1 overflow-hidden w-full">
          <UTabs :items="tabs" :ui="{ wrapper: 'px-1', list: { tab: { size: 'text-xs' } } }">
            <template #default="{ item, index, selected }">
              <div @click="item.click()" class="flex items-center gap-2 relative truncate">
                <Suspense>
                  <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
                </Suspense>

                <span class="truncate">{{ item.label }}</span>

                <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
              </div>
            </template>
          </UTabs>

          <div class="flex-1 p-1 max-h-full flex flex-col overflow-hidden">
            <UInput :loading="loading" v-model="searchQuery" placeholder="Rechercher un média" size="xs">
              <template #leading>
                <Suspense>
                  <UIcon name="i-heroicons-magnifying-glass" class="w-3.5 h-3.5 opacity-75" />
                </Suspense>
              </template>
              <template v-if="searchQuery !== ''" #trailing>
                <Suspense>
                  <UIcon class="cursor-pointer pointer-events-auto" name="i-heroicons-x-mark" @click="searchQuery = ''" />
                </Suspense>
              </template>
            </UInput>

            <div v-if="results.length > 0" class="masonry overflow-y-auto mt-4">
              <div class="not-prose mb-4 h-auto max-w-full break-inside-avoid" v-for="(item, index) in results" :key="index">
                <img @click="handleLink(getImageSource(item).src)" class="w-full rounded-sm" :src="getImageSource(item).preview" :alt="getImageSource(item).label" />
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <div class="flex items-center align-center text-center w-full flex-row my-2.5">
        <div class="flex border-neutral-200 dark:border-neutral-800 w-full border-t border-solid" />
        <div class="font-medium text-neutral-700 dark:text-neutral-200 flex mx-3 whitespace-nowrap">
          <span class="text-sm">ou</span>
        </div>
        <div class="flex border-neutral-200 dark:border-neutral-800 w-full border-t border-solid" />
      </div>

      <div class="w-full flex items-center gap-4">
        <div>
          <UButton block size="xs" @click="handleClick" icon="i-heroicons-arrow-up-tray" :label="$t('editor.image.dialog.tab.upload')" />
          <input type="file" accept="image/*" ref="fileInput" multiple style="display: none" @change="handleFile" />
        </div>

        <USeparator orientation="vertical" class="h-7" />

        <div class="relative flex items-center justify-start flex-1">
          <UInput :placeholder="$t('editor.image.dialog.placeholder')" size="xs" class="flex-1" :ui="{ padding: { sm: 'pr-24' } }" v-model="link"/>
          <UButton type="submit" class="absolute right-0.5" size="2xs" @click="handleLink(link)" :label="$t('editor.image.dialog.button.apply')" />
        </div>
      </div>
    </div>
  </NodeViewWrapper>
</template>

<style scoped>
.masonry {
  column-count: 3;
}
</style>
