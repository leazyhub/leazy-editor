<script setup lang="ts">
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
      <UFormGroup label="Chercher" size="2xs">
        <UInput v-model="searchTerm" @keydown.enter.prevent="updateSearchReplace" placeholder="Chercher..." variant="outline" padded />
      </UFormGroup>
      <UFormGroup label="Remplacer par" size="2xs">
        <UInput v-model="replaceTerm" @keydown.enter.prevent="replace" placeholder="Remplacer par..." variant="outline" padded />
      </UFormGroup>
    </div>

    <UCheckbox v-model="caseSensitive" class="my-2" :ui="{ base: 'w-3 h-3', inner: 'ms-2' }">
      <template #label>
        <label class="text-xs font-medium text-gray-700 dark:text-gray-300">Sensible à la casse</label>
      </template>
    </UCheckbox>

    <div class="flex items-center gap-1">
      <UButton variant="soft" color="red" size="2xs" @click="clear" icon="i-heroicons-x-mark" />
      <UButton variant="soft" color="gray" size="2xs" @click="previous" icon="i-heroicons-chevron-left-20-solid" />
      <p class="text-[11px] font-medium text-gray-700">
        {{ editor?.storage?.searchAndReplace?.resultIndex + (editor?.storage?.searchAndReplace?.results.length ? 1 : 0) }} / {{ editor?.storage?.searchAndReplace?.results.length }}
      </p>
      <UButton variant="soft" color="gray" size="2xs" @click="next" icon="i-heroicons-chevron-right-20-solid" />
      <UButton variant="soft" size="2xs" @click="replace" label="Remplacer" />
      <UButton variant="soft" size="2xs" @click="replaceAll" label="Tout remplacer" />
    </div>
  </div>
</template>
