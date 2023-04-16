export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',
  content: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark'
      }
    }
  }
})
