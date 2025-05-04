<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { useDebounce, useInfiniteScroll } from '@vueuse/core'

const props = defineProps({
  ...nodeViewProps
})

const {
  results,
  loading,
  fetchResults,
  getImageSource,
  hasMore,
  loadMore
} = useSearchMedia()

const fileInput = ref()
const currentProvider = ref('unsplash')
const searchQuery = ref('')
const resultsContainer = useTemplateRef('resultsContainer')

const debouncedQuery = useDebounce(searchQuery, 500)

useInfiniteScroll(
  resultsContainer,
  async () => {
    if (hasMore.value && !loading.value && debouncedQuery.value) {
      await loadMore(debouncedQuery.value, currentProvider.value)
    }
  },
  { distance: 10 }
)

watch(debouncedQuery, async (newQuery) => {
  if (newQuery) await fetchResults(newQuery, currentProvider.value)
  else results.value = []
})

watch(currentProvider, async () => {
  if (debouncedQuery.value) await fetchResults(debouncedQuery.value, currentProvider.value)
})

const handleProviderChange = (provider: string) => {
  currentProvider.value = provider
}

function handleLink(src = null) {
  props.editor
    .chain()
    .setImage({ src })
    .deleteRange({ from: props.getPos(), to: props.getPos() })
    .focus()
    .run()
}

const tabs = [
  {
    label: 'Unsplash',
    value: 'unsplash',
    icon: 'i-simple-icons-unsplash',
    click: () => handleProviderChange('unsplash')
  },
  {
    label: 'Pexels',
    value: 'pexels',
    icon: 'i-simple-icons-pexels',
    click: () => handleProviderChange('pexels')
  },
  {
    label: 'Pixabay',
    value: 'pixabay',
    icon: 'i-simple-icons-pixabay',
    click: () => handleProviderChange('pixabay')
  },
  {
    label: 'Giphy',
    value: 'giphy',
    icon: 'i-simple-icons-giphy',
    click: () => handleProviderChange('giphy')
  }
]
</script>

<template>
  <NodeViewWrapper class="p-0 m-0" data-type="imageUpload" data-drag-handle>
    <UCard
      :ui="{ root: 'py-0 sm:p-0', body: 'p-2 sm:p-2' }"
      variant="outline"
      class="w-full"
    >
      <div class="flex flex-col h-[350px] -p-1 overflow-hidden w-full">
        <UTabs v-model="currentProvider" :items="tabs" :content="false" size="xs" />

        <div class="flex-1 p-1 max-h-full flex flex-col overflow-hidden">
          <UInput :loading="loading" v-model="searchQuery" icon="i-lucide-search" placeholder="Rechercher un média" size="sm" autofocus>
            <template v-if="searchQuery !== ''" #trailing>
              <UIcon class="cursor-pointer pointer-events-auto" name="i-lucide-x" @click="searchQuery = ''" />
            </template>
          </UInput>
          
          <div
            ref="resultsContainer"
            class="overflow-y-auto h-full"
          >
            <p
              v-if="searchQuery === '' && !loading && results.length === 0"
              class="text-center text-sm !mt-4"
            >
              {{ $t('editor.image.imageUploader.placeholder') }}
            </p>
            <div
              v-if="results.length > 0"
              class="columns-3 mt-4"
            >
              <div
                v-for="(item, index) in results"
                :key="`${currentProvider}-${index}`"
                class="not-prose mb-4 h-auto max-w-full"
              >
                <img
                  :src="getImageSource(item, currentProvider).preview"
                  :alt="getImageSource(item, currentProvider).label"
                  class="w-full rounded-sm"
                  @click="handleLink(getImageSource(item, currentProvider).src)"
                >
              </div>
            </div>
            <div
              v-if="loading"
              class="flex justify-center my-4"
            >
              <UIcon
                name="i-lucide-loader"
                class="animate-spin size-6"
              />
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </NodeViewWrapper>
</template>
