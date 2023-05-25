/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/page.html",
        "./dist/js/page.js"
    ],
    theme: {
        extend: {
            fontSize: { 0: "0rem" }
        },
    },
    plugins: [],
}
