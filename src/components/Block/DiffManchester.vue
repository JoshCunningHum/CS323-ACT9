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
const { current, indexByValue } = useFrequencyHelper(input, index);

const edgedown = [Pos.BotLeft, Pos.TopLeft, Pos.TopCenter, Pos.BotCenter, Pos.BotRight];
const edgeup = [Pos.TopLeft, Pos.BotLeft, Pos.BotCenter, Pos.TopCenter, Pos.TopRight];

const contdown = [Pos.TopLeft, Pos.TopLeft, Pos.TopCenter, Pos.BotCenter, Pos.BotRight];
const contup = [Pos.BotLeft, Pos.BotLeft, Pos.BotCenter, Pos.TopCenter, Pos.TopRight];

const isUp = computed(() => indexByValue(1) % 2);

const sequence = computed(
    () => (current.value ? [contdown, contup] : [edgedown, edgeup])[isUp.value]
);
</script>

<template>
    <div>
        <FreqBlock :sequence />
    </div>
</template>
