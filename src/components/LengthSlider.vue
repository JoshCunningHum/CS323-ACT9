<script setup lang="ts">
import { DIGIT_WIDTH, MAX_INPUT, MIN_INPUT } from "@/constants";
import { useConfigStore } from "@/stores/config";
import { set } from "@vueuse/core";
import { useProjection } from "@vueuse/math";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const configStore = useConfigStore();
const { input_length } = storeToRefs(configStore);
const freqWidth = computed(() => MAX_INPUT * DIGIT_WIDTH);

const reversed = computed({
    get: () => MAX_INPUT - input_length.value + MIN_INPUT,
    set: (v) => set(input_length, MAX_INPUT - v + MIN_INPUT),
});
</script>

<template>
    <div
        v-tooltip.bottom="'Binary Input Length'"
        :style="{ width: freqWidth + 'px', paddingRight: MIN_INPUT * DIGIT_WIDTH + 'px' }"
        class="ml-auto"
    >
        <Slider
            :min="MIN_INPUT"
            :max="MAX_INPUT"
            v-model="reversed"
            pt:range:class="bg-surface-700"
            pt:root:class="bg-primary"
        />
    </div>
</template>

<style lang="scss" scoped></style>
