<script setup lang="ts">
import { inject } from "vue";
import Digit from "./Digit.vue";

const input = defineModel<(1 | 0)[]>({ default: [] });

// hover effect
const sethovered = inject("sethovered", (v: number) => {});
</script>

<template>
    <div class="flex" @mouseleave="sethovered(-1)">
        <TransitionGroup name="scale">
            <Digit
                v-for="(digit, i) in input"
                v-model="input[i]"
                :key="input.length - i"
                @hover="sethovered(i)"
            />
        </TransitionGroup>
    </div>
</template>

<style lang="scss" scoped>
v-enter-active,
.scale-leave-active {
    transition: all 0.4s cubic-bezier(0.77, -0.53, 0.42, 1.45);
}

.scale-enter-from,
.scale-leave-to {
    transform: scale(0);
    opacity: 0.2;
}

.scale-enter-to,
.scale-leave-from {
    transform: scale(1);
}
</style>
