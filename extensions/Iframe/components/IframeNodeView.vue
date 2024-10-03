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
    <div class="flex flex-row relative items-center gap-2" v-if="!src">
      <UInput v-model:model-value="originalLink" type="url" class="flex-1" autofocus placeholder="Saisir le lien" />
      <div class="flex gap-2">
        <UButton @click="handleExmaple" variant="outline">Exemple</UButton>
        <UButton @click="handleConfirm">Confirmer</UButton>
      </div>
    </div>
    <iframe v-if="src" :src="src" frameborder="0" :allowfullscreen="true"></iframe>
  </NodeViewWrapper>
</template>
