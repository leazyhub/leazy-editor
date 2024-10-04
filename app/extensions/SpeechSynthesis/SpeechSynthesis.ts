import { Node } from '@tiptap/core'
import ActionButton from '../../components/ActionButton.vue'

export interface SpeechSynthesisOptions {
  lang: string;
  pitch: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    speechSynthesis: {
      startSpeechSynthesis: () => ReturnType;
      stopSpeechSynthesis: () => ReturnType;
    };
  }
}

class SS_Node<O = any, S = any> extends Node<O, S> {
  static override create<O = any, S = any>(config?: any) {
    return Node.create(config) as SS_Node<O, S>;
  }
}

export const SpeechSynthesis = SS_Node.create<SpeechSynthesisOptions>({
  name: 'speechSynthesis',
  addOptions() {
    return {
      ...this.parent?.(),
      lang: 'fr-FR',
      pitch: 1,
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.startSpeechSynthesis(),
          isActive: () => false,
          disabled: false,
          icon: 'i-lucide-audio-lines',
          tooltip: 'SpeechSynthesis',
        },
      })
    };
  },
  addCommands() {
    return {
      startSpeechSynthesis:
        () =>
          ({ commands }) => {
            const { from, to, empty } = this.editor.state.selection

            if (empty) return null

            this.speechSynthesis = new SpeechSynthesisUtterance();
            this.speechSynthesis.lang = this.options.lang;
            this.speechSynthesis.pitch = this.options.pitch;
            console.log(this.editor.state.doc.textBetween(from, to, ''))
            this.speechSynthesis.text = this.editor.state.doc.textBetween(from, to, '');

            window.speechSynthesis.speak(this.speechSynthesis);
            return commands;
          },
      stopSpeechSynthesis:
        () =>
          ({ commands }) => {
            window.speechSynthesis.cancel();
            return commands;
          },
    };
  },
});
