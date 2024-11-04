import { Collaboration as TiptapCollaboration, type CollaborationOptions as TiptapCollaborationOptions } from '@tiptap/extension-collaboration'
import type { GeneralOptions } from '../../types'

export interface CollaborationOptions extends TiptapCollaborationOptions, GeneralOptions<CollaborationOptions> {}

export const Collaboration = TiptapCollaboration.extend<CollaborationOptions>({
  addOptions() {
    return {
      document: null,
    }
  }
})

export default Collaboration
