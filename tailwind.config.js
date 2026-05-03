/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/theme/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hindSiliguri: ["var(--font-hindSiliguri)"],
        baiJamjuree: ["var(--font-baiJamjuree)", "var(--font-hindSiliguri)"],
      },
      colors: {
        primary: "var(--primary)",
        primaryDark: "var(--brand-from)", // For backward compatibility in gradients
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          from: "var(--brand-from)",
          to: "var(--brand-to)",
        },
      },
    },
  },
  plugins: [],
};
