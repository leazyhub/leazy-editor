export default defineAppConfig({
  leazyEditor: {
    name: 'Hello from Leazy Editor layer'
  },
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'zinc',
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    }
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    leazyEditor?: {
      name?: string
    }
  }
}
