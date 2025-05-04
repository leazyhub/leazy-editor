import { Mark, mergeAttributes, type Range } from '@tiptap/core'
import { Mark as PMMark } from '@tiptap/pm/model'
import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'
import { v4 as uuid } from 'uuid'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    comment: {
      /**
       * Set a comment (add)
       */
      setComment: (comment_id: string, author: object) => ReturnType,
      /**
       * Unset a comment (remove)
       */
      unsetComment: (comment_id: string) => ReturnType
    }
  }
}

export interface MarkWithRange {
  mark: PMMark
  range: Range
}

export interface CommentOptions extends GeneralOptions<CommentOptions> {
  HTMLAttributes: Record<string, any>
  onCommentActivated: (comment_id: string) => void
}

export interface CommentStorage {
  activeCommentId: string | null
}

export const Comment = Mark.create<CommentOptions, CommentStorage>({
  name: 'comment',
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'my-comment'
      },
      onCommentActivated: () => {
      },
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            const newComment = {
              id: `a${uuid()}a`,
              content: '',
              replies: [],
              validated: false,
              edit_mode: false,
              resolved: false,
              createdAt: new Date(),
              author: {
                id: null,
                name: null
              }
            }
            editor.commands.setComment(newComment.id, newComment.author)
          },
          isActive: () => !!editor.storage.activeCommentId,
          icon: 'i-lucide-message-square-plus',
          tooltip: t('editor.comments.tooltip')
        },
      })
    }
  },
  addAttributes() {
    return {
      comment_id: {
        default: null,
        parseHTML: (el) => (el as HTMLSpanElement).getAttribute('data-comment-id'),
        renderHTML: (attrs) => ({ 'data-comment-id': attrs.comment_id })
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'span[data-comment-id]',
        getAttrs: (el) => !!(el as HTMLSpanElement).getAttribute('data-comment-id')?.trim() && null
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },
  onSelectionUpdate() {
    const { $from } = this.editor.state.selection
    const marks = $from.marks()

    if (!marks.length) {
      this.storage.activeCommentId = null
      this.options.onCommentActivated(this.storage.activeCommentId)
      return
    }

    const commentMark = this.editor.schema.marks.comment
    const activeCommentMark = marks.find((mark) => mark.type === commentMark)
    this.storage.activeCommentId = activeCommentMark?.attrs.comment_id || null
    this.options.onCommentActivated(this.storage.activeCommentId)
  },
  addStorage() {
    return {
      activeCommentId: null,
      comments: []
    }
  },
  addCommands() {
    return {
      setComment: (comment_id, author: object) => ({ commands, state }) => {
        if (!comment_id) return false

        const { from, to } = state.selection
        const target = state.doc.textBetween(from, to)

        if (!this.storage.comments.some(comment => comment.id === comment_id)) {
          const newComment = {
            id: comment_id,
            content: '',
            target,
            replies: [],
            validated: false,
            edit_mode: false,
            resolved: false,
            createdAt: new Date(),
            author: {
              id: author?.id,
              name: author?.name
            }
          }
          this.storage.comments.push(newComment)

          this.editor.emit('comment:added', newComment)
        }

        commands.setMark('comment', { comment_id })
      },
      updateComment: (comment_id, comment_content) => ({ commands }) => {
        if (!comment_id) return false

        const comment = this.storage.comments.find(comment => comment.id === comment_id)
        if (!comment) return false

        Object.assign(comment, comment_content)

        this.editor.emit('comment:updated', comment)

        return commands.setMark('comment', { comment_id })
      },
      unsetComment: (comment_id) => ({ tr, dispatch }) => {
        if (!comment_id) return false

        const commentMarksWithRange: MarkWithRange[] = []

        tr.doc.descendants((node, pos) => {
          const commentMark = node.marks.find(
            (mark) =>
              mark.type.name === 'comment' &&
              mark.attrs.comment_id === comment_id
          )

          if (!commentMark) return

          commentMarksWithRange.push({
            mark: commentMark,
            range: {
              from: pos,
              to: pos + node.nodeSize
            }
          })
        })

        commentMarksWithRange.forEach(({ mark, range }) => {
          tr.removeMark(range.from, range.to, mark)
        })

        this.storage.comments = this.storage.comments.filter(comment => comment.id !== comment_id)

        this.editor.emit('comment:removed', comment_id)

        return dispatch?.(tr)
      },
      setReply: (comment_id, reply_content, author) => () => {
        if (!comment_id || !reply_content) return false

        const comment = this.storage.comments.find(comment => comment.id === comment_id)
        if (!comment) return false

        const reply = {
          id: `a${uuid()}a`,
          content: reply_content,
          validated: reply_content.validated,
          edit_mode: reply_content.edit_mode,
          createdAt: new Date(),
          author: {
            id: author?.id,
            name: author?.name
          }
        }

        comment.replies.push(reply)

        this.editor.emit('comment:replied', reply)

        return true
      }
    }
  }
})
