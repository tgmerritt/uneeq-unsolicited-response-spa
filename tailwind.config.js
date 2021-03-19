const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    theme: {
        extend: {},
        colors: {
            ...defaultTheme.colors,
            primary: "#232135",
            dark: "#ffffff",
            darkFont: "rgb(239, 239, 241)",
        },
    },
    variants: {},
    plugins: [],
};
