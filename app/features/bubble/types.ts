import type { ButtonViewParams, ButtonViewReturn, ExtensionNameKeys } from '../../types'

/** Represents the size types for bubble images or videos */
export type BubbleImageOrVideoSizeType = 'size-small' | 'size-medium' | 'size-large'

/** Represents the various types for bubble images */
type BubbleImageType =
  | `image-${BubbleImageOrVideoSizeType}`
  | `video-${BubbleImageOrVideoSizeType}`
  | 'image'
  | 'image-aspect-ratio'
  | 'remove'

/** Represents the types for bubble videos */
type BubbleVideoType = 'video' | 'remove'

/** Represents the overall types for bubbles */
type BubbleAllType = BubbleImageType | BubbleVideoType | ExtensionNameKeys | 'divider' | (string & {})

/** Represents the key types for node types */
export type NodeTypeKey = 'image' | 'text' | 'video'

/** Represents the menu of bubble types for each node type */
export type BubbleTypeMenu = Partial<Record<NodeTypeKey, BubbleMenuItem[]>>

/** Represents the menu of overall bubble types for each node type */
export type NodeTypeMenu = Partial<Record<NodeTypeKey, BubbleAllType[]>>

/**
 * Represents the structure of a bubble menu item.
 */
export interface BubbleMenuItem extends ButtonViewReturn {
  /** The type of the bubble item */
  type: BubbleAllType
}

/**
 * Represents a function to generate a bubble menu
 */
interface BubbleView<T = any> {
  /**
   * Generates a bubble menu based on the provided options.
   * @param {ButtonViewParams<T>} options - The options for generating the bubble menu.
   * @returns {BubbleTypeMenu} The generated bubble menu.
   */
  (options: ButtonViewParams<T>): BubbleTypeMenu
}

/**
 * Represents the options for configuring bubbles.
 * @interface BubbleOptions
 * @template T
 */
export interface BubbleOptions<T> {
  /** The menu of bubble types for each node type. */
  list: NodeTypeMenu
  /** The default list of bubble types. */
  defaultBubbleList: typeof defaultBubbleList
  /** The function to generate a bubble menu. */
  button: BubbleView<T>
}
