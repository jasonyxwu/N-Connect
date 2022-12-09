/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{tsx,ts}", "./src/components/**/*.{tsx,ts}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms"), require("daisyui")],
    daisyui: {
        themes: false,
    },
};
