<script lang="ts" setup>
import type { Node } from '@tiptap/pm/model'
import { Editor } from '@tiptap/vue-3'
import type { NodeSelection, Plugin } from '@tiptap/pm/state'
import { DragHandlePlugin, dragHandlePluginDefaultKey } from '../../utils/drag'
import { MoveNode } from '../../utils/pm-utils'

type PluginRefType = Plugin<{
  locked: boolean
}>

const props = defineProps({
  className: {
    type: String,
    default: 'drag-handle',
  },
  editor: {
    type: Editor,
    required: true,
  },
  pluginKey: {
    type: String,
    default: dragHandlePluginDefaultKey,
  },
  onNodeChange: Function,
  tippyOptions: {
    type: Object,
    default: () => ({}),
  },
})

const { t } = useI18n()

const dragElement = ref(null)
const pluginRef = ref<PluginRefType | null>(null)
const currentNode = ref<Node | null>(null)
const currentNodePos = ref<number>(-1)
const menuOpen = ref(false)
const canMoveUp = ref(false)
const canMoveDown = ref(false)

onMounted(() => {
  if (dragElement.value && !props.editor?.isDestroyed && props.editor?.isEditable) {
    // Initialize and register the plugin
    pluginRef.value = DragHandlePlugin({
      editor: props.editor,
      element: dragElement.value,
      pluginKey: 'ContentItemMenu',
      tippyOptions: {
        offset: [-2, 16],
        zIndex: 99,
        moveTransition: 'transform 0.15s ease-out',
      },
      onNodeChange: handleNodeChange,
    })
    
    props.editor.registerPlugin(pluginRef.value)
  }
})

onUnmounted(() => {
  if (pluginRef.value) {
    props.editor.unregisterPlugin(props.pluginKey)
  }
})

function resetTextFormatting() {
  const chain = props.editor.chain()
  chain.setNodeSelection(currentNodePos.value).unsetAllMarks()
  if (currentNode.value?.type.name !== 'paragraph') {
    chain.setParagraph()
  }
  chain.run()
}

function copyNodeToClipboard() {
  props.editor.chain().focus().setNodeSelection(currentNodePos.value).run()
  // TODO copy node to clipboard
  document.execCommand('copy')
}

function duplicateNode() {
  props.editor.commands.setNodeSelection(currentNodePos.value)
  const { $anchor } = props.editor.state.selection
  const selectedNode = $anchor.node(1) || (props.editor.state.selection as NodeSelection).node
  props.editor
    .chain()
    .setMeta('hideDragHandle', true)
    .insertContentAt(currentNodePos.value + (currentNode.value?.nodeSize || 0), selectedNode.toJSON())
    .run()
}

function deleteNode() {
  props.editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos.value).deleteSelection().run()
}

function handleNodeChange(e) {
  if (e.node) {
    currentNode.value = e.node
  }
  currentNodePos.value = e.pos
  
  canMoveUp.value = canMoveNodeUp()
  canMoveDown.value = canMoveNodeDown()
}

const moveNode = (dir) => {
  MoveNode({
    view: props.editor.view,
    dir,
    currentResolved: props.editor.state.selection.$from,
  })
}

const canMoveNodeUp = () => {
  const selectionStart = props.editor.view?.state.selection.$from
  return selectionStart.index(0) > 0
}

const canMoveNodeDown = () => {
  const selectionStart = props.editor.state.selection.$from
  return selectionStart.index(0) < selectionStart.node(0).childCount - 1
}

function handleAdd() {
  if (currentNodePos.value !== -1) {
    const currentNodeSize = currentNode.value?.nodeSize || 0
    const insertPos = currentNodePos.value + currentNodeSize
    const currentNodeIsEmptyParagraph
      = currentNode.value?.type.name === 'paragraph' && currentNode.value?.content?.size === 0
    const focusPos = currentNodeIsEmptyParagraph ? currentNodePos.value + 2 : insertPos + 2
    props.editor
      .chain()
      .command(({ dispatch, tr, state }) => {
        if (dispatch) {
          if (currentNodeIsEmptyParagraph) {
            tr.insertText('/', currentNodePos.value, currentNodePos.value + 1)
          } else {
            tr.insert(insertPos, state.schema.nodes.paragraph.create(null, [state.schema.text('/')]))
          }
          
          return dispatch(tr)
        }
        
        return true
      })
      .focus(focusPos)
      .run()
  }
}

watch(
  () => menuOpen.value,
  (val) => {
    if (val) {
      // Lock the drag handle when the menu is open
      props.editor.commands.setMeta('lockDragHandle', true)
    } else {
      props.editor.commands.setMeta('lockDragHandle', false)
    }
  },
)

watch(
  () => props.editor.isDestroyed,
  (isDestroyed) => {
    if (isDestroyed && pluginRef.value) {
      props.editor.unregisterPlugin(props.pluginKey)
      pluginRef.value = null
    }
  },
)
</script>

<template>
  <div
    v-if="!props.editor.isDestroyed && props.editor.isEditable"
    ref="dragElement"
    :class="className"
    style="transition-property: top, left; transition-timing-function: ease-in-out; transition-duration: 0.2s"
  >
    <div
      class="flex items-baseline"
      style="transition-property: top, left; transition-timing-function: ease-in-out; transition-duration: 0.2s"
    >
      <UButton
        color="gray"
        icon="i-heroicons-plus"
        size="2xs"
        variant="ghost"
        @click="handleAdd"
      />
      
      <UPopover
        v-model:open="menuOpen"
        :popper="{ placement: 'top-start' }"
        :ui="{ base: 'p-1' }"
      >
        <UButton
          color="gray"
          icon="i-lucide-grip-vertical"
          size="2xs"
          variant="ghost"
        />
        
        <template #panel>
          <div class="w-max flex flex-col">
            <UButton
              :disabled="!canMoveUp"
              color="gray"
              icon="i-heroicons-chevron-up"
              label="Remonter"
              size="xs"
              variant="ghost"
              @click="moveNode('UP')"
            />
            <UButton
              :disabled="!canMoveDown"
              color="gray"
              icon="i-heroicons-chevron-down"
              label="Descendre"
              size="xs"
              variant="ghost"
              @click="moveNode('DOWN')"
            />
            
            <UDivider
              class="my-1"
              orientation="horizontal"
            />
            
            <UButton
              :label="$t('editor.clear.tooltip')"
              color="gray"
              icon="i-lucide-paint-roller"
              size="xs"
              variant="ghost"
              @click="resetTextFormatting"
            />
            <UButton
              :label="$t('editor.copy')"
              color="gray"
              icon="i-heroicons-clipboard"
              size="xs"
              variant="ghost"
              @click="copyNodeToClipboard"
            />
            <UButton
              :label="$t('editor.duplicate')"
              color="gray"
              icon="i-lucide-copy"
              size="xs"
              variant="ghost"
              @click="duplicateNode"
            />
            
            <UDivider
              class="my-1"
              orientation="horizontal"
            />
            
            <UButton
              :label="$t('editor.remove')"
              color="red"
              icon="i-heroicons-trash"
              size="xs"
              variant="soft"
              @click="deleteNode"
            />
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>
