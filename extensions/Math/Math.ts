import { Extension } from '@tiptap/core'
import { InlineMathNode } from './inline-math-node'
import { DEFAULT_OPTIONS, type MathOptions } from './util/options'

export const Math = Extension.create<MathExtensionOption>({
  name: 'math',

  addOptions() {
    return DEFAULT_OPTIONS;
  },

  addExtensions() {
    const extensions = [];
    if (this.options.addInlineMath !== false) {
      extensions.push(InlineMathNode.configure(this.options));
    }

    return extensions;
  },
});

export { InlineMathNode, DEFAULT_OPTIONS };
export type { MathOptions };
