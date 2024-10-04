<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { truncate } from '../../../utils'
import ActionButton from '../../../components/ActionButton.vue'

interface Props {
  editor: Editor
  link: string
}
withDefaults(defineProps<Props>(), {
  link: undefined,
})
const { t } = useI18n()
const emits = defineEmits(['clear', 'edit'])

function onClear() {
  emits('clear')
}
function onEdit() {
  emits('edit')
}
</script>

<template>
  <div
    class="flex items-center gap-2 p-2 bg-white rounded-lg dark:bg-black shadow-sm border border-neutral-200 dark:border-neutral-800"
  >
    <a :href="link" target="_blank" rel="noopener noreferrer" class="text-sm underline break-all">
      {{
        truncate(link, {
          length: 50,
          omission: '…',
        })
      }}
    </a>
    <UDivider v-if="link" orientation="vertical" class="h-4" />
    <div class="flex flex-nowrap">
      <ActionButton
        icon="i-lucide-pencil"
        :tooltip="t('editor.link.edit.tooltip')"
        :action="onEdit"
        :tooltip-options="{ sideOffset: 15 }"
      />
      <ActionButton
        icon="i-lucide-unlink"
        :tooltip="t('editor.link.unlink.tooltip')"
        :action="onClear"
        :tooltip-options="{ sideOffset: 15 }"
      />
    </div>
  </div>
</template>
