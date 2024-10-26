import "./assets/styles/main.scss";
import "@fontsource-variable/dm-sans";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { Noir } from "./assets/preset";
import App from "./App.vue";
import Tooltip from "primevue/tooltip";

import { gsap } from "gsap";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/all";

gsap.registerPlugin(RoughEase, ExpoScaleEase, SlowMo, CustomEase);

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            cssLayer: {
                name: "primevue",
                order: "tailwind-base, primevue, tailwind-utilities",
            },
            darkModeSelector: ".dark-mode",
        },
    },
    ripple: true,
});
app.use(autoAnimatePlugin);

app.directive("tooltip", Tooltip);

app.mount("#app");
