import { Extension } from '@tiptap/core'
import ActionButton from './components/ImportWordButton.vue'
import type { ImageNodeAttributes } from '../../utils/image'
import type { GeneralOptions } from '../../types'

export interface ImportWordOptions extends GeneralOptions<ImportWordOptions> {
  /**
   * Function for converting files to HTML
   */
  convert?: (file: File) => Promise<string>

  /** Function for uploading images */
  upload?: (files: File[]) => ImageNodeAttributes[] | Promise<ImageNodeAttributes[]>
}

export const ImportWord = Extension.create<ImportWordOptions>({
  name: 'importWord',
  addOptions() {
    return {
      ...this.parent?.(),
      upload: undefined,
      convert: undefined,
      button: ({ editor, extension, t }) => {
        const { convert } = extension.options
        return {
          component: ActionButton,
          componentProps: {
            convert,
            action: () => editor.commands.setHorizontalRule(),
            disabled: !editor.can().setHorizontalRule(),
            icon: 'i-simple-icons-microsoftword',
            shortcuts: ['alt', 'mod', 'S'],
            tooltip: t('editor.importWord.tooltip'),
          },
        }
      },
    }
  },
})
