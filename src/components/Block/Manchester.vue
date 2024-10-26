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
const { current, prev } = useFrequencyHelper(input, index);

const uptodown = [Pos.TopLeft, Pos.TopCenter, Pos.BotCenter, Pos.BotRight];
const downtoup = [Pos.BotLeft, Pos.BotCenter, Pos.TopCenter, Pos.TopRight];

const line = computed(() => (current.value === 1 ? downtoup : uptodown));
const start = computed(() =>
    index.value === 0 ? line.value[0] : prev.value === 0 ? Pos.BotLeft : Pos.TopLeft
);

const sequence = computed(() => [start.value, ...line.value]);
</script>

<template>
    <div>
        <FreqBlock :sequence />
    </div>
</template>
