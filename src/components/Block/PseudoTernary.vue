<script setup lang="ts">
import { useFrequencyHelper } from "@/hooks/useFrequenceHelper";
import { computed, toRefs } from "vue";
import FreqBlock from "../FreqBlock.vue";
import { Pos } from "@/types/Pos";

const props = defineProps<{
    input: number[];
    index: number;
}>();

const { index, input } = toRefs(props);
const { current, prev, indexByValue } = useFrequencyHelper(input, index);

const up = [Pos.TopLeft, Pos.TopRight];
const down = [Pos.BotLeft, Pos.BotRight];
const center = [Pos.MidLeft, Pos.MidRight];

const isUp = computed(() => !!(indexByValue(0) % 2));
const line = computed(() => (current.value === 1 ? center : isUp.value ? up : down));
const left = computed(() => {
    if (index.value === 0) return Pos.MidLeft;

    const val = current.value;
    if (val === 1 && prev.value === 0) return (isUp.value ? up : down)[0];
    else if (prev.value === 0) return (isUp.value ? down : up)[0];
    return Pos.MidLeft;
});

const sequence = computed(() => [left.value, ...line.value]);
</script>

<template>
    <div>
        <FreqBlock :sequence />
    </div>
</template>

<style lang="scss" scoped></style>
