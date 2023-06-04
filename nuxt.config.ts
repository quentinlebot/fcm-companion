// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        prerender: {
            crawlLinks: true
        }
    },
    ssr: false,
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

