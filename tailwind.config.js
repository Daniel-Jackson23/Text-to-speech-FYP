/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            // responsive Breakpoints//
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'

        },
        extend: {
            colors: {
                'primary-blue': '#4a6591',
                'primary-blue-100': '#31395d',
                'primary-blue-200': '#4f91c7',
                'primary-navy': '#0f1726',
                'primary-white': '#d0dbd9'
            }
        },
    },
    plugins: [],
}