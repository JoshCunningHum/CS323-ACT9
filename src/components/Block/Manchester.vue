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
const { current, prev } = useFrequencyHelper(input, index);

const uptodown = [Pos.TopLeft, Pos.TopCenter, Pos.BotCenter, Pos.BotRight];
const downtoup = [Pos.BotLeft, Pos.BotCenter, Pos.TopCenter, Pos.TopRight];

const line = computed(() => (current.value === 1 ? downtoup : uptodown));

const origin = [Pos.BotLeft, Pos.TopLeft];
const start = computed(() =>
    index.value === 0 ? origin[starts.value] : prev.value === 0 ? Pos.BotLeft : Pos.TopLeft
);

const sequence = computed(() => [start.value, ...line.value]);
</script>

<template>
    <div>
        <FreqBlock :sequence />
    </div>
</template>
