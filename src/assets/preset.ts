import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

export const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{zinc.50}",
            100: "{zinc.100}",
            200: "{zinc.200}",
            300: "{zinc.300}",
            400: "{zinc.400}",
            500: "{zinc.500}",
            600: "{zinc.600}",
            700: "{zinc.700}",
            800: "{zinc.800}",
            900: "{zinc.900}",
            950: "{zinc.950}",
        },
        surface: {
            0: "#ffffff",
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#e5e5e5",
            300: "#d4d4d4",
            400: "#a3a3a3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
            950: "#0a0a0a",
        },
        colorScheme: {
            light: {
                primary: {
                    color: "{zinc.950}",
                    inverseColor: "#ffffff",
                    hoverColor: "{zinc.900}",
                    activeColor: "{zinc.800}",
                },
                highlight: {
                    background: "{zinc.950}",
                    focusBackground: "{zinc.700}",
                    color: "#ffffff",
                    focusColor: "#ffffff",
                },
            },
            dark: {
                primary: {
                    color: "{zinc.50}",
                    inverseColor: "{zinc.950}",
                    hoverColor: "{zinc.100}",
                    activeColor: "{zinc.200}",
                },
                highlight: {
                    background: "rgba(250, 250, 250, .16)",
                    focusBackground: "rgba(250, 250, 250, .24)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)",
                },
            },
        },
    },
});
