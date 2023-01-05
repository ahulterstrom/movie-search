export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },
})