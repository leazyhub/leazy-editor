<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import type { ButtonViewReturnComponentProps } from '../../../types'

interface ContentTypeMenu {
  name: string
  label: string
  iconName: string
  action?: ButtonViewReturnComponentProps['action']
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
}

interface Props {
  editor: Editor
  disabled?: boolean
  color?: string
  maxHeight?: string | number
  icon?: any
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  color: undefined,
  maxHeight: undefined,
  icon: undefined,
  tooltip: '',
  items: () => [],
})
const { t } = useI18n()

const menus = computed<ContentTypeMenu[]>(() => {
  return [
    {
      name: 'paragraph',
      label: t('editor.paragraph.tooltip'),
      iconName: 'i-lucide-case-sensitive',
      isActive: () =>
        props.editor.isActive('paragraph') &&
        !props.editor.isActive('orderedList') &&
        !props.editor.isActive('bulletList') &&
        !props.editor.isActive('taskList'),
      action: () => props.editor.chain().focus().clearNodes().run(),
    },
    {
      name: 'heading1',
      label: t('editor.heading.h1.tooltip'),
      isActive: () => props.editor.isActive('heading', { level: 1 }),
      iconName: 'i-lucide-heading-1',
      action: () => props.editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    },
    {
      name: 'heading2',
      label: t('editor.heading.h2.tooltip'),
      isActive: () => props.editor.isActive('heading', { level: 2 }),
      iconName: 'i-lucide-heading-2',
      action: () => props.editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    },
    {
      name: 'heading3',
      label: t('editor.heading.h3.tooltip'),
      isActive: () => props.editor.isActive('heading', { level: 3 }),
      iconName: 'i-lucide-heading-3',
      action: () => props.editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    },
    {
      name: 'bulletList',
      label: t('editor.bulletlist.tooltip'),
      isActive: () => props.editor.isActive('bulletList'),
      iconName: 'i-lucide-list',
      action: () => props.editor.chain().focus().clearNodes().toggleBulletList().run(),
    },
    {
      name: 'numberedList',
      label: t('editor.orderedlist.tooltip'),
      isActive: () => props.editor.isActive('orderedList'),
      iconName: 'i-lucide-list-ordered',
      action: () => props.editor.chain().focus().clearNodes().toggleOrderedList().run(),
    },
    {
      name: 'taskList',
      label: t('editor.tasklist.tooltip'),
      isActive: () => props.editor.isActive('taskList'),
      iconName: 'i-lucide-list-todo',
      action: () => props.editor.chain().focus().clearNodes().toggleTaskList().run(),
    },
    {
      name: 'blockquote',
      label: t('editor.blockquote.tooltip'),
      isActive: () => props.editor.isActive('blockquote'),
      iconName: 'i-lucide-text-quote',
      action: () => props.editor.chain().focus().clearNodes().toggleBlockquote().run(),
    },
    {
      name: 'codeBlock',
      label: t('editor.codeblock.tooltip'),
      isActive: () => props.editor.isActive('codeBlock'),
      iconName: 'i-lucide-code-xml',
      action: () => props.editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    },
  ]
})
const activeItem = computed(() => {
  return (
    menus.value.filter(item => item.isActive()).pop() ?? {
      label: t('editor.paragraph.tooltip'),
    }
  )
})
</script>

<template>
  <UPopover>
    <UButton
      :icon="activeItem?.iconName" color="neutral" size="xs" trailing-icon="i-lucide-chevron-down"
      variant="ghost"
    />
    
    <template #content>
      <div class="flex flex-col">
        <UButton
          v-for="(item, index) in menus"
          :key="index"
          :color="item.isActive?.() ? 'primary' : 'neutral'"
          :label="item.label"
          :variant="item.isActive?.() ? 'soft' : 'ghost'"
          size="xs"
          @click="item.action"
        >
          <template #leading>
            <div
              class="flex items-center justify-center p-px font-medium border rounded-sm border-neutral-200 dark:border-neutral-700"
            >
              <UIcon :name="item.iconName" class="size-4" dynamic />
            </div>
          </template>
        </UButton>
      </div>
    </template>
  </UPopover>
</template>
