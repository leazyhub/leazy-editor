import { CodeBlockLowlight as TiptapCodeBlock, type CodeBlockLowlightOptions as TiptapCodeBlockOptions } from '@tiptap/extension-code-block-lowlight'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'
import CodeBlockView from './components/CodeBlockView.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

export interface CodeBlockOptions extends TiptapCodeBlockOptions, GeneralOptions<CodeBlockOptions> {}

export const CodeBlock = TiptapCodeBlock.extend<CodeBlockOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: null,
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleCodeBlock(),
          isActive: () => editor.isActive('codeBlock') || false,
          disabled: !editor.can().toggleCodeBlock(),
          icon: 'i-lucide-code-xml',
          tooltip: t('editor.codeblock.tooltip'),
        },
      }),
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockView)
  },
})
