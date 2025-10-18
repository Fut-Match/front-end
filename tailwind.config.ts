import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(220 13% 91%)",
        input: "hsl(220 13% 91%)",
        ring: "hsl(0 87% 67%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(220 13% 18%)",
        primary: {
          DEFAULT: "hsl(0 87% 67%)",
          foreground: "hsl(0 0% 100%)",
          glow: "hsl(0 87% 75%)",
        },
        secondary: {
          DEFAULT: "hsl(220 13% 95%)",
          foreground: "hsl(220 13% 18%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(220 13% 95%)",
          foreground: "hsl(220 9% 46%)",
        },
        accent: {
          DEFAULT: "hsl(142 76% 36%)",
          foreground: "hsl(0 0% 100%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(220 13% 18%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(220 13% 18%)",
        },
        sidebar: {
          DEFAULT: "hsl(0 0% 98%)",
          foreground: "hsl(240 5.3% 26.1%)",
          primary: "hsl(240 5.9% 10%)",
          "primary-foreground": "hsl(0 0% 98%)",
          accent: "hsl(240 4.8% 95.9%)",
          "accent-foreground": "hsl(240 5.9% 10%)",
          border: "hsl(220 13% 91%)",
          ring: "hsl(217.2 91.2% 59.8%)",
        },
        sport: {
          field: "hsl(120 60% 30%)",
          gold: "hsl(45 100% 50%)",
          silver: "hsl(210 16% 82%)",
          bronze: "hsl(30 100% 40%)",
        },
      },
      backgroundImage: {
        "gradient-sport":
          "linear-gradient(135deg, hsl(0 87% 67%), hsl(0 87% 75%))",
        "gradient-field":
          "linear-gradient(180deg, hsl(120 60% 30%), hsl(120 50% 25%))",
        "gradient-ranking":
          "linear-gradient(135deg, hsl(45 100% 50%), hsl(45 100% 60%))",
      },
      boxShadow: {
        card: "0 4px 20px -4px hsl(0 87% 67% / 0.15)",
        glow: "0 0 30px hsl(0 87% 67% / 0.3)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
