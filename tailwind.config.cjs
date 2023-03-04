/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,tsx,js,ts,jsx}", "*.html"],
    theme: {
        height: {
            inherit: "inherit",
            full: "100%"
        },
        borderWidth: {
            1: "1px"
        },
        colors: {
            'blue': '#1fb6ff',
            'purple': '#7e5bef',
            'pink': '#ff49db',
            'orange': '#ff7849',
            'green': '#13ce66',
            'yellow': '#ffc82c',
            'gray-dark': '#273444',
            'gray': '#B4C0CD',
            'gray-light': '#d3dce6',
        },
        extend: {},
    },
    plugins: [],
}
