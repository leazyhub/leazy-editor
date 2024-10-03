import { Details as DetailsTiptap, type DetailsOptions } from '@tiptap-pro/extension-details'
import { DetailsSummary, type DetailsSummaryOptions } from '@tiptap-pro/extension-details-summary'
import { DetailsContent, type DetailsContentOptions } from '@tiptap-pro/extension-details-content'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

/**
 * Represents the interface for details options, extending DetailsOptions and GeneralOptions.
 */
export interface DetailsOptions extends DetailsOptions, GeneralOptions<DetailsOptions> {
  /** options for details summary */
  detailsSummary: Partial<DetailsSummaryOptions>
  /** options for details content */
  detailsContent: Partial<DetailsContentOptions>
}

export const Details = DetailsTiptap.extend<DetailsOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      detailsSummary: {
        HTMLAttributes: {
          class: 'details-summary',
        },
      },
      detailsContent: {
        HTMLAttributes: {
          class: 'details-content',
        },
      },
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.setDetails(),
          isActive: () => editor.isActive('details') || false,
          disabled: !editor.can().setDetails(),
          icon: 'i-lucide-list-collapse',
          shortcuts: ['mod', 'D'],
          tooltip: t('editor.details.tooltip'),
        },
      }),
    }
  },

  addExtensions() {
    return [
      DetailsSummary.configure(this.options.detailsSummary),
      DetailsContent.configure(this.options.detailsContent),
    ]
  },
})
