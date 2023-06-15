// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-icon', '@nuxt/image-edge', '@pinia-plugin-persistedstate/nuxt'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    image: {
        staticFilename: '[publicPath]/images/[name]-[hash][ext]'
    }
})

