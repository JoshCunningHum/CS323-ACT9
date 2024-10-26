<script setup lang="ts">
import { DIGIT_HEIGHT, DIGIT_WIDTH } from "@/constants";
import { useConfigStore } from "@/stores/config";
import { get } from "@vueuse/core";
import { useClamp } from "@vueuse/math";
import { storeToRefs } from "pinia";
import { computed, inject } from "vue";

const input = defineModel<(1 | 0)[]>({ required: true });
const props = defineProps<{
    label: string;
}>();

// Slot width
const configStore = useConfigStore();
const { length } = storeToRefs(configStore);
const freqWidth = computed(() => get(length) * DIGIT_WIDTH);

// Hover Effect
const hovered = inject("hovered", -1);
const sethovered = inject("sethovered", (v: number) => {});
</script>

<template>
    <div class="flex justify-between" @mouseleave="sethovered(-1)">
        <div class="label">
            <h3>{{ label }}</h3>
        </div>
        <div class="freq-slot">
            <div class="overlays">
                <div
                    class="digit"
                    :class="{ hovered: hovered === i - 1 }"
                    v-for="i in length"
                    :key="i"
                ></div>
            </div>
            <div
                v-for="i in length"
                :key="length - i"
                class="digit"
                @mouseenter="sethovered(i - 1)"
            >
                <slot name="block" :index="i - 1"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.label {
    @apply flex justify-end mr-5 items-center text-xl flex-grow transition-all;
}

.freq-slot {
    @apply flex-shrink-0 relative flex;

    height: v-bind('DIGIT_HEIGHT + "px"');
    width: v-bind("freqWidth + 'px'");

    .digit {
        width: v-bind('DIGIT_WIDTH + "px"');
    }

    .overlays {
        @apply border border-surface h-full flex absolute left-0 top-0 -z-10;

        .digit:not(:last-child) {
            @apply border-r border-surface h-full -z-10;
        }

        .digit.hovered {
            @apply bg-emphasis;
        }
    }
}
</style>
