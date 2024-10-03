<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'

interface Props {
  editor: Editor
}
const { t } = useI18n()
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['onSetLink'])

let form = reactive({
  text: '',
  link: '',
})
const openInNewTab = ref<boolean>(false)

watchEffect(() => {
  const { href: link, target } = props.editor.getAttributes('link')
  const { from, to } = props.editor.state.selection
  const text = props.editor.state.doc.textBetween(from, to, ' ')
  form = {
    link,
    text,
  }
  openInNewTab.value = target === '_blank'
})
function handleSubmit() {
  emits('onSetLink', form.link, form.text, openInNewTab.value)
}
</script>

<template>
  <UForm @submit="handleSubmit" class="flex flex-col gap-2 p-2">
    <UFormGroup :label="t('editor.link.dialog.text')">
      <UInput type="text" v-model="form.text" size="2xs" required :placeholder="t('editor.link.dialog.text')" />
    </UFormGroup>

    <UFormGroup :label="t('editor.link.dialog.link')">
      <UInput type="url" v-model="form.link" size="2xs" required icon="i-heroicons-link" />
    </UFormGroup>

    <UFormGroup>
      <UCheckbox v-model="openInNewTab" :label="t('editor.link.dialog.openInNewTab')" name="target" />
    </UFormGroup>
    <UButton type="submit" class="mt-2" size="xs" block :label="t('editor.link.dialog.button.apply')" />
  </UForm>
</template>
