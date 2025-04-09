import { Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageUploaderView from './components/ImageUploader.vue'
import { insertImages, type ImageNodeAttributes } from '../../utils/image'
import { Plugin } from '@tiptap/pm/state'
import ActionButton from '../../components/ActionButton.vue'

export interface ImageOptions {
  /** Function for uploading images */
  upload?: (files: File[]) => ImageNodeAttributes[] | Promise<ImageNodeAttributes[]>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: () => ReturnType
    }
  }
}

export const ImageUpload = Node.create<ImageOptions>({
  name: 'imageUpload',
  isolating: true,
  defining: true,
  group: 'block',
  draggable: true,
  selectable: true,
  inline: false,
  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ]
  },
  renderHTML() {
    return ['div', { 'data-type': this.name }]
  },

  addCommands() {
    return {
      setImageUpload:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(ImageUploaderView)
  },
  addOptions() {
    return {
      ...this.parent?.(),
      upload: undefined,
      button: ({ editor, t }) => {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.commands.setImageUpload(),
            disabled: !editor.can().setImage({}),
            icon: 'i-lucide-image-up',
            tooltip: t('editor.image.tooltip'),
          },
        }
      },
    }
  },
  addProseMirrorPlugins() {
    const options = this.options
    function fileListToImageFiles(fileList: FileList): File[] {
      return Array.from(fileList).filter(file => {
        const mimeType = (file.type || '').toLowerCase()
        return mimeType.startsWith('image/')
      })
    }
    const handleNewImageFiles = (files: File[], insertPosition?: number): void => {
      if (!this.editor) {
        return
      }
      // Execute the upload function if it is provided.
      if (options.upload && typeof options.upload === 'function') {
        const imageAttributes = options.upload(files)
        if (imageAttributes instanceof Promise) {
          imageAttributes.then(attributes => {
            insertImages({
              images: attributes,
              editor: this.editor,
              position: insertPosition,
            })
          })
        } else {
          insertImages({
            images: imageAttributes,
            editor: this.editor,
            position: insertPosition,
          })
        }
        return
      } else {
        // Insert the image directly if the upload function is not provided.
        const attributesForImageFiles = files.map(file => ({
          src: URL.createObjectURL(file),
          alt: file.name,
        }))
        insertImages({
          images: attributesForImageFiles,
          editor: this.editor,
          position: insertPosition,
        })
      }
    }
    return [
      new Plugin({
        props: {
          /**
           * Paste images from the clipboard
           * @param _
           * @param event
           * @returns
           */
          handlePaste: (_, event) => {
            if (!event.clipboardData) {
              return false
            }
            const pastedImageFiles = fileListToImageFiles(event.clipboardData.files)
            if (pastedImageFiles.length > 0) {
              handleNewImageFiles(pastedImageFiles)
              return true
            }
            return false
          },
          /**
           * Drop images from the file system
           * @param _
           * @param event
           * @returns
           */
          handleDrop: (view, event) => {
            if (!(event instanceof DragEvent) || !event.dataTransfer) {
              return false
            }
            const imageFiles = fileListToImageFiles(event.dataTransfer.files)
            if (imageFiles.length > 0) {
              // Insert the image at the drop position.
              const insertPosition = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              })?.pos
              handleNewImageFiles(imageFiles, insertPosition)
              event.preventDefault()
              return true
            }
            return false
          },
        },
      }),
    ]
  },
})

export default ImageUpload
