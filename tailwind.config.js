/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./view-components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        worksans: '"Work Sans", sans-serif',
        play: '"Play", sans-serif',
        pacifico: '"Pacifico", san-serif',
        bauhaus: ["var(--font-bauhaus)"],
      },
      fontSize: {
        "signature-xl": "2.5rem",
        "price-xl": "3rem",
        "core-sm": "1rem",
        "core-md": "1.25rem",
        "core-lg": "1.5rem",
      },
      fontWeight: {
        "signature-xl": 600,
      },
      colors: {
        "bowl-card": "#FFF8EE",
        filter: "#F6EADD",
        option: "#F5EEE3",
        "base-color": "var(--base-color)",
        "feta-light": "#FFFDF8",
        "wild-rice": "#322F2E",
        sorghum: "#472A1F",
        quinoa: "#966844",
        couscous: "#C1AA95",
        buckwheat: "#BA9A61",
        oatmeal: "#FBF2E7",
        forest: "#6F745B",
        sage: "#DDD8BB",
        cornsilk: "#FFFDF0",
        "bowl-detail-background": "#FBF2E7",
        "capsicum-red": "#EE362A",
        "gray-lightest": "#F5F5F5",
        "gray-lighter": "#E0E0E0",
        "gray-light": "#CCCCCC",
        "gray-medium": "#A3A3A3",
        "gray-dark": "#7A7A7A",
        "gray-darker": "#525252",
        "gray-darkest": "#2F2F2F",
        "core-feta": "#FFFAF1",
        "core-olive": "#2F2F2F",
        "core-soy": "#F4EEDC",
        "core-spinach": "#0D4520",
        "core-kale": "#1F423C",
        "core-walnut": "#C49876",
        "core-wasabi": "#A5B59C",
        "core-seed": "#DCB59D",
        "ext-mandarin": "#EF6700",
        "ext-pomelo": "#F4D54C",
        "gray-black": "#2F2F2F",
        yogurt: "#FDFDFD",
      },
      borderRadius: {
        button: "6.25rem",
      },
      height: {
        nav: "var(--navbar-height)",
        hero: "28.75rem",
        header: "5rem",
        "button-md": "4rem",
        "button-lg": "5rem",
        "field-control": "4rem",
        // 'signature-details-preview': '931px',
        "signature-details-preview": "850px",
        "nutrition-ball": "7.5rem",
      },
      width: {
        "filter-sidebar": "17.5rem",
        "nutrition-ball": "7.5rem",
      },
      maxWidth: {
        "signature-details": "40rem",
        wrapper: "75rem",
        "signature-details-preview": "468.96px",
      },
      minWidth: {
        button: "12.5rem",
      },
      padding: {
        tag: "0.75rem 1.88rem",
        button: "1rem 2rem",
        desktop: "1rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        desktop: "750px",
      },
      keyframes: {
        fadeInOpacity: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOutOpacity: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOutScale: {
          '0%': { opacity: '0', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(0)' },
        },
        fadeInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        fadeInFromTop: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        }
      },
      animation: {
        'fade-in': 'fadeInOpacity 0.3s ease forwards',
        'fade-in-hero-foreground': 'fadeInScale 1s ease forwards 1s',
        'fade-in-scale': 'fadeInScale 0.3s ease forwards',
        'fade-in-scale-slow': 'fadeInScale 0.75s ease forwards',
        'fade-out': 'fadeOutOpacity 0.3s ease forwards',
        'fade-out-scale': 'fadeOutScale 0.3s ease forwards',
        'fade-in-from-bottom': 'fadeInFromBottom 0.5s ease forwards',
        'fade-in-from-bottom-slow': 'fadeInFromBottom 1s ease forwards',
        'fade-in-from-top': 'fadeInFromTop 0.5s ease forwards',
      },
      screens: {
        'smallest': { 'raw': '(max-height: 1000px)' },
        'tiny': { 'raw': '(max-height: 668px)' }
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
