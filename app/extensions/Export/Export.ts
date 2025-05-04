import { Export as TiptapExport, type ExportOptions as TiptapExportOptions } from '@tiptap-pro/extension-export'
import ActionButton from './components/ActionButton.vue'
import type { GeneralOptions } from '../../types'

export interface ExportOptions extends TiptapExportOptions, GeneralOptions<ExportOptions> {}

export const Export = TiptapExport.extend<ExportOptions>({
  addOptions() {
    const onExport = (context: any) => {
      context?.download?.()
    }

    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          icon: 'i-lucide-file-up',
          disabled: !editor.can().export,
          tooltip: t('editor.export.tooltip'),
          items: [
            {
              action: () => {
                editor.commands.export({ format: 'docx', onExport })
              },
              icon: 'i-simple-icons-microsoftword',
              disabled: !editor.can().export,
              tooltip: 'DOCX',
              label: 'Docx'
            },
            {
              action: () => {
                editor.commands.export({ format: 'odt', onExport })
              },
              icon: 'i-lucide-file-text',
              disabled: !editor.can().export,
              tooltip: 'ODT',
              label: 'Odt'
            },
            {
              action: () => {
                editor.commands.export({ format: 'md', onExport })
              },
              icon: 'i-simple-icons-markdown',
              disabled: !editor.can().export,
              tooltip: 'Markdown',
              label: 'Markdown'
            },
            {
              action: () => {
                editor.commands.export({ format: 'gfm', onExport })
              },
              icon: 'i-simple-icons-github',
              disabled: !editor.can().export,
              tooltip: 'GitHub Markdown',
              label: 'GitHub Markdown'
            }
          ]
        }
      })
    }
  }
})
