import { Extension, type AnyExtension } from '@tiptap/core'
import { defaultBubbleList, generateBubbleTypeMenu, type BubbleOptions } from '../features/bubble'
import { NODE_TYPE_MENU } from '../constants'
import OpenAI from 'openai'
import { createLowlight, common } from 'lowlight'

import { AI } from './Ai'
import { Alert, AlertOptions } from './Alert'
import { Blockquote, type BlockquoteOptions } from './Blockquote'
import { Bold, type BoldOptions } from './Bold'
import { BulletList, type BulletListOptions } from './BulletList'
import { CharacterCount, type CharacterCountOptions } from '@tiptap/extension-character-count'
import { Clear, type ClearOptions } from './Clear'
import { Code, type CodeOptions } from './Code'
import { CodeBlock, type CodeBlockOptions } from './CodeBlock'
import { Color, type ColorOptions } from './Color'
import { Columns, type ColumnsOptions } from './MultiColumn'
import { Details, type DetailsOptions } from './Details'
import { Document } from './Document'
import { Dropcursor, type DropcursorOptions } from '@tiptap/extension-dropcursor'
import Emoji, { gitHubEmojis, type EmojiOptions } from '@tiptap-pro/extension-emoji'
import EmojiSuggestion from './Emoji'
import Focus, { type FocusOptions } from '@tiptap/extension-focus'
import { FormatPainter, type FormatPainterOptions } from './FormatPainter'
import { FontSize, type FontSizeOptions } from './FontSize'
import { Fullscreen, type FullscreenOptions } from './Fullscreen'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { HardBreak, type HardBreakOptions } from '@tiptap/extension-hard-break'
import { Heading, type HeadingOptions } from './Heading'
import { History, type HistoryOptions } from './History'
import { HorizontalRule, type HorizontalRuleOptions } from './HorizontalRule'
import Iframe, { type IframeOptions } from './Iframe/Iframe'
import { Image, type ImageOptions } from './Image'
import { ImageUpload } from './ImageUpload'
import { ImportWord, type ImportWordOptions } from './ImportWord'
import { Indent, type IndentOptions } from './Indent'
import { Italic, type ItalicOptions } from './Italic'
import { LineHeight, type LineHeightOptions } from './LineHeight'
import { Link, type LinkOptions } from './Link'
import { ListItem, type ListItemOptions } from '@tiptap/extension-list-item'
import { Math, type MathOptions } from './Math'
import { MoreMark, type MoreMarkOptions } from './MoreMark'
import { OrderedList, type OrderedListOptions } from './OrderedList'
import { Paper } from './Paper'
import { Paragraph, type ParagraphOptions } from '@tiptap/extension-paragraph'
import { Placeholder, type PlaceholderOptions } from '@tiptap/extension-placeholder'
import { Print } from './Print'
import { SearchAndReplace } from './SearchAndReplace'
import { Selection } from './Selection'
import { SlashCommand } from './SlashCommand'
import { SpeechRecognition, type SpeechRecognitionOptions } from './SpeechRecognition'
import { SpeechSynthesis, type SpeechSynthesisOptions } from './SpeechSynthesis'
import { Strike, type StrikeOptions } from './Strike'
import { SubAndSuperScript, type SubAndSuperScriptOptions } from './Subscript'
import { Table, type TableOptions } from './Table'
import { TaskList, type TaskListOptions } from './TaskList'
import { Text } from '@tiptap/extension-text'
import { TextAlign, type TextAlignOptions } from './TextAlign'
import { TextBubble, type TextBubbleOptions } from './TextBubble'
import { TextStyle, type TextStyleOptions } from '@tiptap/extension-text-style'
import { TrailingNode, type TrailingNodeOptions } from './TrailingNode'
import { Underline, type UnderlineOptions } from './UnderLine'
import { UniqueId, type UniqueIdOptions } from './UniqueId'
import { Video, type VideoOptions } from './Video'
import { VideoUpload } from './VideoUpload'
import { Youtube, type YoutubeOptions } from '@tiptap/extension-youtube'

/**
 * Represents the interface for options in the base toolkit.
 */
export interface BaseKitOptions {
  /**
   * Whether to enable the AI option
   *
   * @default true
   */
  ai: false

  /**
   * Alert options or false, indicating whether to enable alerts
   *
   * @default true
   */
  alert: Partial<AlertOptions> | false

  /**
   * Blockquote options or false, indicating whether to enable blockquotes
   *
   * @default true
   */
  blockquote: Partial<BlockquoteOptions> | false

  /**
   * Bold options or false, indicating whether to enable bold
   *
   * @default true
   */
  bold: Partial<BoldOptions> | false

  /**
   * Bubble options, taking `BubbleOptions<BaseKitOptions>` as parameters, indicating whether to enable the bubble functionality
   */
  bubble: Partial<BubbleOptions<BaseKitOptions>>

  /**
   * BulletList options or false, indicating whether to enable bullet lists
   *
   * @default true
   */
  bulletList: Partial<BulletListOptions> | false

  /**
   * character count options or false, indicating whether to enable character count
   *
   * @default true
   */
  characterCount: Partial<CharacterCountOptions> | false

  /**
   * Clear options or false, indicating whether to enable clear
   *
   * @default true
   */
  clear: Partial<ClearOptions> | false

  /**
   * Code options or false, indicating whether to enable code
   *
   * @default true
   */
  code: Partial<CodeOptions> | false

  /**
   * CodeBlock options or false, indicating whether to enable code blocks
   *
   * @default true
   */
  codeBlock: Partial<CodeBlockOptions> | false

  /**
   * Color options or false, indicating whether to enable color
   *
   * @default true
   */
  color: Partial<ColorOptions> | false

  /**
   * Columns options or false, indicating whether to enable columns
   *
   * @default true
   */
  columns: Partial<ColumnsOptions> | false

  /**
   * Details options or false, indicating whether to enable details
   *
   * @default true
   */
  details: Partial<DetailsOptions> | false

  /**
   * Whether to enable the document option
   *
   * @default true
   */
  document: false

  /**
   * Dropcursor options or false, indicating whether to enable the drop cursor
   *
   * @default true
   */
  dropcursor: Partial<DropcursorOptions> | false

  /**
   * Emoji options or false, indicating whether to enable emojis
   *
   * @default true
   */
  emoji: Partial<EmojiOptions> | false

  /**
   * Focus options or false, indicating whether to enable focus functionality
   *
   * @default true
   */
  focus: Partial<FocusOptions> | false

  /**
   * FormatPainter options or false, indicating whether to enable format painter
   *
   * @default true
   */
  formatPainter: Partial<FormatPainterOptions> | false

  /**
   * FontSize options or false, indicating whether to enable font size
   *
   * @default true
   */
  fontSize: Partial<FontSizeOptions> | false

  /**
   * FullScreen options or false, indicating whether to enable full screen
   *
   * @default true
   */
  fullScreen: Partial<FullscreenOptions> | false

  /**
   * Whether to enable the Gapcursor
   *
   * @default true
   */
  gapcursor: false

  /**
   * HardBreak options or false, indicating whether to enable hard breaks
   *
   * @default true
   */
  hardBreak: Partial<HardBreakOptions> | false

  /**
   * Heading options or false, indicating whether to enable headings
   *
   * @default true
   */
  heading: Partial<HeadingOptions> | false

  /**
   * History options or false, indicating whether to enable history
   *
   * @default true
   */
  history: Partial<HistoryOptions> | false

  /**
   * HorizontalRule options or false, indicating whether to enable horizontal rules
   *
   * @default true
   */
  horizontalRule: Partial<HorizontalRuleOptions> | false

  /**
   * Iframe options or false, indicating whether to enable the iframe
   *
   * @default true
   */
  iframe: Partial<IframeOptions> | false

  /**
   * Image options or false, indicating whether to enable images
   *
   * @default true
   */
  image: Partial<ImageOptions> | false

  /**
   * ImageUpload options or false, indicating whether to enable image uploads
   *
   * @default true
   */
  imageUpload: false

  /**
   * ImportWord options or false, indicating whether to enable word imports
   *
   * @default true
   */
  importWord: Partial<ImportWordOptions> | false

  /**
   * Indent options or false, indicating whether to enable indentation
   *
   * @default true
   */
  indent: Partial<IndentOptions> | false

  /**
   * Italic options or false, indicating whether to enable italics
   *
   * @default true
   */
  italic: Partial<ItalicOptions> | false

  /**
   * LineHeight options or false, indicating whether to enable line height
   *
   * @default true
   */
  lineHeight: Partial<LineHeightOptions> | false

  /**
   * Link options or false, indicating whether to enable links
   *
   * @default true
   */
  link: Partial<LinkOptions> | false

  /**
   * ListItem options or false, indicating whether to enable list item functionality
   *
   * @default true
   */
  listItem: Partial<ListItemOptions> | false

  /**
   * Math options or false, indicating whether to enable math
   *
   * @default true
   */
  math: Partial<MathOptions> | false

  /**
   * MoreMark options or false, indicating whether to enable more marks
   *
   * @default true
   */
  moreMark: Partial<MoreMarkOptions> | false

  /**
   * OrderedList options or false, indicating whether to enable ordered lists
   *
   * @default true
   */
  orderedList: Partial<OrderedListOptions> | false

  /**
   * Paper options or false, indicating whether to enable the paper
   *
   * @default true
   */
  paper: false

  /**
   * Paragraph options or false, indicating whether to enable paragraph functionality
   *
   * @default true
   */
  paragraph: Partial<ParagraphOptions> | false

  /**
   * Placeholder options or false, indicating whether to enable placeholders
   *
   * @default true
   */
  placeholder: Partial<PlaceholderOptions> | false

  /**
   * Print options or false, indicating whether to enable printing
   *
   * @default true
   */
  print: false

  /**
   * searchAndReplace options or false, indicating whether to enable the searchAndReplace
   *
   * @default true
   */
  searchAndReplace: any | false

  /**
   * selection options or false, indicating whether to enable the selection
   *
   * @default true
   */
  selection: any | false

  /**
   * SlashCommand options or false, indicating whether to enable slash commands
   *
   * @default true
   */
  slashCommand: false

  /**
   * SpeechRecognition options or false, indicating whether to enable speech recognition
   *
   * @default true
   */
  speechRecognition: Partial<SpeechRecognitionOptions> | false

  /**
   * SpeechSynthesis options or false, indicating whether to enable speech synthesis
   *
   * @default true
   */
  speechSynthesis: Partial<SpeechSynthesisOptions> | false

  /**
   * Strike options or false, indicating whether to enable strike through
   *
   * @default true
   */
  strike: Partial<StrikeOptions> | false

  /**
   * SubAndSuperScript options or false, indicating whether to enable subscripts and superscripts
   *
   * @default true
   */
  subAndSuperScript: Partial<SubAndSuperScriptOptions> | false

  /**
   * Table options or false, indicating whether to enable tables
   *
   * @default true
   */
  table: Partial<TableOptions> | false

  /**
   * TaskList options or false, indicating whether to enable task lists
   *
   * @default true
   */
  taskList: Partial<TaskListOptions> | false

  /**
   * Whether to enable the text option
   *
   * @default true
   */
  text: false

  /**
   * TextAlign options or false, indicating whether to enable text alignment
   *
   * @default true
   */
  textAlign: Partial<TextAlignOptions> | false

  /**
   * textBubble options or false, indicating whether to enable the textBubble
   *
   * @default true
   */
  textBubble: Partial<TextBubbleOptions> | false

  /**
   * Text Style options or false, indicating whether to enable text style functionality
   *
   * @default true
   */
  textStyle: Partial<TextStyleOptions> | false

  /**
   * Trailing node options or false, indicating whether to enable the trailing node
   *
   * @default true
   */
  trailingNode: Partial<TrailingNodeOptions> | false

  /**
   * Underline options or false, indicating whether to enable underline
   *
   * @default true
   */
  underline: Partial<UnderlineOptions> | false

  /**
   * UniqueId options or false, indicating whether to enable unique ids
   *
   * @default true
   */
  uniqueId: Partial<UniqueIdOptions> | false

  /**
   * Video options or false, indicating whether to enable videos
   *
   * @default true
   */
  video: Partial<VideoOptions> | false

  /**
   * VideoUpload options or false, indicating whether to enable video uploads
   *
   * @default true
   */
  videoUpload: false

  /**
   * youtube options or false, indicating whether to enable the youtube
   *
   * @default true
   */
  youtube: Partial<YoutubeOptions> | false
}

export const BaseKit = Extension.create<BaseKitOptions>({
  name: 'base-kit',
  addOptions() {
    return {
      ...this.parent?.(),
      bubble: {
        list: NODE_TYPE_MENU,
        defaultBubbleList,
        button: ({ editor, extension, t }) => {
          const { list = {}, defaultBubbleList } = extension.options?.bubble ?? {}
          const defaultList = defaultBubbleList?.(editor) ?? []
          return generateBubbleTypeMenu(list, defaultList, {
            editor,
            extension,
            t,
          })
        },
      },
    }
  },

  addExtensions() {
    const { t } = useI18n()
    const extensions: AnyExtension[] = []

    if (this.options.ai !== false) {
      extensions.push(AI.configure({
        completions: text => AICompletions(text),
      }))
    }

    if (this.options.alert !== false) {
      extensions.push(Alert.configure(this.options.alert))
    }

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options.blockquote))
    }

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options.bold))
    }

    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options.bulletList))
    }

    if (this.options.characterCount !== false) {
      extensions.push(CharacterCount.configure(this.options.characterCount))
    }

    if (this.options.clear !== false) {
      extensions.push(Clear.configure(this.options.clear))
    }

    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options.code))
    }

    if (this.options.codeBlock !== false) {
      extensions.push(CodeBlock.configure({
        lowlight: createLowlight(common),
        ...this.options.codeBlock
      }))
    }

    if (this.options.color !== false) {
      extensions.push(Color.configure({
        spacer: true,
        ...this.options.color
      }))
    }

    if (this.options.columns !== false) {
      extensions.push(Columns.configure(this.options.columns))
    }

    if (this.options.details !== false) {
      extensions.push(Details.configure({
        persist: true,
        HTMLAttributes: {
          class: 'details list-none'
        },
        ...this.options.details
      }))
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure())
    }

    if (this.options.dropcursor !== false) {
      extensions.push(
        Dropcursor.configure({
          ...this.options.dropcursor,
          width: 2,
          class: 'ProseMirror-dropcursor border-black',
        })
      )
    }

    if (this.options.emoji !== false) {
      extensions.push(Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
        suggestion: EmojiSuggestion,
        ...this.options.emoji
      }))
    }

    if (this.options.focus !== false) {
      extensions.push(
        Focus.configure({
          className: 'focus',
          ...this.options.focus,
        })
      )
    }

    if (this.options.formatPainter !== false) {
      extensions.push(FormatPainter.configure(this.options.formatPainter))
    }

    if (this.options.fontSize !== false) {
      extensions.push(FontSize.configure(this.options.fontSize))
    }

    if (this.options.fullScreen !== false) {
      extensions.push(Fullscreen.configure({
        spacer: true,
        ...this.options.fullScreen
      }))
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure())
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options.hardBreak))
    }

    if (this.options.heading !== false) {
      extensions.push(Heading.configure({
        spacer: true,
        ...this.options.heading
      }))
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options.history))
    }

    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure(this.options.horizontalRule))
    }

    if (this.options.iframe !== false) {
      extensions.push(Iframe.configure(this.options.iframe))
    }

    if (this.options.image !== false) {
      extensions.push(Image.configure(this.options.image))
    }

    if (this.options.imageUpload !== false) {
      extensions.push(ImageUpload.configure({
        upload: (files: File[]) => {
          const f = files.map(file => ({
            src: URL.createObjectURL(file),
            alt: file.name,
          }))
          return Promise.resolve(f)
        },
        ...this.options.imageUpload
      }))
    }

    if (this.options.importWord !== false) {
      extensions.push(ImportWord.configure({
        upload: (files: File[]) => {
          const f = files.map(file => ({
            src: URL.createObjectURL(file),
            alt: file.name,
          }))
          return Promise.resolve(f)
        },
        ...this.options.importWord
      }))
    }

    if (this.options.indent !== false) {
      extensions.push(Indent.configure(this.options.indent))
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options.italic))
    }

    if (this.options.lineHeight !== false) {
      extensions.push(LineHeight.configure(this.options.lineHeight))
    }

    if (this.options.link !== false) {
      extensions.push(Link.configure(this.options.link))
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options.listItem))
    }

    if (this.options.math !== false) {
      extensions.push(Math.configure({
        evaluation: true,
        katexOptions: {
          macros: {
            "\\B": "\\mathbb{B}"
          }
        },
        ...this.options.math
      }))
    }

    if (this.options.moreMark !== false) {
      extensions.push(MoreMark.configure(this.options.moreMark))
    }

    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options.orderedList))
    }

    if (this.options.paper !== false) {
      extensions.push(Paper.configure(this.options.paper))
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options.paragraph))
    }

    if (this.options.placeholder !== false) {
      extensions.push(
        Placeholder.configure({
          placeholder: ({ node, pos }) => {
            if (node?.type?.name === 'heading') {
              return `${t(`editor.heading.h${node.attrs.level}.tooltip`)}`
            }
            if (node?.type?.name === 'codeBlock' || node?.type?.name === 'alert' || node?.type?.name === 'columns') {
              return null
            }
            if (pos === 0) {
              return t('editor.content')
            }
            return t('editor.slash.text')
          },
          ...this.options.placeholder,
        })
      )
    }

    if (this.options.print !== false) {
      extensions.push(Print.configure(this.options.print))
    }

    if (this.options.searchAndReplace !== false) {
      extensions.push(SearchAndReplace.configure(this.options.searchAndReplace))
    }

    if (this.options.selection !== false) {
      extensions.push(Selection)
    }

    if (this.options.slashCommand !== false) {
      extensions.push(SlashCommand.configure(this.options.slashCommand))
    }

    if (this.options.speechRecognition !== false) {
      extensions.push(SpeechRecognition.configure(this.options.speechRecognition))
    }

    if (this.options.speechSynthesis !== false) {
      extensions.push(SpeechSynthesis.configure(this.options.speechSynthesis))
    }

    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options.strike))
    }

    if (this.options.subAndSuperScript !== false) {
      extensions.push(SubAndSuperScript.configure(this.options.subAndSuperScript))
    }

    if (this.options.table !== false) {
      extensions.push(Table.configure(this.options.table))
    }

    if (this.options.taskList !== false) {
      extensions.push(TaskList.configure({
        spacer: true,
        taskItem: {
          nested: true
        },
        ...this.options.taskList
      }))
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure())
    }

    if (this.options.textAlign !== false) {
      extensions.push(TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        spacer: true,
        ...this.options.textAlign
      }))
    }

    if (this.options.textBubble !== false) {
      extensions.push(TextBubble.configure())
    }

    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options.textStyle))
    }

    if (this.options.trailingNode !== false) {
      extensions.push(TrailingNode.configure(this.options.trailingNode))
    }

    if (this.options.underline !== false) {
      extensions.push(Underline.configure(this.options.underline))
    }

    if (this.options.uniqueId !== false) {
      extensions.push(UniqueId.configure(this.options.uniqueId))
    }

    if (this.options.video !== false) {
      extensions.push(Video.configure(this.options.video))
    }

    if (this.options.videoUpload !== false) {
      extensions.push(VideoUpload.configure({
        upload: (files: File[]) => {
          const f = files.map(file => ({
            src: URL.createObjectURL(file),
            alt: file.name,
          }))
          return Promise.resolve(f)
        },
        ...this.options.videoUpload
      }))
    }

    if (this.options.youtube !== false) {
      extensions.push(Youtube.configure(this.options.youtube))
    }

    return extensions
  }
})

async function AICompletions(text?: string) {
  console.log(text)
  // API Key
  const apiKey = useRuntimeConfig().public.openaiApiKey
  if (!apiKey) {
    console.error('Please set your OpenAI API key in .env file')
    return
  }
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  })
  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Vous jouerez le rôle d'un assistant d'écriture, m'aidant à créer, poursuivre, optimiser, etc.`,
      },
      {
        role: 'user',
        content: `${text}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 256,
    top_p: 0.9,
    model: 'gpt-3.5-turbo',
    stream: true,
  })

  return stream
}
