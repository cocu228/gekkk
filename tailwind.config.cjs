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
                gray: {
                    DEFAULT: '#888A92',
                    200: '#dee2e7',
                    400: '#b4c0cd',
                    dark: '#3A3A3A',
                },
                'blue': '#1fb6ff',
                'purple': '#7e5bef',
                'pink': '#ff49db',
                'orange': '#ff7849',
                'green': '#13ce66',
                'green-light': '#2bb673',
                'yellow': '#ffc82c'
            },

            fontWeight: {
                inherit: 'inherit',
            }
        }
    },
    plugins: [],
}
