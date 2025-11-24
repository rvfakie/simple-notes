export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],

  app: {
    head: {
      title: 'Todos',
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },

  css: [
    '~/assets/scss/main.scss',
    '~/assets/scss/variables.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/index.scss" as *;\n',
        },
      },
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
});
