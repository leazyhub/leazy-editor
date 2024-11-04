import 'dotenv/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  nitro: {
    experimental: {
      websocket: true,
    }
  },
  runtimeConfig: {
    public: {
      OPENAI_API_KEY: process.env.NUXT_OPENAI_API_KEY
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  ui: {
    icons: ['simple-icons', 'lucide', 'fluent', 'mdi'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  i18n: {
    legacy: false,
    locales: [
      {
        code: 'fr',
        language: 'fr-FR',
        file: 'fr.json'
      },
      {
        code: 'en',
        language: 'en-US',
        file: 'en.json'
      }
    ],
    lazy: true,
    defaultLocale: 'fr',
    experimental: {
      localeDetector: './localeDetector.ts',
      autoImportTranslationFunctions: true,
      switchLocalePathLinkSSR: true,
      typedOptionsAndMessages: 'default'
    }
  },
  devtools: { enabled: true }
})
