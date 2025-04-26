import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import IframeView from './components/IframeNodeView.vue'
import type { GeneralOptions } from '../../types'

export interface IframeOptions extends GeneralOptions<IframeOptions> {
  allowFullscreen: boolean
  HTMLAttributes: {
    [key: string]: any
  }
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframe: {
      /**
       * Add an iframe
       */
      setIframe: (options: { src: string; service: string }) => ReturnType
    }
  }
}

export default Node.create<IframeOptions>({
  name: 'iframe',
  group: 'block',
  atom: true,
  draggable: true,
  addOptions() {
    return {
      ...this.parent?.(),
      allowFullscreen: true,
      HTMLAttributes: {
        class: 'iframe-wrapper',
      },
    }
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
      service: {
        default: null,
      },
      frameborder: {
        default: 0,
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]]
  },
  addNodeView() {
    return VueNodeViewRenderer(IframeView)
  },
  addCommands() {
    return {
      setIframe:
        (options: { src: string; service: string }) =>
        ({ tr, dispatch }) => {
          const { selection } = tr
          const node = this.type.create(options)

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node)
          }
          return true
        },
    }
  },
})
