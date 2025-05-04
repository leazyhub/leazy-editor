import { Import as TiptapImport, type ImportOptions as TiptapImportOptions } from '@tiptap-pro/extension-import'
import ActionButton from './components/ActionButton.vue'
import type { GeneralOptions } from '../../types'

export interface ImportOptions extends TiptapImportOptions, GeneralOptions<ImportOptions> {}

export const Import = TiptapImport.extend<ImportOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          icon: 'i-lucide-file-down',
          disabled: !editor.can().import,
          tooltip: t('editor.import.tooltip'),
        }
      })
    }
  }
})
