<script lang="ts" setup>
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
  <UForm class="flex flex-col gap-2 p-2" :state="form" @submit="handleSubmit">
    <UFormField :label="t('editor.link.dialog.text')">
      <UInput v-model="form.text" :placeholder="t('editor.link.dialog.text')" required size="xs" type="text" class="w-full" />
    </UFormField>
    
    <UFormField :label="t('editor.link.dialog.link')">
      <UInput v-model="form.link" icon="i-lucide-link" required size="xs" type="url" class="w-full" />
    </UFormField>
    
    <UFormField>
      <UCheckbox v-model="openInNewTab" :label="t('editor.link.dialog.openInNewTab')" name="target" size="sm" />
    </UFormField>
    <UButton :label="t('editor.link.dialog.button.apply')" block class="mt-2" size="xs" type="submit" />
  </UForm>
</template>
