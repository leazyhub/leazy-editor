<template>
  <NodeViewWrapper>
    <UAccordion
      :default-open="true"
      :items="[{ label: $t('editor.tableOfContents.tooltip') }]"
      color="neutral"
      variant="solid"
    >
      <template #body>
        <div
          v-if="headings.length"
          class="flex flex-col rounded-md ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 py-2 px-3.5"
        >
          <a
            v-for="(heading, index) in headings" :key="index" :class="`toc-item-${heading.level - 1}`"
            :href="`#${heading.id}`"
            class="inline truncate text-sm/6 text-neutral-500 dark:text-neutral-400 hover:text-primary hover:dark:text-primary"
          >{{ heading.number }} - {{ heading.text }}</a>
        </div>
        <p
          v-else
          class="text-xs text-neutral-500 dark:text-neutral-400"
        >
          {{ $t('editor.tableOfContents.empty') }}
        </p>
      </template>
    </UAccordion>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
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
