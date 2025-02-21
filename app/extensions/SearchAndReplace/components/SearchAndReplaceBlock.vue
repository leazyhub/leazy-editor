<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'

interface Props {
  editor: Editor
}

const searchOpened = ref(true)
const searchTerm = ref('')
const replaceTerm = ref('')
const caseSensitive = ref(false)
const { editor } = defineProps<Props>()

const updateSearchReplace = (clearIndex = false) => {
  if (!editor) return
  if (clearIndex) editor?.commands.resetIndex()
  
  editor?.commands.setSearchTerm(searchTerm.value)
  editor?.commands.setReplaceTerm(replaceTerm.value)
  editor?.commands.setCaseSensitive(caseSensitive.value)
}

const goToSelection = () => {
  if (!editor) return;
  
  const { results, resultIndex } = editor.storage.searchAndReplace;
  const position: Range = results[resultIndex];
  
  if (!position) return;
  
  editor?.commands.setTextSelection(position);
  
  const { node } = editor.view.domAtPos(
    editor.state.selection.anchor
  );
  node instanceof HTMLElement &&
  node.scrollIntoView({ behavior: "smooth", block: "center" });
};

const replace = () => {
  editor?.commands.replace();
  goToSelection();
};

const next = () => {
  editor?.commands.nextSearchResult();
  goToSelection();
};

const previous = () => {
  editor?.commands.previousSearchResult();
  goToSelection();
};

const clear = () => {
  searchTerm.value = replaceTerm.value = "";
  editor.commands.resetIndex();
};

const replaceAll = () => editor?.commands.replaceAll();

watch(
  () => searchTerm.value.trim(),
  (val, oldVal) => {
    if (!val) clear();
    if (val !== oldVal) updateSearchReplace(true);
  }
);

watch(
  () => searchOpened.value,
  (val) => {
    if (!val) clear();
  }
)

watch(
  () => replaceTerm.value.trim(),
  (val, oldVal) => (val === oldVal ? null : updateSearchReplace())
);

watch(
  () => caseSensitive.value,
  (val, oldVal) => (val === oldVal ? null : updateSearchReplace(true))
);
</script>

<template>
  <div class="p-2">
    <div class="flex gap-2">
      <UFormField label="Chercher" size="xs">
        <UInput
          v-model="searchTerm" padded placeholder="Chercher..." variant="outline"
          @keydown.enter.prevent="updateSearchReplace"
        />
      </UFormField>
      <UFormField label="Remplacer par" size="xs">
        <UInput
          v-model="replaceTerm" padded placeholder="Remplacer par..." variant="outline" @keydown.enter.prevent="replace"
        />
      </UFormField>
    </div>
    
    <UCheckbox v-model="caseSensitive" :ui="{ base: 'w-3 h-3' }" class="my-2">
      <template #label>
        <label class="text-xs font-medium text-neutral-700 dark:text-neutral-300">Sensible à la casse</label>
      </template>
    </UCheckbox>
    
    <div class="flex items-center gap-1">
      <UButton color="error" icon="i-lucide-x" size="xs" variant="soft" @click="clear" />
      <UButton color="neutral" icon="i-lucide-chevron-left" size="xs" variant="soft" @click="previous" />
      <p class="text-[11px] font-medium text-neutral-700">
        {{
          editor?.storage?.searchAndReplace?.resultIndex + (editor?.storage?.searchAndReplace?.results.length ? 1 : 0)
        }} / {{ editor?.storage?.searchAndReplace?.results.length }}
      </p>
      <UButton color="neutral" icon="i-lucide-chevron-right" size="xs" variant="soft" @click="next" />
      <UButton label="Remplacer" size="xs" variant="soft" @click="replace" />
      <UButton label="Tout remplacer" size="xs" variant="soft" @click="replaceAll" />
    </div>
  </div>
</template>
