<script setup lang="ts">
import { cobj, cobjr, cpath, Pos } from "@/types/Pos";
import { set, watchImmediate } from "@vueuse/core";
import gsap from "gsap";
import { ref } from "vue";

const props = defineProps<{
    sequence: Pos[];
}>();

// Compute helpers for point-coordinates

const path = ref("M 0,0");

watchImmediate(
    () => props.sequence,
    (line, pline) => {
        pline ??= line;

        const og = cobj(pline);
        const to = cobj(line);

        gsap.to(og, {
            duration: 0.3,
            ...to,
            ease: "power2.inOut",
            onUpdate: () => {
                const arr = cobjr(og);
                const v = cpath(arr);
                set(path, v);
            },
        });
    }
);
</script>

<template>
    <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        class="transition-all"
    >
        <path
            :d="path"
            fill="transparent"
            stroke="white"
            transformOrigin="center"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
            stroke-width="2"
        />
    </svg>
</template>

<style lang="scss" scoped>
svg {
    overflow: visible;
    z-index: 10;
}

path,
line {
    stroke: white;
    stroke-width: 2px;
    stroke-linejoin: round;
    transform-origin: center;
    z-index: 10;
}
</style>
