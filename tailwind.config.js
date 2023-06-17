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
            gridTemplateColumns: {
                '15': 'repeat(15, minmax(0, 1fr))',
                '20': 'repeat(20, minmax(0, 1fr))',
                '25': 'repeat(25, minmax(0, 1fr))',
                '30': 'repeat(30, minmax(0, 1fr))',
            },
            gridTemplateRows: {
                '15': 'repeat(15, minmax(0, 1fr))',
                '20': 'repeat(20, minmax(0, 1fr))',
            },
        },
    },
    safelist: [
        {
          pattern: /text-(red|lime)-(600)/, // You can display all the colors that you need
        },
        {
            pattern: /grid-(rows|cols)-(3|4|5|6|15|20|25|30)/,
        },
    ],
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};