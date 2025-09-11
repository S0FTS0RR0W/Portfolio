// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'static'
  },
  prerender: {
    crawlLinks: false,
    routes: ['/', '/projects', '/projects/project1']
  },
  app: {
    head: {
      title: '$./portfolio.sh',
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/test-utils', '@nuxt/ui']
})