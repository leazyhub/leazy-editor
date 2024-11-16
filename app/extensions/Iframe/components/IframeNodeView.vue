<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { getExampleUrl, getServiceSrc } from '../embed'

const props = defineProps({
  ...nodeViewProps,
})
const originalLink = ref<string>('')

const src = computed({
  get: () => props.node.attrs.src,
  set: (value: string) => {
    originalLink.value = value
    props.updateAttributes({ src: value })
  },
})

function handleConfirm() {
  let result = getServiceSrc(props.node.attrs.service, originalLink.value)
  // Vérifier si le lien est valide
  if (result.validLink && result.validId) {
    src.value = result.src
  } else {
    console.log('Non pris en charge pour le moment')
  }
}

function handleExmaple() {
  const url = getExampleUrl(props.node.attrs.service)
  if (url) {
    let result = getServiceSrc(props.node.attrs.service, url)
    src.value = result.src
  }
}

onMounted(() => {
  originalLink.value = props.node.attrs.src
})
</script>

<template>
  <NodeViewWrapper as="section">
    <div v-if="!src" class="flex flex-row relative items-center gap-2">
      <UInput v-model:model-value="originalLink" autofocus class="flex-1" placeholder="Saisir le lien" type="url"/>
      <div class="flex gap-2">
        <UButton variant="outline" @click="handleExmaple">Exemple</UButton>
        <UButton @click="handleConfirm">Confirmer</UButton>
      </div>
    </div>
    <iframe v-if="src" :allowfullscreen="true" :src="src" frameborder="0"></iframe>
  </NodeViewWrapper>
</template>
