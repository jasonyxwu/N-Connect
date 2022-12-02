/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{tsx,ts}", "./src/pages/**/*.{tsx,ts}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
