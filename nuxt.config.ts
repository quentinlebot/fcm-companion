// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-icon', '@nuxt/image-edge'],
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

