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
            full: '100%',
            sm: '756px'
        },

        height: {
            inherit: 'inherit',
            full: '100%',
            m: '750px'
        },

        maxWidth: {
            sm: '756px',
        },

        borderWidth: {
            1: "1px"
        },

        extend: {
            colors: {
                gekLinkBlue: '#00AEEF',
                gekGray: '#888A92',
                gekDarkGray: '#3A3A3A',
                gekLightGray: '#b4c0cd',
                'blue': '#1fb6ff',
                'purple': '#7e5bef',
                'pink': '#ff49db',
                'orange': '#ff7849',
                'green': '#13ce66',
                'yellow': '#ffc82c',
                'gray-dark': '#273444',
                'gray': '#B4C0CD',
                'gray-light': '#d3dce6'
            },

            fontWeight: {
                inherit: 'inherit',
            }
        }
    },
    plugins: [],
}
