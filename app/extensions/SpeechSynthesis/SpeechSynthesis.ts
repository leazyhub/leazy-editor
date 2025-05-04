import { ref } from 'vue'
import { Node } from '@tiptap/core'
import ActionButton from '../../components/ActionButton.vue'

export interface SpeechSynthesisOptions {
  lang: string
  pitch: number
  voice?: string
  rate?: number
}

const synthesisStore = {
  utterance: null as SpeechSynthesisUtterance | null,
  isSpeaking: ref(false),
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    speechSynthesis: {
      startSpeechSynthesis: () => ReturnType
      stopSpeechSynthesis: () => ReturnType
      isSpeechSynthesisStarted: () => boolean
    }
  }
}

export const SpeechSynthesis = Node.create<SpeechSynthesisOptions>({
  name: 'speechSynthesis',

  addOptions() {
    return {
      lang: 'fr-FR',
      pitch: 1,
      rate: 1,
      voice: 'Google français',
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            if (synthesisStore.isSpeaking.value) {
              editor.commands.stopSpeechSynthesis()
            } else {
              editor.commands.startSpeechSynthesis()
            }
          },
          isActive: () => synthesisStore.isSpeaking.value,
          disabled: false,
          icon: () =>
            synthesisStore.isSpeaking.value
              ? 'i-lucide-pause'
              : 'i-lucide-audio-lines',
          tooltip: 'editor.speechSynthesis.tooltip',
          update: () => synthesisStore.isSpeaking.value,
        },
      }),
    }
  },

  addCommands() {
    return {
      startSpeechSynthesis:
        () =>
          ({ commands, editor }) => {
            const { from, to, empty } = editor.state.selection
            if (empty) return null

            const text = editor.state.doc.textBetween(from, to, ' ')
            if (!text.trim()) return null

            synthesisStore.utterance = new SpeechSynthesisUtterance()
            synthesisStore.utterance.text = text
            synthesisStore.utterance.lang = this.options.lang
            synthesisStore.utterance.pitch = this.options.pitch
            synthesisStore.utterance.rate = this.options.rate

            if (this.options.voice) {
              const voices = window.speechSynthesis.getVoices()
              const match = voices.find(v => v.voiceURI === this.options.voice)
              if (match) synthesisStore.utterance.voice = match
            }

            synthesisStore.utterance.onstart = () => {
              synthesisStore.isSpeaking.value = true
            }

            synthesisStore.utterance.onend = () => {
              synthesisStore.isSpeaking.value = false
            }

            synthesisStore.utterance.onerror = () => {
              synthesisStore.isSpeaking.value = false
            }

            window.speechSynthesis.speak(synthesisStore.utterance)

            return commands
          },

      stopSpeechSynthesis:
        () =>
          ({ commands }) => {
            window.speechSynthesis.cancel()
            synthesisStore.isSpeaking.value = false
            return commands
          },

      isSpeechSynthesisStarted: () => () => synthesisStore.isSpeaking.value,
    }
  },
})
