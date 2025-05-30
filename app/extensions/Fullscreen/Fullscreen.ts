import { Extension } from '@tiptap/core'
import FullscreenActionButton from './components/FullscreenActionButton.vue'
import type { GeneralOptions } from '../../types'

export interface FullscreenOptions extends GeneralOptions<FullscreenOptions> {}

export const Fullscreen = Extension.create<FullscreenOptions>({
  name: 'fullscreen',
  addOptions() {
    return {
      ...this.parent?.(),
      useWindow: false,
      button: () => ({
        component: FullscreenActionButton,
        componentProps: {},
      }),
    }
  },
})
