export default defineAppConfig({
  leazyEditor: {
    name: 'Hello from Leazy Editor layer'
  },
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'zinc',
    },
    variables: {
      header: {
        height: '3rem'
      }
    },
    tooltip: {
      default: {
        openDelay: 250
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
