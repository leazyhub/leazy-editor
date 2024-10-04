import { Document as TiptapDocument } from '@tiptap/extension-document'

export const Document = TiptapDocument.extend({
  content: '(block|columns)+',
  // leazy editor is a block editor
})

export default Document
