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
      WEBSOCKET_URL: process.env.NUXT_WEBSOCKET_URL,
      OPENAI_API_KEY: process.env.NUXT_OPENAI_API_KEY,
      CONVERT_APP_ID: process.env.NUXT_CONVERT_APP_ID,
      JWT_CONVERT_TOKEN: process.env.NUXT_JWT_CONVERT_TOKEN
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
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
  optimizeDeps: {
    include: ['highlight.js']
  },
  vite: {
    resolve: {
      alias: {
        'highlight.js': 'highlight.js',
        'evaluatex': 'evaluatex'
      }
    }
  },
  devtools: { enabled: true }
})
