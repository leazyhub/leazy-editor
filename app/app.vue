<script setup lang="ts">
const content = ref({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: {
        'class': null,
        'indent': 0,
        'lineHeight': '100%',
        'textAlign': 'left',
        'id': 'c9XPJ5nozGOytjVhv7PbK',
        'data-node-name': 'paragraph'
      },
      content: [
        {
          type: 'text',
          text: 'Crédit Marion Riera, '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                'id': null,
                'data-node-name': null,
                'href': 'https://fr.linkedin.com/in/marion-riera-9574365a',
                'target': '_blank',
                'rel': 'noopener ugc nofollow',
                'class': 'az hk link'
              }
            },
            {
              type: 'underline',
              attrs: {
                'id': null,
                'data-node-name': null
              }
            }
          ],
          text: 'Linkedin'
        },
        {
          type: 'text',
          text: ' et '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                'id': null,
                'data-node-name': null,
                'href': 'https://www.instagram.com/rion.riera/',
                'target': '_blank',
                'rel': 'noopener ugc nofollow',
                'class': 'az hk link'
              }
            },
            {
              type: 'underline',
              attrs: {
                'id': null,
                'data-node-name': null
              }
            }
          ],
          text: 'instagram '
        },
        {
          type: 'text',
          text: '— '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                'id': null,
                'data-node-name': null,
                'href': 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
                'target': '_blank',
                'rel': 'noopener ugc nofollow',
                'class': 'az hk link'
              }
            },
            {
              type: 'underline',
              attrs: {
                'id': null,
                'data-node-name': null
              }
            }
          ],
          text: 'CC-BY-SA 4.0'
        }
      ]
    }
  ]
})
const editor = useTemplateRef('editor')
</script>

<template>
  <UApp :toaster="{ expand: false }" :tooltip="{ delayDuration: 50 }">
    <div>
      <LeazyEditor ref="editor" v-model="content" @comment:added="() => console.log(editor.editor.storage.comment.comments)" class="flex-1" max-width="800" />
    </div>
  </UApp>
</template>
