import { Node } from '@tiptap/core'
import ActionButton from '../../components/ActionButton.vue'

export interface SpeechRecognitionOptions {
  lang: string
}

// État global
const speechStore = {
  recognition: null as SpeechRecognition | null,
  isStarted: false,
}

const isSpeechRecognitionSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    SpeechRecognition: {
      startSpeechRecognition: () => ReturnType;
      stopSpeechRecognition: () => ReturnType;
      isSpeechRecognitionStarted: () => boolean;
    }
  }
}

export const SpeechRecognition = Node.create<SpeechRecognitionOptions>({
  name: 'SpeechRecognition',

  addOptions() {
    return {
      lang: 'fr-FR',
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            if (!isSpeechRecognitionSupported) return;

            if (speechStore.isStarted) {
              editor.commands.stopSpeechRecognition()
            } else {
              editor.commands.startSpeechRecognition()
            }
          },
          isActive: () => speechStore.isStarted,
          disabled: !isSpeechRecognitionSupported,
          icon: () => speechStore.isStarted
            ? 'i-lucide-mic-off'
            : 'i-lucide-speech',
          tooltip: isSpeechRecognitionSupported
            ? 'editor.speechRecognition.tooltip'
            : 'editor.speechRecognition.notSupported',
        },
      }),
    }
  },

  onCreate() {
    if (!isSpeechRecognitionSupported) console.warn('La reconnaissance vocale n\'est pas supportée par ce navigateur');
  },

  addCommands() {
    return {
      startSpeechRecognition:
        () =>
          ({ commands, editor }) => {
            const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognitionConstructor) {
              console.warn('La reconnaissance vocale n\'est pas supportée par ce navigateur');
              return commands;
            }

            speechStore.recognition = new SpeechRecognitionConstructor();

            speechStore.recognition.lang = this.options.lang;
            speechStore.recognition.interimResults = true;
            speechStore.recognition.maxAlternatives = 1;
            speechStore.recognition.continuous = true;

            speechStore.recognition.start();

            let { from, to } = editor.state.selection;

            speechStore.recognition.onresult = (event: SpeechRecognitionEvent) => {
              let currentResult = '';

              for (let i = event.resultIndex; i < event.results.length; i++) {
                currentResult += event.results[i][0].transcript;
              }

              const isFinal = event.results[event.results.length - 1].isFinal;

              editor.commands.deleteRange({ from, to });
              editor.commands.insertContentAt(
                from,
                isFinal ? currentResult : `<code>${currentResult}</code>`,
                { updateSelection: !isFinal }
              );
              to = editor.state.selection.to;

              if (isFinal) from = to;
            };

            speechStore.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
              console.log('Speech recognition error:', event.error);
            };

            speechStore.recognition.onstart = () => {
              speechStore.isStarted = true;
            };

            speechStore.recognition.onend = () => {
              speechStore.isStarted = false;
            };

            return commands;
          },

      stopSpeechRecognition:
        () =>
          ({ commands, editor }) => {
            speechStore.recognition?.stop();
            editor.commands.focus();
            return commands;
          },

      isSpeechRecognitionStarted: () => () => speechStore.isStarted,
    };
  },
});
