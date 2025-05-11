import {
  TaskItem,
  TaskItemOptions,
  TaskList as TiptapTaskList,
  TaskListOptions as TiptapTaskListOptions,
} from "@tiptap/extension-list";

import type { GeneralOptions } from '../../types'
import ActionButton from '../../components/ActionButton.vue'

/**
 * Represents the interface for task list options, extending TiptapTaskListOptions and GeneralOptions.
 */
export interface TaskListOptions extends TiptapTaskListOptions, GeneralOptions<TaskListOptions> {
  /** options for task items */
  taskItem: Partial<TaskItemOptions>
}

export const TaskList = TiptapTaskList.extend<TaskListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'task-list',
      },
      taskItem: {
        HTMLAttributes: {
          class: 'task-list-item',
        },
      },
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleTaskList(),
          isActive: () => editor.isActive('taskList') || false,
          disabled: !editor.can().toggleTaskList(),
          icon: 'i-lucide-list-todo',
          shortcuts: ['shift', 'mod', '9'],
          tooltip: t('editor.tasklist.tooltip'),
        },
      }),
    }
  },

  addExtensions() {
    return [TaskItem.configure(this.options.taskItem)]
  },
})
