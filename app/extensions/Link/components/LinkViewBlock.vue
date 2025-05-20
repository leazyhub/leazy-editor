<script lang="ts" setup>
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
    class="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm border border-default"
  >
    <a :href="link" class="text-sm underline break-all" rel="noopener noreferrer" target="_blank">
      {{
        truncate(link, {
          length: 50,
          omission: '…',
        })
      }}
    </a>
    <USeparator v-if="link" class="h-4" orientation="vertical" />
    <div class="flex flex-nowrap">
      <ActionButton
        :action="onEdit"
        :tooltip="t('editor.link.edit.tooltip')"
        :tooltip-options="{ sideOffset: 15 }"
        icon="i-lucide-pencil"
      />
      <ActionButton
        :action="onClear"
        :tooltip="t('editor.link.unlink.tooltip')"
        :tooltip-options="{ sideOffset: 15 }"
        icon="i-lucide-unlink"
      />
    </div>
  </div>
</template>
