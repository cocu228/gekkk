/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,tsx,js,ts,jsx}", "*.html"],
    theme: {
        screens: {
            'desktopXl': {max: '1700px'},
            'desktopLg': {max: '1440px'},
            'desktop': {max: '1280px'},
            'laptop': {max: '1024px'},
            'tablet': {max: '768px'},
            'phone': {max: '640px'}
        },

        width: {
            inherit: 'inherit',
            full: '100%',
        },

        height: {
            inherit: 'inherit',
            full: '100%',
            m: '750px'
        },

        borderWidth: {
            1: "1px"
        },

        extend: {
            colors: {
                'blue-light': '#00AEEF',
                'gray': '#888A92',
                'gray-dark': '#3A3A3A',
                'gray-semilight': '#b4c0cd',
                'gray-light': '#dee2e7',
                'blue': '#1fb6ff',
                'purple': '#7e5bef',
                'pink': '#ff49db',
                'orange': '#ff7849',
                'green': '#13ce66',
                'yellow': '#ffc82c'
            },

            fontWeight: {
                inherit: 'inherit',
            }
        }
    },
    plugins: [],
}
