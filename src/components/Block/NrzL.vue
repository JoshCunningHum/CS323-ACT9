<script setup lang="ts">
import { useFrequencyHelper } from "@/hooks/useFrequenceHelper";
import { computed, toRefs } from "vue";
import FreqBlock from "../FreqBlock.vue";
import { Pos } from "@/types/Pos";
import { useConfigStore } from "@/stores/config";
import { storeToRefs } from "pinia";

const props = defineProps<{
    input: number[];
    index: number;
}>();

const config = useConfigStore();
const { starts } = storeToRefs(config);

const { index, input } = toRefs(props);
const { current, unchanged } = useFrequencyHelper(input, index);

const up = [Pos.TopLeft, Pos.TopRight];
const down = [Pos.BotLeft, Pos.BotRight];
const rline = computed(() => (current.value === 0 ? up : down));
const line = computed(() => (current.value === 1 ? up : down));

const origins = [Pos.BotLeft, Pos.TopLeft];
const left = computed(() =>
    index.value === 0 ? origins[starts.value] : (unchanged.value ? line : rline).value[0]
);

const sequence = computed(() => [left.value, ...line.value]);
</script>

<template>
    <div>
        <FreqBlock :sequence />
    </div>
</template>

<style lang="scss" scoped></style>
