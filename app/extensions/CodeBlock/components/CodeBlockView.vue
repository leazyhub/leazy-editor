<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)

const languages = ref(props.extension.options.lowlight.listLanguages())

const selectedLanguage = computed({
  get() {
    return props.node.attrs.language || 'auto'
  },
  set(language: string | undefined) {
    props.updateAttributes({ language })
  },
})
</script>

<template>
  <NodeViewWrapper class="code-block relative">
    <USelect v-model="selectedLanguage" :options="languages" class="absolute bottom-[calc(100%_+_10px)] right-0"/>
    <pre><code><NodeViewContent/></code></pre>
  </NodeViewWrapper>
</template>
