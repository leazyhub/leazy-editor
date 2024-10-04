export default defineAppConfig({
  leazyEditor: {
    name: 'Hello from Nuxt layer'
  },
  ui: {
    variables: {
      header: {
        height: '3rem'
      }
    },
    primary: 'indigo',
    gray: 'stone',
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
