import { TextStyleOptions } from "@tiptap/extension-text-style";
import { ListItemOptions } from "@tiptap/extension-list";
import { CharacterCountOptions, DropcursorOptions, FocusOptions, PlaceholderOptions } from "@tiptap/extensions";
import type { EmojiOptions } from '@tiptap-pro/extension-emoji'
import type { ExportOptions } from '../extensions/Export'
import type { HardBreakOptions } from '@tiptap/extension-hard-break'
import type { ParagraphOptions } from '@tiptap/extension-paragraph'
import type { YoutubeOptions } from '@tiptap/extension-youtube'
import type { BlockquoteOptions } from '../extensions/Blockquote'
import type { BoldOptions } from '../extensions/Bold'
import type { BulletListOptions } from '../extensions/BulletList'
import type { ClearOptions } from '../extensions/Clear'
import type { CodeOptions } from '../extensions/Code'
import type { CodeBlockOptions } from '../extensions/CodeBlock'
import type { ColorOptions } from '../extensions/Color'
import type { ColumnsOptions } from '../extensions/MultiColumn'
import type { CommentOptions } from '../extensions/Comment'
import type { DetailsOptions } from '../extensions/Details'
import type { FormatPainterOptions } from '../extensions/FormatPainter'
import type { FontSizeOptions } from '../extensions/FontSize'
import type { FullscreenOptions } from '../extensions/Fullscreen'
import type { HeadingOptions } from '../extensions/Heading'
import type { HighlightOptions } from '../extensions/Highlight'
import type { HistoryOptions } from '../extensions/History'
import type { HorizontalRuleOptions } from '../extensions/HorizontalRule'
import type { IframeOptions } from '../extensions/Iframe'
import type { ImageOptions } from '../extensions/Image'
import type { ImportOptions } from '../extensions/Import'
import type { ImportWordOptions } from '../extensions/ImportWord'
import type { IndentOptions } from '../extensions/Indent'
import type { ItalicOptions } from '../extensions/Italic'
import type { LineHeightOptions } from '../extensions/LineHeight'
import type { LinkOptions } from '../extensions/Link'
import type { MathOptions } from '../extensions/Math'
import type { MoreMarkOptions } from '../extensions/MoreMark'
import type { OrderedListOptions } from '../extensions/OrderedList'
import type { SpeechRecognitionOptions } from '../extensions/SpeechRecognition'
import type { SpeechSynthesisOptions } from '../extensions/SpeechSynthesis'
import type { StrikeOptions } from '../extensions/Strike'
import type { SubAndSuperScriptOptions } from '../extensions/Subscript'
import type { TableOptions } from '../extensions/Table'
import type { TaskListOptions } from '../extensions/TaskList'
import type { TextAlignOptions } from '../extensions/TextAlign'
import type { TextBubbleOptions } from '../extensions/TextBubble'
import type { TrailingNodeOptions } from '../extensions/TrailingNode'
import type { UnderlineOptions } from '../extensions/UnderLine'
import type { UniqueIdOptions } from '../extensions/UniqueId'
import type { VideoOptions } from '../extensions/Video'
import type { AlertOptions } from '../extensions/Alert'

export interface ExtensionButtonViewParams<T> {
  editor: Editor
  t: (key: string, options?: Record<string, any>) => string
  extension: Extension<T>
}

export interface ButtonViewReturn {
  /** Component */
  component: unknown
  /** Component props */
  componentProps: ButtonViewReturnComponentProps
  /** Component slots */
  componentSlots?: ButtonViewReturnComponentSlots
}

export interface ExtensionButtonView<T = any> {
  (options: ExtensionButtonViewParams<T>): ButtonViewReturn | ButtonViewReturn[]
}

export interface BaseExtensionOption<T> {
  /** Enabled divider */
  divider: boolean
  /** Enabled spacer */
  spacer: boolean
  /** Button view function */
  button: ButtonView<T>
  /** Show on Toolbar */
  toolbar?: boolean
}

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
   * Export options or false, indicating whether to enable exports
   *
   * @default true
   */
  export: Partial<ExportOptions> | false

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
   * Import options or false, indicating whether to enable imports
   *
   * @default true
   */
  import: Partial<ImportOptions> | false

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
