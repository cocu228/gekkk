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
            'sm': {max: '576px'},

            '-xxxl': {min: '1700px'},
            '-xxl': {min: '1400px'},
            '-xl': {min: '1200px'},
            '-lg': {min: '992px'},
            '-md': {min: '768px'},
            '-sm': {min: '576px'}
        },

        // width: {
        //     inherit: 'inherit',
        //     full: '100%',
        // },

        height: {
            inherit: 'inherit',
            full: '100%',
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
                red: {
                    main: 'rgb(var(--red) / <alpha-value>)',
                    800: "var(--color-red-800)"
                },
                orange: 'rgb(var(--orange) / <alpha-value>)',

                blue: {
                    300: "var(--color-blue-300)",
                    400: "var(--color-blue-400)"
                },
                gray: {
                    main: 'var(--color-main-bg)',
                    200: 'var(--color-gray-200)',
                    300: 'var(--color-gray-300)',
                    400: 'var(--color-gray-400)',
                    450: 'var(--color-gray-450)',
                    500: 'var(--color-gray-500)',
                    600: 'var(--color-gray-600)'
                },
                'purple': '#7e5bef',
                'pink': '#ff49db',
                'yellow': '#ffc82c',
            },

            fontWeight: {
                inherit: 'inherit',
            },

            fontSize: {
                fs10: '10px',
                fs12: '12px',
                fs14: '14px',
                fs24: '24px',
                fs32: '32px',
            }
        }
    },
    plugins: [],
}
