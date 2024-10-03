import { Node } from '@tiptap/core'
import ActionButton from '../../components/ActionButton.vue'

export interface SpeechRecognitionOptions {
  lang: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    SpeechRecognition: {
      startSpeechRecognition: () => ReturnType;
      stopSpeechRecognition: () => ReturnType;
      isSpeechRecognitionStarted: () => boolean;
    }
  }
}

class SR_Node<O = any, S = any> extends Node<O, S> {
  protected constructor() {
    super();
  }

  recognition: typeof SpeechRecognition | undefined;
  readonly isStarted: boolean = false;

  static override create<O = any, S = any>(config?: any) {
    return Node.create(config) as SR_Node<O, S>;
  }
}

export const SpeechRecognition = SR_Node.create<SpeechRecognitionOptions>({
  name: 'SpeechRecognition',

  addOptions() {
    return {
      ...this.parent?.(),
      lang: 'fr-FR',
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.startSpeechRecognition(),
          isActive: () => this.isStarted,
          disabled: false,
          icon: 'i-lucide-speech',
          tooltip: 'SpeechRecognition',
        },
      }),
    };
  },

  onCreate() {
    if (
      !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    ) {
      console.warn('SpeechRecognition API is not supported by your browser');
    }
  },

  addCommands() {
    return {
      startSpeechRecognition:
        () =>
          ({ commands }) => {
            const SpeechRecognition =
              window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();

            this.recognition.lang = this.options.lang;
            this.recognition.interimResults = true;
            this.recognition.maxAlternatives = 1;
            this.recognition.continuous = true;

            this.recognition.start();

            // Memoize initial caret positions
            let { from, to } = this.editor.state.selection;

            this.recognition.onresult = (event: SpeechRecognitionEvent) => {
              let currentResult = '';

              // Add to the currentResult variable the content of the last recognized sentence
              for (let i = event.resultIndex; i < event.results.length; i++) {
                currentResult += event.results[i][0].transcript;
              }

              // Is this the final recognition ?
              const isFinal = event.results[event.results.length - 1].isFinal;

              // Replace selection by the last recognized sentence (+ style and select, if not final)
              this.editor.commands.deleteRange({ from, to });
              this.editor.commands.insertContentAt(
                from,
                isFinal ? currentResult : `<code>${currentResult}</code>`,
                { updateSelection: !isFinal }
              );
              to = this.editor.state.selection.to;

              if (isFinal) {
                // Next content will go after last insertion
                from = to;
              }
            };

            this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
              // TODO create a "feedback" tiptap extension, to display user friendly error messages ?
              console.log('Speech recognition error:', event.error);
            };

            this.recognition.onstart = () => {
              this.isStarted = true;
            };

            this.recognition.onend = () => {
              this.isStarted = false;
            };

            return commands;
          },

      stopSpeechRecognition:
        () =>
          ({ commands }) => {
            this.recognition.stop();
            this.editor.commands.focus();
            return commands;
          },

      isSpeechRecognitionStarted: () => () => this.isStarted,
    };
  },
});
