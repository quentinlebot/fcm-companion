module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
        },
    },
    safelist: [
        {
          pattern: /text-(red|lime)-(600)/, // You can display all the colors that you need
        },
    ],
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};