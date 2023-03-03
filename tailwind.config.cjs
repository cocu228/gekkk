/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,tsx,js,ts,jsx}", "*.html"],
    theme: {
        prefix: 'tw-',
        important: true,

        screens: {
            'desktop': {max: '1280px'},
            'laptop': {max: '1024px'},
            'tablet': {max: '768px'},
            'phone': {max: '640px'}
        },

        width: {
            sm: '756px'
        },

        height: {
            inherit: "inherit",
            full: "100%",
            m: '750px'
        },
        borderWidth: {
            1: "1px"
        },
        extend: {
            colors: {
                linkBlue: '#00AEEF'
            }
        },
    },
    plugins: [],
}
