/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "../../../error-page/src/page.html",
        "../../../error-page/tmp/js/*.js"
    ],
    theme: {
        extend: {
            fontSize: { 0: "0rem" }
        },
    },
    plugins: [],
}
