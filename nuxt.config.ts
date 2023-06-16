// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Food chain companion',
            meta: [{
                name: 'Food chain companion',
                content: 'Application to help you play the board game Food chain magnate and make the dinnertime phase easier.'
            }]
        },
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-icon', '@pinia-plugin-persistedstate/nuxt'],
    piniaPersistedstate: {
        storage: 'localStorage'
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})

