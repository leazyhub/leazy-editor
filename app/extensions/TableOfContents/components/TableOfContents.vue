<template>
  <NodeViewWrapper>
    <Suspense>
      <UAccordion color="white" variant="solid" :default-open="true" :items="[{ label: 'Table des matières' }]" :ui="{ wrapper: 'lg:px-[calc((100%_-_(750px))_/_2)] mt-6 mb-2 px-4', item: { base: 'flex flex-col rounded-md ring-1 ring-inset ring-gray-300 dark:ring-gray-700', padding: ' py-2 px-3.5' } }">
        <template #item v-if="headings.length">
          <a v-for="(heading, index) in headings" :key="index" :href="`#${heading.id}`" :class="`toc-item-${heading.level - 1}`" class="inline truncate text-sm/6 text-gray-500 dark:text-gray-400 hover:text-primary hover:dark:text-primary">{{ heading.number }} - {{ heading.text }}</a>
        </template>
        <template #item v-else>
          <p class="text-xs text-gray-500 dark:text-gray-400">Aucune table des matières</p>
        </template>
      </UAccordion>
    </Suspense>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps);

const headings = ref([]);

function handleUpdate() {
  const newHeadings = [];
  const transaction = props.editor.state.tr;
  const numbering = []

  props.editor.state.doc.descendants(node => {
    if (node.type.name === 'heading') {
      const level = node.attrs.level;

      if (numbering.length < level) numbering.push(1)
      else {
        numbering.splice(level)
        numbering[level - 1]++
      }

      const number = numbering.join('.')

      newHeadings.push({
        level: node.attrs.level,
        text: node.textContent,
        id: node.attrs.id,
        number
      });
    }
  });

  transaction.setMeta('addToHistory', false);
  transaction.setMeta('preventUpdate', true);

  props.editor.view.dispatch(transaction);

  headings.value = newHeadings;
}

onMounted(() => {
  if (props.editor) {
    props.editor.on('update', handleUpdate);
    handleUpdate();
  }
});

watch(() => props.editor, handleUpdate)
</script>

<style lang="scss">
@each $size in 0, 1, 2, 3, 4, 5 {
  .toc-item-#{$size} {
    margin-left: #{$size}rem;
  }
}
</style>
