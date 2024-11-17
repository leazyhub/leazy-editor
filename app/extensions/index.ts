import { type AnyExtension, Extension } from '@tiptap/core'
import { type BubbleOptions, defaultBubbleList, generateBubbleTypeMenu } from '../features/bubble'
import { NODE_TYPE_MENU } from '../constants'
import OpenAI from 'openai'
import { common, createLowlight } from 'lowlight'

import { AI, type AIOptions } from './Ai'
import { Alert, type AlertOptions } from './Alert'
import { Blockquote, type BlockquoteOptions } from './Blockquote'
import { Bold, type BoldOptions } from './Bold'
import { BulletList, type BulletListOptions } from './BulletList'
import { CharacterCount, type CharacterCountOptions } from '@tiptap/extension-character-count'
import { Clear, type ClearOptions } from './Clear'
import { Code, type CodeOptions } from './Code'
import { CodeBlock, type CodeBlockOptions } from './CodeBlock'
import { Collaboration, type CollaborationOptions } from './Collaboration'
import { CollaborationCursor, type CollaborationCursorOptions } from './CollaborationCursor'
import { Color, type ColorOptions } from './Color'
import { Columns, type ColumnsOptions } from './MultiColumn'
import { Comment, type CommentOptions } from './Comment'
import { Details, type DetailsOptions } from './Details'
import { Document } from './Document'
import { Dropcursor, type DropcursorOptions } from '@tiptap/extension-dropcursor'
import Emoji, { type EmojiOptions, gitHubEmojis } from '@tiptap-pro/extension-emoji'
import EmojiSuggestion from './Emoji'
import Focus, { type FocusOptions } from '@tiptap/extension-focus'
import { FormatPainter, type FormatPainterOptions } from './FormatPainter'
import { FontSize, type FontSizeOptions } from './FontSize'
import { Fullscreen, type FullscreenOptions } from './Fullscreen'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { HardBreak, type HardBreakOptions } from '@tiptap/extension-hard-break'
import { Heading, type HeadingOptions } from './Heading'
import { Highlight, type HighlightOptions } from './Highlight'
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
import { TableOfContents } from './TableOfContents'
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
  ai: Partial<AIOptions> | false

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
   * Collaboration options or false, indicating whether to enable collaboration
   *
   * @default true
   */
  collaboration: Partial<CollaborationOptions> | false

  /**
   * CollaborationCursor options or false, indicating whether to enable collaboration cursors
   *
   * @default true
   */
  collaborationCursor: Partial<CollaborationCursorOptions> | false

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
   * Comment options or false, indicating whether to enable comments
   *
   * @default true
   */
  comment: Partial<CommentOptions> | false

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
   * Highlight options or false, indicating whether to enable highlights
   *
   * @default true
   */
  highlight: Partial<HighlightOptions> | false

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
   * TableOfContents options or false, indicating whether to enable the table of contents
   *
   * @default true
   */
  tableOfContents: false

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
    const AIShortcuts = [
      {
        label: 'Générer depuis la sélection',
        children: [
          {
            label: 'Améliorer l\'écriture',
            prompt:
              'Réécrivez ce contenu sans fautes d\'orthographe, avec une grammaire correcte et un langage plus descriptif, en utilisant les meilleures pratiques d\'écriture sans perdre le sens d\'origine.',
          },
          {
            label: 'Raccourcir',
            prompt:
              'Supprimer tout ce qui est répétitif, redondant ou non essentiel dans ce contenu sans en changer le sens ni perdre d\'informations clés.',
          },
          {
            label: 'Faire plus long',
            prompt:
              'Développez ce contenu avec un langage descriptif et des explications plus détaillées, afin de faciliter la compréhension du texte et d\'augmenter la longueur du contenu.',
          },
          {
            label: 'Résumez',
            prompt: 'Fournir les points et les concepts clés de ce contenu dans un résumé succinct.',
          },
          {
            label: 'Continuer',
            prompt:
              'Développez et poursuivez ce contenu en conservant le ton et le style d\'origine. Veillez à ce que la suite découle naturellement de l\'écriture existante tout en ajoutant de nouvelles idées, des détails supplémentaires ou en poursuivant la narration ou l\'argumentation de manière cohérente.',
          },
        ],
      },

      {
        label: 'Changer de ton',
        children: [
          {
            label: 'Professionnel',
            prompt:
              'Réécrivez ce contenu en utilisant un langage soigné, formel et respectueux pour transmettre votre expertise et vos compétences professionnelles.',
          },
          {
            label: 'Décontracté',
            prompt:
              'Réécrivez ce contenu dans un langage décontracté et informel, afin d\'évoquer une conversation décontractée avec une personne réelle.',
          },
          {
            label: 'Direct',
            prompt: 'Réécrivez ce contenu dans un langage direct en n\'utilisant que les informations essentielles.',
          },
          {
            label: 'Confiant',
            prompt: 'Réécrivez ce contenu en utilisant un langage convaincant et optimiste pour transmettre la confiance dans l\'écriture.',
          },
          {
            label: 'Amical',
            prompt: 'Réécrivez ce contenu en utilisant un langage amical et réconfortant, afin de faire preuve de compréhension et d\'empathie.',
          },
        ],
      },
      {
        label: 'Changer le style',
        children: [
          {
            label: 'Business',
            prompt: 'Réécrivez ce contenu en utilisant un langage formel, comme s\'il s\'agissait d\'un professionnel des affaires.',
          },
          {
            label: 'Juridique',
            prompt: 'Réécrivez ce contenu en tant que professionnel du droit en utilisant une terminologie juridique valide.',
          },
          {
            label: 'Journalisme',
            prompt:
              'Réécrire ce contenu en tant que journaliste en utilisant un langage attrayant pour transmettre l\'importance de l\'information.',
          },
          {
            label: 'Médical',
            prompt: 'Réécrivez ce contenu en tant que professionnel de la santé en utilisant une terminologie médicale valide.',
          },
          {
            label: 'Poétique',
            prompt: 'Réécrivez ce contenu sous forme de poème en utilisant des techniques poétiques sans perdre le sens original.',
          },
        ],
      },
      {
        label: 'Traduire',
        children: [
          {
            label: 'Anglais',
            prompt: 'Traduit ce contenu en anglais.',
          },
          {
            label: 'Chinois simplifié',
            prompt: 'Traduit ce contenu en chinois simplifié.',
          },
          {
            label: 'Espagnol',
            prompt: 'Traduit ce contenu en espagnol simplifié.',
          },
          {
            label: 'Allemand',
            prompt: 'Traduit ce contenu en allemand simplifié.',
          },
          {
            label: 'Français',
            prompt: 'Traduit ce contenu en français simplifié.',
          },
          {
            label: 'Portugais',
            prompt: 'Traduit ce contenu en portugais simplifié.',
          },
          {
            label: 'Coréen',
            prompt: 'Traduit ce contenu en coréen simplifié.',
          },
          {
            label: 'Japonais',
            prompt: 'Traduit ce contenu en japonais simplifié.',
          },
          {
            label: 'Hindi',
            prompt: 'Traduit ce contenu en hindi simplifié.',
          },
          {
            label: 'Arabe',
            prompt: 'Traduit ce contenu en arabe simplifié.',
          }
        ]
      }
    ]

    if (this.options.ai !== false) {
      extensions.push(AI.configure({
        completions: AICompletions,
        shortcuts: AIShortcuts
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

    if (this.options.collaboration !== false) {
      extensions.push(Collaboration.configure(this.options.collaboration))
    }

    if (this.options.collaborationCursor !== false) {
      extensions.push(CollaborationCursor.configure(this.options.collaborationCursor))
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

    if (this.options.comment !== false) {
      extensions.push(Comment.configure(this.options.comment))
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

    if (this.options.highlight !== false) {
      extensions.push(Highlight.configure(this.options.highlight))
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

    if (this.options.tableOfContents !== false) {
      extensions.push(TableOfContents.configure(this.options.tableOfContents))
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

async function AICompletions(prompt: string, context: string) {
  // API Key
  const apiKey = useRuntimeConfig().public.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('Please set your OpenAI API key in .env file')
  }
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  })
  const systemMsg = [
    'Answer the question based on the context below.',
    'The response should be in HTML format.',
    'The response should preserve any HTML formatting, links, and styles in the context.'
  ]
  const systemPrompt = systemMsg.map(item => ({ role: 'system', content: item }))
  const userPrompt = [
    {
      role: 'user',
      content: `Question: ${prompt} Context:${context}`
    }
  ]
  const finalMessage: any = [...systemPrompt, ...userPrompt]

  try {
    return await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: finalMessage,
      temperature: 0.7,
      stream: true,
      max_tokens: 2048
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in AI Completions:', error.message)
    }
    throw error
  }
}
