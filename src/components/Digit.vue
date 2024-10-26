<script setup lang="ts">
import { DIGIT_HEIGHT, DIGIT_WIDTH } from "@/constants";
import { set } from "@vueuse/core";
import { inject } from "vue";

const value = defineModel<1 | 0>({ default: 0 });
const emits = defineEmits<{
    (e: "toggle"): void;
    (e: "hover"): void;
}>();
const toggle = () => {
    set(value, value.value === 0 ? 1 : 0);
    emits("toggle");
};
</script>

<template>
    <div :style="{ width: DIGIT_WIDTH + 'px' }" class="px-1" @mouseenter="emits('hover')">
        <Button class="digit" @click="toggle">
            <Transition name="slide">
                <span v-if="value == 1">1</span>
                <span v-else>0</span>
            </Transition>
        </Button>
    </div>
</template>

<style lang="scss" scoped>
.digit {
    @apply text-5xl flex items-center justify-center cursor-pointer rounded w-full;
    aspect-ratio: 1/1.2;
}

.slide-enter-active,
.slide-leave-active {
    position: absolute;
    transition: all 0.4s cubic-bezier(0.77, -0.53, 0.42, 1.45);
}

.slide-enter-from {
    transform: translateY(v-bind('value === 1 ? "100px" : "-100px" '));
    opacity: 0;
}

.slide-leave-to {
    transform: translateY(v-bind('value === 1 ? "-100px" : "100px" '));
}
</style>
