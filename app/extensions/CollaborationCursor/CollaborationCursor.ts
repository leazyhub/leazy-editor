import { CollaborationCursor as TiptapCollaborationCursor, type CollaborationCursorOptions as TiptapCollaborationCursorOptions } from '@tiptap/extension-collaboration-cursor'
import type { GeneralOptions } from '../../types'

export interface CollaborationCursorOptions extends TiptapCollaborationCursorOptions, GeneralOptions<CollaborationCursorOptions> {}

export const CollaborationCursor = TiptapCollaborationCursor.extend<CollaborationCursorOptions>({
  addOptions() {
    return {
      provider: null,
    }
  }
})
