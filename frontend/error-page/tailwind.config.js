/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/page.html",
        "./tmp/js/*.js"
    ],
    theme: {
        extend: {
            fontSize: { 0: "0rem" }
        },
    },
    plugins: [],
}
