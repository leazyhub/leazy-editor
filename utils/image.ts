import type { Editor, JSONContent } from '@tiptap/core'

// https://github.com/ueberdosis/tiptap/blob/6cbc2d423391c950558721510c1b4c8614feb534/packages/extension-image/src/image.ts#L48-L58
export type ImageNodeAttributes = {
  /** The URL at which this image can be served. Used as <img> `src`. */
  src: string
  /** Alt text for the image. */
  alt?: string
  /** The `title` attribute when we render the image element. */
  title?: string
}

/**
 * Insert one or more images into the editor.
 * If the editor is not given, or is destroyed, or the images array is empty,
 *
 * @param options.images The attributes of each image to insert
 * @param options.editor The Tiptap editor in which to insert
 * @param options.position The position at which to insert into the editor
 * content. If not given, uses the current editor caret/selection position.
 */
export function insertImages({
  images,
  editor,
  position,
}: {
  images: ImageNodeAttributes[]
  editor: Editor | null
  position?: number
}): void {
  if (!editor || editor.isDestroyed || images.length === 0) {
    return
  }

  const imageContentToInsert: JSONContent[] = images
    .filter(imageAttrs => !!imageAttrs.src)
    .map(imageAttrs => ({
      type: editor.schema.nodes.image.name,
      attrs: imageAttrs,
    }))

  editor
    .chain()
    .command(({ commands }) => {
      if (position == null)
        // Insert at the current caret/selection position
        return commands.insertContent(imageContentToInsert)
      else return commands.insertContentAt(position, imageContentToInsert)
    })
    .focus()
    .run()
}
