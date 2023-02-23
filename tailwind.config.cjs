/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,tsx,js,ts,jsx}", "*.html"],
    theme: {
        prefix: 'tw-',
        important: true,

        height: {
            inherit: "inherit"
        },
        borderWidth: {
            1: "1px"
        },
        extend: {},
    },
    plugins: [],
}
