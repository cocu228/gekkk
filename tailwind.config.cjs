/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,tsx,js,ts,jsx}", "*.html"],
    theme: {
        screens: {
            'xxxl': {max: '1700px'},
            'xxl': {max: '1400px'},
            'xl': {max: '1200px'},
            'lg': {max: '992px'},
            'md': {max: '768px'},
            'sm': {max: '576px'}
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
                accent: 'rgb(var(--accent) / <alpha-value>)',
                primary: 'rgb(var(--primary) / <alpha-value>)',
                secondary: 'rgb(var(--secondary) / <alpha-value>)',
                bgPrimary: 'rgb(var(--bgPrimary) / <alpha-value>)',
                bgSecondary: 'rgb(var(--bgSecondary) / <alpha-value>)',
                green: 'rgb(var(--green) / <alpha-value>)',
                red: 'rgb(var(--red) / <alpha-value>)',
                orange: 'rgb(var(--orange) / <alpha-value>)',

                gekLinkBlue: '#00AEEF',
                gekGray: '#888A92',
                gekDarkGray: '#3A3A3A',
                'blue': '#1fb6ff',
                'purple': '#7e5bef',
                'pink': '#ff49db',
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
