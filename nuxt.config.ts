// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  ssr: false,
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
    locales: [
      {
        code: 'fr',
        file: 'fr.json'
      },
      {
        code: 'en',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'fr'
  },
  devtools: { enabled: true }
})
